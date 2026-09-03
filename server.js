// server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

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

const PORT =
  process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(
    `Backend Proxy Server running on port ${PORT}`
  )
})