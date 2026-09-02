<template>
  <div>
    <div class="field-group">
      <label>{{ t.coreSkills }}</label>

      <input
        type="text"
        v-model="data.skillsCore"
        :placeholder="ph.coreSkillsPh"
      />
    </div>

    <div class="field-group">
      <label>{{ t.toolsSkills }}</label>

      <input
        type="text"
        v-model="data.skillsTools"
        :placeholder="ph.toolsSkillsPh"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { I18N } from '../../i18n.js'

import { useResumeStore } from '../../stores/resume.js'

const resume = useResumeStore()

const lang = computed(() => resume.lang)

const t = computed(() => I18N[lang.value])

const data = resume.data

const dynamicPh = computed(() => resume.dynamicPh)

const PH_KEYS = [
  'summaryPh',
  'coreSkillsPh',
  'toolsSkillsPh',
  'expTitlePh',
  'expDescPh',
  'projNamePh',
  'projDescPh'
]

const ph = computed(() => {
  const base = {}

  PH_KEYS.forEach(key => {
    base[key] = t.value[key]
  })

  return dynamicPh.value
    ? {
        ...base,
        ...dynamicPh.value
      }
    : base
})
</script>