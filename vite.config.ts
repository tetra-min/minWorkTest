import { defineConfig } from "vite";
import { SRC_DIR } from "./env";
import react from "@vitejs/plugin-react-swc";
// import path from 'path';

export default () => {
    const dirname = import.meta.dirname;

    const resolveConfig = defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                "@": dirname + SRC_DIR,
            },
        },
    });

    return resolveConfig;
};
