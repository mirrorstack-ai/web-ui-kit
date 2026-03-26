"use client";

import { useState, useRef, useCallback } from "react";

export type UploadStatus =
  | "idle"
  | "requesting"
  | "uploading"
  | "confirming"
  | "done"
  | "error";

export interface UploadConfig {
  /**
   * Endpoint to POST to for getting a presigned upload URL.
   * Should accept a JSON body and return { uploadUrl: string; ... }.
   */
  endpoint: string;
  /** The file to upload */
  file: File;
  /** Extra body fields to include in the initial POST request */
  requestBody?: Record<string, unknown>;
  /** Extra headers for the initial POST request */
  requestHeaders?: Record<string, string>;
  /**
   * Confirmation endpoint. After the file is PUT to the presigned URL,
   * a POST is made here to finalize the upload.
   * If omitted, no confirmation step is performed.
   */
  confirmEndpoint?: string;
  /** Extra body fields for the confirmation POST */
  confirmBody?: Record<string, unknown>;
}

export interface UploadResult<T = unknown> {
  /** Response from the initial POST (presigned URL request) */
  createResponse: T;
  /** Response from the confirmation POST (if confirmEndpoint is set) */
  confirmResponse?: unknown;
}

export interface UseUploadReturn<T = unknown> {
  /** Start the upload */
  upload: (config: UploadConfig) => Promise<UploadResult<T>>;
  /** Cancel an in-progress upload */
  cancel: () => void;
  /** Upload progress 0-100 */
  progress: number;
  /** Current upload status */
  status: UploadStatus;
  /** Error message if status is "error" */
  error: string | null;
  /** Reset state back to idle */
  reset: () => void;
}

/**
 * Presigned URL upload hook.
 *
 * Flow:
 * 1. POST to `endpoint` to get a presigned upload URL
 * 2. PUT the file to the presigned URL (with progress tracking)
 * 3. POST to `confirmEndpoint` to finalize (optional)
 *
 * @example
 * ```tsx
 * const { upload, progress, status, error } = useUpload();
 *
 * const handleUpload = async (file: File) => {
 *   const result = await upload({
 *     endpoint: "/api/uploads",
 *     file,
 *     requestBody: { filename: file.name },
 *     confirmEndpoint: "/api/uploads/confirm",
 *   });
 * };
 * ```
 */
export function useUpload<T = unknown>(): UseUploadReturn<T> {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const reset = useCallback(() => {
    setProgress(0);
    setStatus("idle");
    setError(null);
    xhrRef.current = null;
  }, []);

  const cancel = useCallback(() => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }
    setStatus("idle");
    setProgress(0);
    setError(null);
  }, []);

  const upload = useCallback(
    async (config: UploadConfig): Promise<UploadResult<T>> => {
      const {
        endpoint,
        file,
        requestBody,
        requestHeaders,
        confirmEndpoint,
        confirmBody,
      } = config;

      setError(null);
      setProgress(0);

      // Step 1: Request presigned URL
      setStatus("requesting");
      let createResponse: T;
      let uploadUrl: string;

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...requestHeaders,
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
            size: file.size,
            ...requestBody,
          }),
        });

        if (!res.ok) {
          throw new Error(`Failed to get upload URL: ${res.status}`);
        }

        createResponse = (await res.json()) as T;
        uploadUrl = (createResponse as Record<string, unknown>)
          .uploadUrl as string;

        if (!uploadUrl) {
          throw new Error(
            "Server response missing uploadUrl field",
          );
        }
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Failed to initiate upload";
        setError(msg);
        setStatus("error");
        throw err;
      }

      // Step 2: Upload file to presigned URL
      setStatus("uploading");

      try {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhrRef.current = xhr;

          xhr.open("PUT", uploadUrl);
          xhr.setRequestHeader(
            "Content-Type",
            file.type || "application/octet-stream",
          );

          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              setProgress(Math.round((e.loaded / e.total) * 100));
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve();
            } else {
              reject(
                new Error(
                  `Upload failed with status ${xhr.status}`,
                ),
              );
            }
          };

          xhr.onerror = () => reject(new Error("Upload failed"));
          xhr.onabort = () => reject(new Error("Upload cancelled"));

          xhr.send(file);
        });
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Upload failed";
        setError(msg);
        setStatus("error");
        throw err;
      }

      setProgress(100);

      // Step 3: Confirm upload (optional)
      let confirmResponse: unknown;

      if (confirmEndpoint) {
        setStatus("confirming");

        try {
          const res = await fetch(confirmEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...requestHeaders,
            },
            body: JSON.stringify(confirmBody ?? {}),
          });

          if (!res.ok) {
            throw new Error(
              `Confirmation failed: ${res.status}`,
            );
          }

          confirmResponse = await res.json();
        } catch (err) {
          const msg =
            err instanceof Error
              ? err.message
              : "Upload confirmation failed";
          setError(msg);
          setStatus("error");
          throw err;
        }
      }

      setStatus("done");
      xhrRef.current = null;

      return { createResponse, confirmResponse };
    },
    [],
  );

  return {
    upload,
    cancel,
    progress,
    status,
    error,
    reset,
  };
}
