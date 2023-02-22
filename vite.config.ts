import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import transformerVariantGroup from "@unocss/transformer-variant-group";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      transformers: [transformerVariantGroup()],
    }),
  ],
});
