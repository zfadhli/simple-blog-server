import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import path from 'path'

export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@middlewares': path.resolve(__dirname, './src/middlewares'),
    },
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/server.js',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
    }),
  ],
})
