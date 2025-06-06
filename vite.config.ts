import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import path from "node:path"
import { defineConfig } from 'vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/portfolio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "environments": path.resolve(__dirname, "./environments"),
    },
  },
})