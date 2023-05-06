import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you are deploying to https://<USERNAME>.github.io/<REPO>/, set base to '/<REPO>/'
const base = process.env.NODE_ENV === "production" ? "/reactApps/" : "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
