/**
 * Typed fetch wrapper for making API requests.
 *
 * Provides a minimal, generic HTTP client that can be configured per-project
 * with base URL, headers, and error handling.
 */

export interface ApiConfig {
  /** Base URL for all requests (e.g. "https://api.example.com") */
  baseUrl: string;
  /** Default headers applied to every request */
  headers?: Record<string, string>;
  /** Called on every response to handle errors globally */
  onError?: (error: ApiError) => void;
  /** Called to get auth headers (e.g. Bearer token) */
  getAuthHeaders?: () => Record<string, string> | Promise<Record<string, string>>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  /** Query parameters */
  params?: Record<string, string | number | boolean | undefined>;
  /** Request body (auto-serialized to JSON) */
  body?: unknown;
}

function buildUrl(
  base: string,
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  const url = new URL(path, base);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json() as Promise<T>;
  }
  return response.text() as unknown as T;
}

/**
 * Create a typed API client with the given configuration.
 *
 * @example
 * ```ts
 * const api = createApiClient({
 *   baseUrl: "https://api.example.com",
 *   getAuthHeaders: () => ({ Authorization: `Bearer ${token}` }),
 * });
 *
 * const users = await api.get<User[]>("/users", { params: { page: 1 } });
 * const user = await api.post<User>("/users", { body: { name: "Test" } });
 * ```
 */
export function createApiClient(config: ApiConfig) {
  async function request<T>(
    method: string,
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { params, body, headers: requestHeaders, ...fetchOptions } = options;

    const url = buildUrl(config.baseUrl, path, params);

    const authHeaders = config.getAuthHeaders
      ? await config.getAuthHeaders()
      : {};

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...config.headers,
      ...authHeaders,
      ...((requestHeaders as Record<string, string>) ?? {}),
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...fetchOptions,
    });

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }

      const error = new ApiError(
        `${method} ${path} failed with status ${response.status}`,
        response.status,
        errorBody,
      );

      config.onError?.(error);
      throw error;
    }

    return parseResponse<T>(response);
  }

  return {
    get<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>("GET", path, options);
    },
    post<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>("POST", path, options);
    },
    put<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>("PUT", path, options);
    },
    patch<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>("PATCH", path, options);
    },
    delete<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>("DELETE", path, options);
    },
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
