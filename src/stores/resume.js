import { defineStore } from 'pinia'
import { useResumeAI } from '../composables/useResumeAI.js'

const STORAGE_KEY = 'career-copilot-resume'
const LANGUAGE_KEY = 'career-copilot-language'

const INITIAL_LANGUAGE =
  localStorage.getItem(LANGUAGE_KEY) || 'ar'

document.documentElement.lang =
  INITIAL_LANGUAGE

document.documentElement.dir =
  INITIAL_LANGUAGE === 'ar'
    ? 'rtl'
    : 'ltr'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    lang: INITIAL_LANGUAGE,

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
desc: '',
link: ''
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
    saveToLocalStorage() {
      const savedData = {
        lang: this.lang,
        data: this.data
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedData)
      )
    },

    loadFromLocalStorage() {
      const saved = localStorage.getItem(
        STORAGE_KEY
      )

      if (!saved) {
        return
      }

      try {
        const parsed = JSON.parse(saved)

        if (parsed.data) {
          this.data = {
            ...this.data,
            ...parsed.data
          }
        }
      } catch (error) {
        console.error(
          'LocalStorage load error:',
          error
        )
      }
    },

    resetResume() {
      localStorage.removeItem(STORAGE_KEY)

      this.stepIndex = 0

      this.polishing = null
      this.dynamicPh = null
      this.suggested = false
      this.suggesting = false
      this.phCache = {}

      Object.assign(this.data, {
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
desc: '',
link: ''
          }
        ]
      })
    },

setLanguage(lang) {
  this.lang = lang

  localStorage.setItem(
    LANGUAGE_KEY,
    lang
  )

  document.documentElement.lang = lang

  document.documentElement.dir =
    lang === 'ar'
      ? 'rtl'
      : 'ltr'
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
desc: '',
link: ''
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
        this.data.summaryPolished =
          await polishSummary(
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
      const exp =
        this.data.experience[index]

      if (!exp || !exp.raw.trim()) {
        return
      }

      this.polishing = `exp${index}`

      const { polishExperience } =
        useResumeAI()

      try {
        exp.polished =
          await polishExperience(
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

    async fetchRoleSuggestions(
      role,
      langCode
    ) {
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

      const {
        fetchRoleSuggestions
      } = useResumeAI()

      try {
        const result =
          await fetchRoleSuggestions(
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
