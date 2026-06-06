// fichier vite.config.ts
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
//import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 5173, // 👈 Le port est défini ici
    strictPort: true, // Si true, Vite coupe si le port est déjà pris au lieu d'en chercher un autre
  },
  plugins: [
    devtools(),
//    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
//rajout
//  experimental: { oxc: false },
//  esbuild: { loader: "tsx" },
})

export default config
