<template>
  <div>
    <div
      class="repeat-card"
      v-for="(exp, i) in data.experience"
      :key="i"
    >
      <button
        class="repeat-remove"
        @click="resume.removeExperience(i)"
      >
        {{ t.remove }}
      </button>

      <div class="field-group">
        <label>{{ t.expTitle }}</label>

        <input
          type="text"
          v-model="exp.title"
          :placeholder="ph.expTitlePh"
        />
      </div>

      <div class="field-group">
        <label>{{ t.period }}</label>

        <input
          type="text"
          v-model="exp.period"
          :placeholder="t.periodPh"
        />
      </div>

      <div class="field-group">
        <label>{{ t.expDesc }}</label>

        <textarea
          v-model="exp.raw"
          :placeholder="ph.expDescPh"
        ></textarea>

        <button
          class="polish-btn"
          :disabled="polishing === 'exp' + i"
          @click="resume.polishExperience(i)"
        >
          {{
            polishing === 'exp' + i
              ? t.compiling
              : t.polish
          }}
        </button>
      </div>
    </div>

    <button
      class="add-btn"
      @click="resume.addExperience()"
    >
      {{ t.addExperience }}
    </button>
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