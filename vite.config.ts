import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import replace from "@rollup/plugin-replace";

const { NODE_ENV } = process.env;

export default defineConfig({
	plugins: [
    sveltekit(),
    // How to change the URL prefix for fetch calls depending on dev vs prod environment: https://stackoverflow.com/a/71543482. You might need to use "@rollup/plugin-replace" instead of "vite-plugin-replace" because "vite-plugin-replace" seems to have some version compatibility issues with the latest version of Vite.
    replace({
      // This is for a Hono.js backend hosted on Cloudflare Workers. The proxy server setting (below) will forward requests to the Hono server during development. That is why the `__HONO_DOMAIN__` is an empty string during development.
      "__HONO_DOMAIN__": NODE_ENV === "development" ? "" : "https://api.my-production-app.com",
      preventAssignment: true,
    }),
  ],
  server: {
    port: 5000,
    // For development, proxy (redirect) all requests that are prefixed with "/api" to the URL and port that the Hono API server is running on.
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"]
	}
});
