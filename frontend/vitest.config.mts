import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true, setupFiles: ["./src/test/setup.ts"], exclude: ["e2e/**", "node_modules/**", ".next/**"], maxWorkers: 1 },
  resolve: { alias: { "@": path.resolve(directory, "./src") } },
});
