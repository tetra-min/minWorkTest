import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import path from 'path';

export default () => {
  const dirname = import.meta.dirname;

  const resolveConfig = defineConfig({
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        '@': dirname + '/src'
      },
    }
  });

  return resolveConfig;
};