// vite.config.js
export default {
  root: 'src',
  base: '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'styles.css') return 'styles.css';
          if (assetInfo.name === 'scripts.js') return 'scripts.js';
          if (assetInfo.name === 'three-animation.js') return 'three-animation.js';
          if (assetInfo.name.includes('.png') || assetInfo.name.includes('.jpg') || assetInfo.name.includes('.ico')) {
            return 'img/[name][extname]';
          }
          if (assetInfo.name.includes('.pdf') || assetInfo.name.includes('.glb')) {
            return 'files/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  publicDir: 'public'
}