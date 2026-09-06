<template>
  <div class="panel-preview">
    <div class="preview-toolbar">
      <span class="preview-label">
        {{ t.livePreview }}
      </span>

      <button class="export-btn" @click="exportPDF">{{ t.exportPdf }} ↓</button>
    </div>

    <div class="doc" id="printDoc">
      <div class="doc-name">
        {{ data.name || t.heroPlaceholderName }}
      </div>

      <div class="doc-role">
        {{ data.role || t.targetRolePh }}
      </div>

      <div class="doc-contact">
        {{
          [data.email, data.location, data.links]
            .filter(Boolean)
            .join("  ·  ") || t.contactPh
        }}
      </div>

      <!-- Summary -->
      <template v-if="data.summaryPolished || data.summaryRaw">
        <div class="doc-section-title">
          {{ t.summarySection }}
        </div>

        <div class="doc-body">
          {{ data.summaryPolished || data.summaryRaw }}
        </div>
      </template>

      <!-- Experience -->
      <template v-if="hasExperience">
        <div class="doc-section-title">
          {{ t.experienceSection }}
        </div>

        <div
          class="doc-item"
          v-for="(exp, i) in data.experience"
          :key="i"
          v-show="exp.title || exp.raw"
        >
          <div class="doc-item-head">
            <span>
              {{ exp.title || t.expTitle }}
            </span>

            <span>
              {{ exp.period }}
            </span>
          </div>

          <div class="doc-body">
            {{ exp.polished || exp.raw }}
          </div>
        </div>
      </template>

      <!-- Skills -->
      <template v-if="data.skillsCore || data.skillsTools">
        <div class="doc-section-title">
          {{ t.skillsSection }}
        </div>

        <div>
          <span class="doc-skill-tag" v-for="skill in allSkills" :key="skill">
            {{ skill }}
          </span>
        </div>
      </template>

      <!-- Projects -->
      <template v-if="hasProjects">
        <div class="doc-section-title">
          {{ t.projectsSection }}
        </div>

        <div
          class="doc-item"
          v-for="(project, i) in data.projects"
          :key="i"
          v-show="project.name"
        >
          <div class="doc-item-head">
            <span>
              {{ project.name }}
            </span>
          </div>

          <div class="doc-body">
            {{ project.desc }}
          </div>
        </div>
      </template>

      <!-- Empty state -->
      <div
        v-if="!data.name && !data.summaryRaw && !hasExperience"
        class="doc-empty"
      >
        {{ t.emptyState }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { I18N } from "../i18n.js";
import { useResumeStore } from "../stores/resume.js";
import { buildResumeHTML } from "../pdf/resumeTemplate.js";

const resume = useResumeStore();

const lang = computed(() => resume.lang);

const t = computed(() => I18N[lang.value]);

const data = resume.data;

const allSkills = computed(() => resume.allSkills);

const hasExperience = computed(() => resume.hasExperience);

const hasProjects = computed(() => resume.hasProjects);

async function exportPDF() {
  try {
    const html = buildResumeHTML(resume.data, resume.lang);

    const response = await fetch("/api/pdf", {
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
</script>
