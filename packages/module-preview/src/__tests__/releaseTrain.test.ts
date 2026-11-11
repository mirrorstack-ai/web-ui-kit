import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (relative: string) =>
  JSON.parse(readFileSync(path.resolve(here, relative), "utf8")) as {
    name: string;
    version: string;
    peerDependencies?: Record<string, string>;
  };

const preview = read("../../package.json");
const kit = read("../../../../package.json");

describe("the release train", () => {
  // 🔴 ONE TRAIN, ONE VERSION. This shell's whole reason to be published from
  // the kit's repository is that its chrome IS the kit's chrome: a shell
  // prebuilt somewhere else drifts from the module's kit on every kit release
  // and renders a different DevToolbar than the module does. Two versions in
  // one repository quietly undo that — they publish from one commit under two
  // numbers, and the tag names only one of them.
  it("ships the same version as the kit", () => {
    expect(preview.version).toBe(kit.version);
  });

  // 🔴 THE KIT IS A PEER, NOT A DEPENDENCY, AND THAT IS THE DESIGN. A peer
  // resolves to the MODULE's installed kit, so the preview's chrome and the
  // page's chrome are the same code by construction. Bundling it instead would
  // put two copies of the kit on the page — two theme contexts, two snackbar
  // providers — and the preview would stop being evidence about the module.
  it("takes the kit as a peer, at a stated floor", () => {
    const range = preview.peerDependencies?.["@mirrorstack-ai/web-ui-kit"];
    expect(range, "the kit must be a peerDependency").toBeDefined();

    // A wildcard is the failure mode worth naming: it type-checks, installs
    // against anything, and lets a module pair this shell with a kit that
    // never had the components it renders.
    expect(range).not.toBe("*");
    expect(range).toMatch(/^>=\d+\.\d+\.\d+$/);

    const floor = range!.replace(">=", "").split(".").map(Number);
    const current = kit.version.split("-")[0]!.split(".").map(Number);
    const ord = (v: number[]) => v[0]! * 1e6 + v[1]! * 1e3 + v[2]!;
    expect(ord(floor), `floor ${range} is newer than the kit itself`).toBeLessThanOrEqual(
      ord(current),
    );
  });

  it("is not the kit", () => {
    // A copy-paste of the kit's package.json would pass both tests above.
    expect(preview.name).toBe("@mirrorstack-ai/module-preview");
    expect(kit.name).toBe("@mirrorstack-ai/web-ui-kit");
  });
});
