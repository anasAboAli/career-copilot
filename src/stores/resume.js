import { defineStore } from 'pinia'
import { useGemini } from '../composables/useGemini.js'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    lang: 'ar',

    stepIndex: 0,

    polishing: null,

    // Role-aware placeholder state
    dynamicPh: null,
    suggested: false,
    suggesting: false,
    phCache: {},

    data: {
      name: '',
      role: '',
      email: '',
      location: '',
      links: '',

      summaryRaw: '',
      summaryPolished: '',

      experience: [
        {
          title: '',
          period: '',
          raw: '',
          polished: ''
        }
      ],

      skillsCore: '',
      skillsTools: '',

      projects: [
        {
          name: '',
          desc: ''
        }
      ]
    }
  }),

  getters: {
    dir: state =>
      state.lang === 'ar'
        ? 'rtl'
        : 'ltr',

    allSkills: state =>
      (
        state.data.skillsCore +
        ',' +
        state.data.skillsTools
      )
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),

    hasExperience: state =>
      state.data.experience.some(
        e => e.title || e.raw
      ),

    hasProjects: state =>
      state.data.projects.some(
        p => p.name
      )
  },

  actions: {
    setLanguage(lang) {
      this.lang = lang
    },

    nextStep() {
      if (this.stepIndex < 4) {
        this.stepIndex++
      }
    },

    previousStep() {
      if (this.stepIndex > 0) {
        this.stepIndex--
      }
    },

    setStep(index) {
      this.stepIndex = index
    },

    addExperience() {
      this.data.experience.push({
        title: '',
        period: '',
        raw: '',
        polished: ''
      })
    },

    removeExperience(index) {
      this.data.experience.splice(
        index,
        1
      )
    },

    addProject() {
      this.data.projects.push({
        name: '',
        desc: ''
      })
    },

    removeProject(index) {
      this.data.projects.splice(
        index,
        1
      )
    },

    async polishSummary() {
  if (!this.data.summaryRaw.trim()) {
    return
  }

  this.polishing = 'summary'

  const { callGemini } = useGemini()

  const langNote =
    this.lang === 'ar'
      ? 'Respond in Arabic.'
      : 'Respond in English.'

  try {
    this.data.summaryPolished =
      await callGemini(`
Rewrite this into a crisp, first-person professional resume summary (2-3 sentences, no fluff, no markdown, plain text only).

This could be for any profession, so keep it natural to the field described.

${langNote}

${this.data.summaryRaw}
`)
  } catch (error) {
    console.error(
      'Summary polish error:',
      error
    )

    this.data.summaryPolished =
      this.data.summaryRaw
  } finally {
    this.polishing = null
  }
},

async polishExperience(index) {
  const exp =
    this.data.experience[index]

  if (!exp || !exp.raw.trim()) {
    return
  }

  this.polishing = `exp${index}`

  const { callGemini } = useGemini()

  const langNote =
    this.lang === 'ar'
      ? 'Respond in Arabic.'
      : 'Respond in English.'

  try {
    exp.polished =
      await callGemini(`
Rewrite this into 2-3 crisp resume bullet points as plain text (one per line, start each with a strong verb, no markdown symbols, no asterisks).

This could be any profession — match the tone to the role described.

${langNote}

Role: ${exp.title}

${exp.raw}
`)
  } catch (error) {
    console.error(
      'Experience polish error:',
      error
    )

    exp.polished = exp.raw
  } finally {
    this.polishing = null
  }
},

    async fetchRoleSuggestions(role, langCode) {
      const cleanRole = role.trim()

      if (cleanRole.length < 3) {
        this.dynamicPh = null
        this.suggested = false
        return
      }

      const cacheKey =
        `${langCode}|${cleanRole.toLowerCase()}`

      if (this.phCache[cacheKey]) {
        this.dynamicPh =
          this.phCache[cacheKey]

        this.suggested = true
        return
      }

      this.suggesting = true

      const langNote =
        langCode === 'ar'
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

      try {
        const response = await fetch(
          '/api/ai',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify({
              prompt
            })
          }
        )

        if (!response.ok) {
          throw new Error(
            `AI request failed: ${response.status}`
          )
        }

        const json =
          await response.json()

        const text =
          json.text ||
          json.content ||
          ''

        const cleaned =
          text
            .replace(
              /^```json/i,
              ''
            )
            .replace(
              /```$/,
              ''
            )
            .trim()

        const parsed =
          JSON.parse(cleaned)

        const result = {}

        const keys = [
          'summaryPh',
          'coreSkillsPh',
          'toolsSkillsPh',
          'expTitlePh',
          'expDescPh',
          'projNamePh',
          'projDescPh'
        ]

        keys.forEach(key => {
          if (parsed[key]) {
            result[key] =
              parsed[key]
          }
        })

        this.phCache[cacheKey] =
          result

        this.dynamicPh =
          result

        this.suggested = true
      } catch (error) {
        console.error(
          'Role suggestion error:',
          error
        )

        // Keep static placeholders
        this.dynamicPh = null
        this.suggested = false
      } finally {
        this.suggesting = false
      }
    }
  }
})