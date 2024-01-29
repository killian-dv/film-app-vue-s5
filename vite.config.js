import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const base = mode === "production" ? "/movies-app/" : "./";

  return defineConfig({
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
