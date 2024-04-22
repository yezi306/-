import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteVConsole from 'vite-plugin-vconsole';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      tsconfigPaths(),
      viteVConsole({
        entry: [resolve(__dirname, 'src/main.ts').replace(/\\/g, '/')],
        localEnabled: true,
        enabled: env.VITE_APP_CONSOLE_ENABLED === 'true'
      })
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  };
});
