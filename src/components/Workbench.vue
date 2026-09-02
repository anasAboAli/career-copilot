<template>
  <div class="workbench">

    <!-- INPUT PANEL -->
    <div class="panel-input">

      <!-- Steps navigation -->
      <div class="steps-nav">
        <button
          v-for="(step, i) in t.steps"
          :key="step"
          class="step-pill"
          :class="{
            active: i === stepIndex,
            done: i < stepIndex
          }"
          @click="resume.setStep(i)"
        >
          {{ i + 1 }}. {{ step }}
        </button>
      </div>

      <!-- Step content -->
      <div>
        <slot />
      </div>

      <!-- Navigation -->
      <div class="nav-buttons">

        <button
          class="btn-ghost"
          :disabled="stepIndex === 0"
          @click="resume.previousStep()"
        >
          {{ t.back }}
        </button>

        <button
          v-if="stepIndex < t.steps.length - 1"
          class="btn-primary"
          @click="resume.nextStep()"
        >
          {{ t.next }}
        </button>

        <button
          v-else
          class="btn-primary"
          @click="printDoc"
        >
          {{ t.exportPdf }}
        </button>

      </div>
    </div>

    <!-- PREVIEW -->
    <ResumePreview />

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { I18N } from '../i18n.js'
import { useResumeStore } from '../stores/resume.js'
import ResumePreview from './ResumePreview.vue'

const resume = useResumeStore()

const lang = computed(() => resume.lang)

const t = computed(() => I18N[lang.value])

const stepIndex = computed(() => resume.stepIndex)

function printDoc() {
  window.print()
}
</script>