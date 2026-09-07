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
            done: i < stepIndex,
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

      <!-- Reset Button -->
      <button class="btn-ghost" @click="resetResume">
        {{ t.reset }}
      </button>

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

        <button v-else class="btn-primary" @click="exportPDF">
          {{ t.exportPdf }}
        </button>
      </div>
    </div>

    <!-- PREVIEW -->
    <ResumePreview />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { I18N } from "../i18n.js";
import { useResumeStore } from "../stores/resume.js";
import ResumePreview from "./ResumePreview.vue";

import { buildResumeHTML } from "../pdf/resumeTemplate.js";
import { useAuthStore } from "../stores/auth.js";
import { deleteResume } from "../services/resume.service.js";
import { API_BASE_URL } from '../config.js'

const resume = useResumeStore();
const auth = useAuthStore();

const lang = computed(() => resume.lang);

const t = computed(() => I18N[lang.value]);

const stepIndex = computed(() => resume.stepIndex);

async function exportPDF() {
  try {
    const html = buildResumeHTML(resume.data, resume.lang);

    const response = await fetch(`${API_BASE_URL}/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html,
        name: resume.data.name,
        lang: resume.lang,
      }),
    });

    if (!response.ok) {
      throw new Error(`PDF request failed: ${response.status}`);
    }

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF export error:", error);
  }
}

async function resetResume() {
  const confirmed = window.confirm(t.value.resetConfirm);

  if (!confirmed) {
    return;
  }

  if (auth.user?.uid) {
    try {
      await deleteResume(auth.user.uid);
    } catch (error) {
      console.error("Firestore delete error:", error);

      return;
    }
  }

  resume.resetResume();

  window.location.reload();
}
</script>
