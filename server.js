// server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import puppeteer from 'puppeteer'

import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
let browserPromise = null
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.join(__dirname, 'dist')

async function getBrowser() {
  if (!browserPromise) {
    browserPromise = puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    }).catch(error => {
      browserPromise = null
      throw error
    })
  }

  return browserPromise
}
app.use(cors({
  origin: [
    'https://career-copilot-rt1j.onrender.com',
    'http://localhost:5173'
  ]
}))
app.use(express.json())

app.post('/api/pdf', async (req, res) => {
  let page = null

  try {
    const {
      html,
      name,
      lang
    } = req.body

    if (!html || !html.trim()) {
      return res.status(400).json({
        error: 'HTML is required'
      })
    }

    const browser = await getBrowser()

    page = await browser.newPage()

    await page.setContent(html, {
      waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true
    })

    const pdfBuffer = Buffer.from(pdf)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename="resume.pdf"',
      'Content-Length': pdfBuffer.length
    })

    return res.send(pdfBuffer)

  } catch (error) {
    console.error(
      'PDF generation error:',
      error
    )

    return res.status(500).json({
      error: 'Failed to generate PDF'
    })

  } finally {
    if (page) {
      try {
        await page.close()
      } catch (error) {
        console.error(
          'PDF page close error:',
          error
        )
      }
    }
  }
})

const GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash-lite'
]

// Simple in-memory cache
const cache = new Map()

app.post('/api/ai', async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        error: 'Prompt is required'
      })
    }

    const cacheKey = prompt.trim()

    // Return cached response when available
    if (cache.has(cacheKey)) {
      return res.json({
        text: cache.get(cacheKey),
        cached: true
      })
    }

    let lastError = null

    for (const model of GEMINI_MODELS) {
      try {
        const url =
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key':
              process.env.GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ]
          })
        })

        const json = await response.json()

        if (response.ok) {
          const text =
            json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
            ''

          if (!text) {
            throw new Error(
              `Gemini ${model} returned an empty response`
            )
          }

          cache.set(cacheKey, text)

          return res.json({
            text,
            cached: false,
            model
          })
        }

        lastError = {
          model,
          status: response.status,
          message:
            json?.error?.message ||
            'Gemini API request failed'
        }

        console.error(
          `Gemini ${model} Error:`,
          response.status,
          json
        )

        // Retry with the next model for temporary failures
        if (
          response.status !== 429 &&
          response.status !== 500 &&
          response.status !== 502 &&
          response.status !== 503 &&
          response.status !== 504
        ) {
          break
        }
      } catch (error) {
        lastError = {
          model,
          message: error.message
        }

        console.error(
          `Gemini ${model} Proxy Error:`,
          error
        )
      }
    }

    return res.status(503).json({
      error:
        lastError?.message ||
        'All Gemini models are temporarily unavailable'
    })
  } catch (error) {
    console.error(
      'Gemini Proxy Error:',
      error
    )

    return res.status(500).json({
      error: 'Failed to process AI request'
    })
  }
})

// Serve the Vite frontend
app.use(express.static(distPath))

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

const PORT =
  process.env.PORT || 3001

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Backend Proxy Server running on port ${PORT}`
  )
})