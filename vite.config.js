import { defineConfig } from "vite";
import path from "path";
const root = "src";
export default defineConfig({
  root: root,
  base: "/",
  publicDir: "public",
  server: {
    port: 8080,
    open: true,
  },
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        style: path.resolve(__dirname, "./src/style.scss"),
        main: path.resolve(__dirname, "./src/index.html"),
        texture: path.resolve(__dirname, "./src/texture.html"),
        particles: path.resolve(__dirname, "./src/particles.html"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          console.log(assetInfo);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
            return `assets/${extType}/[name][extname]`;
          } else if (/s?css$/i.test(extType)) {
            extType = "css";
            return `assets/${extType}/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
        chunkFileNames: "assets/js/main.js",
        entryFileNames: "assets/js/[name].js",
      },
    },
  },
});
