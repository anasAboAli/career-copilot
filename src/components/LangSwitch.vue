<template>
  <div class="lang-switch">
    <button
      :class="{ active: lang === 'en' }"
      @click="setLanguage('en')"
    >
      EN
    </button>

    <button
      :class="{ active: lang === 'ar' }"
      @click="setLanguage('ar')"
    >
      عربي
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useResumeStore } from '../stores/resume.js'

const resume = useResumeStore()

const lang = computed(() => resume.lang)

function setLanguage(language) {
  resume.setLanguage(language)
}
</script>