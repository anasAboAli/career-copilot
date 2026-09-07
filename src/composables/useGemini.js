import { API_BASE_URL } from '../config.js'


export function useGemini() {
  async function callGemini(prompt) {
    const res = await fetch(`${API_BASE_URL}/ai`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        prompt
      })
    })

    if (!res.ok) {
      throw new Error(
        `AI request failed: ${res.status}`
      )
    }

    const json = await res.json()

    return (
      json.text ||
      json.content ||
      ''
    ).trim()
  }

  return {
    callGemini
  }
}