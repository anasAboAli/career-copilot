<template>
  <div>
    <div class="repeat-card" v-for="(project, i) in data.projects" :key="i">
      <button class="repeat-remove" @click="resume.removeProject(i)">
        {{ t.remove }}
      </button>

      <div class="field-group">
        <label>{{ t.projName }}</label>

        <input
          type="text"
          v-model="project.name"
          :placeholder="ph.projNamePh"
        />
      </div>

      <div class="field-group">
        <label>{{ t.projDesc }}</label>

        <input
          type="text"
          v-model="project.desc"
          :placeholder="ph.projDescPh"
        />
      </div>

      <div class="field-group">
        <label>{{ t.projLink }}</label>
        <input
          type="text"
          v-model="project.link"
          :placeholder="ph.projLinkPh"
        />
      </div>
    </div>

    <button class="add-btn" @click="resume.addProject()">
      {{ t.addProject }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { I18N } from "../../i18n.js";

import { useResumeStore } from "../../stores/resume.js";

const resume = useResumeStore();

const lang = computed(() => resume.lang);

const t = computed(() => I18N[lang.value]);

const data = resume.data;

const dynamicPh = computed(() => resume.dynamicPh);

const PH_KEYS = [
  "summaryPh",
  "coreSkillsPh",
  "toolsSkillsPh",
  "expTitlePh",
  "expDescPh",
  "projNamePh",
  "projDescPh",
  "projLinkPh",
];

const ph = computed(() => {
  const base = {};

  PH_KEYS.forEach((key) => {
    base[key] = t.value[key];
  });

  return dynamicPh.value
    ? {
        ...base,
        ...dynamicPh.value,
      }
    : base;
});
</script>
