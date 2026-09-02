<template>
  <div>
    <div class="field-group">
      <label>{{ t.summaryLabel }}</label>

      <textarea
        v-model="data.summaryRaw"
        :placeholder="ph.summaryPh"
      ></textarea>

      <button
        class="polish-btn"
        :disabled="polishing === 'summary'"
        @click="resume.polishSummary()"
      >
        {{
          polishing === 'summary'
            ? t.compiling
            : t.polish
        }}
      </button>
    </div>

    <div
      v-if="data.summaryPolished"
      class="field-group"
    >
      <label>{{ t.polishedLabel }}</label>

      <textarea
        v-model="data.summaryPolished"
      ></textarea>
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

const polishing = computed(() => resume.polishing)

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