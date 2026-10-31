import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiHost = env.API_HOST || 'localhost';
  const apiPort = env.API_PORT || '8080';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': `http://${apiHost}:${apiPort}`,
        '/health': `http://${apiHost}:${apiPort}`,
      },
    },
  };
});
