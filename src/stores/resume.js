import { defineStore } from 'pinia'
import { useResumeAI } from '../composables/useResumeAI.js'

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

  const { polishSummary } = useResumeAI()

  try {
    this.data.summaryPolished = await polishSummary(
      this.data.summaryRaw,
      this.lang
    )
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
  const exp = this.data.experience[index]

  if (!exp || !exp.raw.trim()) {
    return
  }

  this.polishing = `exp${index}`

  const { polishExperience } = useResumeAI()

  try {
    exp.polished = await polishExperience(
      exp.title,
      exp.raw,
      this.lang
    )
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
    this.dynamicPh = this.phCache[cacheKey]
    this.suggested = true
    return
  }

  this.suggesting = true

  const { fetchRoleSuggestions } = useResumeAI()

  try {
    const result = await fetchRoleSuggestions(
      cleanRole,
      langCode
    )

    this.phCache[cacheKey] = result
    this.dynamicPh = result
    this.suggested = true
  } catch (error) {
    console.error(
      'Role suggestion error:',
      error
    )

    this.dynamicPh = null
    this.suggested = false
  } finally {
    this.suggesting = false
  }
}
  }
})