// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Anthropic } from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Cache بسيط للطلبات
const cache = new Map();

app.post('/api/suggest-placeholders', async (req, res) => {
  try {
    const { role, lang = 'ar' } = req.body;

    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const cacheKey = `${role.toLowerCase().trim()}_${lang}`;
    if (cache.has(cacheKey)) {
      return res.json({ suggestions: cache.get(cacheKey), cached: true });
    }

    const isAr = lang === 'ar';
    const prompt = `Return ONLY a valid JSON object (no markdown, no extra text) with tailored CV placeholder suggestions for the job role "${role}". Language MUST be ${isAr ? 'Arabic' : 'English'}.
    Structure required:
    {
      "summary": "...",
      "skills": "...",
      "tools": "...",
      "expTitle": "...",
      "expDesc": "...",
      "projTitle": "...",
      "projDesc": "..."
    }`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    });

    const contentText = response.content[0].text;
    const parsedData = JSON.parse(contentText);

    // الحفظ في التخزين المؤقت
    cache.set(cacheKey, parsedData);

    return res.json({ suggestions: parsedData, cached: false });
  } catch (error) {
    console.error('Proxy Error:', error);
    // Fallback في حال حدوث خطأ
    return res.status(500).json({ 
      error: 'Failed to fetch suggestions',
      fallback: true 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend Proxy Server running on port ${PORT}`);
});