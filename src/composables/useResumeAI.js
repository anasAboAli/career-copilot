import { useGemini } from './useGemini.js'

export function useResumeAI() {
  const { callGemini } = useGemini()

  async function polishSummary(summaryRaw, lang) {
    if (!summaryRaw?.trim()) {
      return ''
    }

    const langNote =
      lang === 'ar'
        ? 'Respond in Arabic.'
        : 'Respond in English.'

    return await callGemini(`
Rewrite this into a crisp, first-person professional resume summary (2-3 sentences, no fluff, no markdown, plain text only).

This could be for any profession, so keep it natural to the field described.

${langNote}

${summaryRaw}
`)
  }

  async function polishExperience(expTitle, expRaw, lang) {
  if (!expRaw?.trim()) {
    return ''
  }

  const langNote =
    lang === 'ar'
      ? 'Respond in Arabic.'
      : 'Respond in English.'

  return await callGemini(`
Rewrite this into 2-3 crisp resume bullet points as plain text (one per line, start each with a strong verb, no markdown symbols, no asterisks).

This could be any profession — match the tone to the role described.

${langNote}

Role: ${expTitle}

${expRaw}
`)
}

async function fetchRoleSuggestions(role, lang) {
  const cleanRole = role.trim()

  if (cleanRole.length < 3) {
    return null
  }

  const langNote =
    lang === 'ar'
      ? 'Write every value in Arabic.'
      : 'Write every value in English.'

  const prompt = `
You are generating short EXAMPLE placeholder text for a resume-builder form, tailored to a specific job role.

${langNote}

Role: "${cleanRole}"

Return ONLY raw JSON (no markdown fences, no commentary) with exactly these keys:

{
  "summaryPh": "a 1-sentence rough self-summary a person in this role might type",
  "coreSkillsPh": "3-5 comma-separated core skills typical for this role",
  "toolsSkillsPh": "3-5 comma-separated tools/software/certifications typical for this role",
  "expTitlePh": "an example job title + organization for this role",
  "expDescPh": "a short rough description (not polished) of daily duties in this role",
  "projNamePh": "an example project or achievement name relevant to this role",
  "projDescPh": "a one-line description of that example project"
}
`

  const text = await callGemini(prompt)

  const cleaned = text
    .replace(/^```json/i, '')
    .replace(/```$/, '')
    .trim()

  return JSON.parse(cleaned)
}


  return {
    polishSummary,
    polishExperience,
    fetchRoleSuggestions
  }
}