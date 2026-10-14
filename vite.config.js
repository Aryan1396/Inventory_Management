import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Buffer } from 'node:buffer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function localPhotoUploadPlugin() {
  const uploadsDir = path.resolve(__dirname, 'public/uploads')

  const handleUpload = (req, res) => {
    if (req.method === 'POST') {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', () => {
        try {
          const { dataUrl, filename } = JSON.parse(body)
          if (!dataUrl) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'No dataUrl provided' }))
            return
          }

          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true })
          }

          const matches = dataUrl.match(/^data:([A-Za-z0-9-+/]+);base64,(.+)$/)
          let ext = '.png'
          let buffer

          if (matches && matches.length === 3) {
            const mime = matches[1]
            if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg'
            else if (mime.includes('webp')) ext = '.webp'
            else if (mime.includes('svg')) ext = '.svg'
            else if (mime.includes('png')) ext = '.png'
            buffer = Buffer.from(matches[2], 'base64')
          } else {
            buffer = Buffer.from(dataUrl, 'base64')
          }

          const cleanBase = (filename || 'product')
            .replace(/\.[^/.]+$/, '')
            .replace(/[^a-zA-Z0-9_-]/g, '_')
            .slice(0, 30)
          const safeName = `${cleanBase}_${Date.now()}${ext}`
          const filePath = path.join(uploadsDir, safeName)

          // Use Node.js fs module to save file to local disk
          fs.writeFileSync(filePath, buffer)

          const localUrl = `/uploads/${safeName}`
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify({ success: true, localUrl, filePath }))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    } else {
      res.statusCode = 404
      res.end()
    }
  }

  const handleServeUploads = (req, res, next) => {
    const relativePath = decodeURIComponent(req.url.replace(/^\//, '').split('?')[0])
    const filePath = path.join(uploadsDir, relativePath)
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase()
      const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.gif': 'image/gif',
      }
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
      return fs.createReadStream(filePath).pipe(res)
    }
    next()
  }

  return {
    name: 'local-photo-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-photo', handleUpload)
      server.middlewares.use('/uploads', handleServeUploads)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/upload-photo', handleUpload)
      server.middlewares.use('/uploads', handleServeUploads)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localPhotoUploadPlugin(),
  ],
  server: {
    port: 5173,
    proxy: {
      // If backend server is running on port 5000, API calls can route to backend
      '^/api/products': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '^/api/categories': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
