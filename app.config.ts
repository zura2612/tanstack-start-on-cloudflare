import { defineConfig } from '@tanstack/react-start/config'
import { cloudflare } from '@tanstack/react-start/presets/cloudflare'

export default defineConfig({
  server: {
    preset: cloudflare(),
  },
})
