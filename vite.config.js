import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    define: {
      __DMI_CF__: JSON.stringify(env.DMI_CF || ''),      // Supabase URL
      __DMI_TKN__: JSON.stringify(env.DMI_TKN || ''),    // Supabase anon token
    },
  });
};


