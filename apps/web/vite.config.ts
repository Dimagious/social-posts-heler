import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true';
const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'social-posts-heler';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPagesBuild ? `/${repoName}/` : '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
