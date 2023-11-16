import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unfonts from 'unplugin-fonts/vite'
// import { VitePluginFonts } from 'vite-plugin-fonts'
import { VitePluginRadar } from 'vite-plugin-radar'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Project root directory (where index.html is located).
  root: process.cwd(),
  // Base public path when served in development or production.
  base: '/',
  // Directory to serve as plain static assets.
  publicDir: 'public',
  // Adjust console output verbosity.
  logLevel: 'info',
  // development server configuration
  server: {
    // Vite 3 now defaults to 5173, but you can override it with the port option.
    port: 3000,
  },
  // Will be passed to @rollup/plugin-alias as its entries option.
  resolve: {
    alias: [
      {
        find: '/@src/',
        replacement: `/src/`,
      },
      {
        find: '/@/',
        replacement: `/`,
      },
    ],
  },
  plugins: [
    // https://github.com/vitejs/vite/tree/main/packages/plugin-vue
    Vue({
      include: [/\.vue$/],
    }),

    /**
     * unplugin-fonts plugin inject webfonts from differents providers
     *
     * @see https://github.com/cssninjaStudio/unplugin-fonts
     */
    Unfonts({
      google: {
        families: [
          'Roboto',
          'Material+Icons',
          {
            name: 'Montserrat',
            styles: 'wght@400;500;600;700',
          },
        ],
      },
    }),

    /**
     * vite-plugin-radar plugin inject snippets from analytics providers
     *
     * @see https://github.com/stafyniaksacha/vite-plugin-radar
     */
    VitePluginRadar({
      gtm: {
        id: 'GTM-W99BL6N',
      },
    }),

    /**
     * vite-plugin-pwa generate manifest.json and register services worker to enable PWA
     *
     * @see https://github.com/antfu/vite-plugin-pwa
     */
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Moebius :: A VueJS 3 Chat Platform UI',
        short_name: 'Moebius',
        start_url: '/?utm_source=pwa',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icons/android-launchericon-512-512.png',
            sizes: '512x512',
          },
          {
            src: '/icons/android-launchericon-192-192.png',
            sizes: '192x192',
          },
          {
            src: '/icons/android-launchericon-144-144.png',
            sizes: '144x144',
          },
          {
            src: '/icons/android-launchericon-96-96.png',
            sizes: '96x96',
          },
          {
            src: '/icons/android-launchericon-72-72.png',
            sizes: '72x72',
          },
          {
            src: '/icons/android-launchericon-48-48.png',
            sizes: '48x48',
          },
          {
            src: '/icons/chrome-installprocess-128-128.png',
            sizes: '128x128',
          },
          {
            src: '/icons/msteams-silhouette-32-32.png',
            sizes: '32x32',
          },
          {
            src: '/icons/chrome-favicon-16-16.png',
            sizes: '16x16',
          },
        ],
      },
    }),
  ],
})
