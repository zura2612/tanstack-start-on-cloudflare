import { defineConfig } from 'vite'
//import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { nitro } from 'nitro/vite'
//import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
 // resolve: { tsconfigPaths: true },
  plugins: [
 //   devtools(),
 //   cloudflare({ viteEnvironment: { name: 'ssr' } }),
    viteTsConfigPaths({ projects:["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    viteReact(),
  ],
})

export default config
