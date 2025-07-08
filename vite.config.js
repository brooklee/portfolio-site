const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
              main: resolve(__dirname, 'src/index.html'),
              projects: resolve(__dirname, 'src/projects/index.html'),
              reset: resolve(__dirname, 'src/projects/reset/index.html'),
              mici: resolve(__dirname, 'src/projects/mici/index.html'),
              vending: resolve(__dirname, 'src/projects/vending/index.html'),
            },
          },
    }
}