// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

/**
 * TanStack devtools (`injectSource`) adds `data-tsd-source` with file line numbers.
 * After HMR, SSR and the client can get different line numbers for the same JSX,
 * which breaks hydration on the document shell in __root.tsx and cascades into
 * lazy route load failures (`SyntaxError: Invalid or unexpected token`).
 */
function stripRootShellSourceTags(): Plugin {
  return {
    name: "strip-root-shell-tsd-source",
    enforce: "post",
    transform(code, id) {
      const file = id.split("?")[0]!.replace(/\\/g, "/");
      if (!file.endsWith("/src/routes/__root.tsx") || !code.includes("data-tsd-source")) {
        return;
      }
      return { code: code.replace(/\sdata-tsd-source="[^"]*"/g, "") };
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [stripRootShellSourceTags()],
  },
});
