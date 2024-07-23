import { defineConfig } from "vite";
import { SRC_DIR } from "./env";
import react from "@vitejs/plugin-react-swc";
// import path from 'path';

export default () => {
    const dirname: string = import.meta.dirname;

    const chunks: Array<string> = [];

    const resolveConfig = defineConfig({
        plugins: [react()],
        optimizeDeps: {
            include: ["react", "react-dom"],
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules/")) {
                            const module = id.toString().split("node_modules/")[1].split("/")[0].toString();

                            if (chunks.includes(module) == false) {
                                chunks.push(module);
                            }

                            const number = chunks.indexOf(module) + 1;
                            const chunkNumber = number > 1 ? number : "";

                            return `chunks/bundle${chunkNumber}`;
                        }
                    },
                },
            },
        },
        resolve: {
            alias: {
                "@": dirname + SRC_DIR,
            },
        },
    });

    return resolveConfig;
};
