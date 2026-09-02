<template>
  <div id="app" :dir="dir">
    <!-- Language switch -->
    <LangSwitch />

    <!-- HERO -->
    <HeroSection />

    <!-- INTRO -->
    <section style="background: var(--ink); padding: 0 5vw; margin-top: -1px">
      <div
        style="
          max-width: 900px;
          margin: 0 auto;
          padding: 5vw 0 2vw;
          text-align: center;
        "
      >
        <h1 class="headline" v-html="t.headline"></h1>

        <p class="sub" style="max-width: 52ch">
          {{ t.sub }}
        </p>

        <button class="cta" style="margin: 0 auto" @click="scrollToApp">
          {{ t.ctaStart }}

          <span>
            {{ dir === "rtl" ? "←" : "→" }}
          </span>
        </button>
      </div>
    </section>

    <!-- APP -->
    <section class="app" ref="appSection">
      <div class="app-head">
        <div class="eyebrow">
          {{ t.eyebrowWorkbench }}
        </div>

        <h2>
          {{ t.workbenchTitle }}
        </h2>

        <p>
          {{ t.workbenchDesc }}
        </p>
      </div>

      <Workbench>
        <!-- INPUT PANEL -->
        <div class="panel-input">
          <!-- Step 0: Personal -->
          <PersonalStep v-if="stepIndex === 0" />

          <!-- Step 1: Summary -->
          <SummaryStep v-if="stepIndex === 1" />

          <!-- Step 2: Experience -->
          <ExperienceStep v-if="stepIndex === 2" />

          <!-- Step 3: Skills -->
          <SkillsStep v-if="stepIndex === 3" />

          <!-- Step 4: Projects -->
          <ProjectsStep v-if="stepIndex === 4" />
        </div>
      </Workbench>
    </section>

    <footer>
      {{ t.footer }}
    </footer>
  </div>
</template>

<script setup>
import LangSwitch from "./components/LangSwitch.vue";
import HeroSection from "./components/HeroSection.vue";
import Workbench from "./components/Workbench.vue";
import PersonalStep from "./components/steps/PersonalStep.vue";
import SummaryStep from "./components/steps/SummaryStep.vue";
import ExperienceStep from "./components/steps/ExperienceStep.vue";
import SkillsStep from "./components/steps/SkillsStep.vue";
import ProjectsStep from "./components/steps/ProjectsStep.vue";

import { ref, computed, watch } from "vue";

import { I18N, ROLE_SAMPLES_EN, ROLE_SAMPLES_AR } from "./i18n.js";

import { useResumeStore } from "./stores/resume.js";

const appSection = ref(null);

const resume = useResumeStore();

const dynamicPh = computed(() => resume.dynamicPh);

const suggested = computed(() => resume.suggested);

const suggesting = computed(() => resume.suggesting);

const lang = computed({
  get: () => resume.lang,
  set: (value) => {
    resume.setLanguage(value);
  },
});

const stepIndex = computed({
  get: () => resume.stepIndex,
  set: (value) => {
    resume.setStep(value);
  },
});

const polishing = computed({
  get: () => resume.polishing,
  set: (value) => {
    resume.polishing = value;
  },
});

const data = resume.data;

const dir = computed(() => resume.dir);

const t = computed(() => I18N[lang.value]);

const allSkills = computed(() => resume.allSkills);

const hasExperience = computed(() => resume.hasExperience);

const hasProjects = computed(() => resume.hasProjects);

/* ---------------------------------
   Role-aware placeholders
---------------------------------- */

const PH_KEYS = [
  "summaryPh",
  "coreSkillsPh",
  "toolsSkillsPh",
  "expTitlePh",
  "expDescPh",
  "projNamePh",
  "projDescPh",
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

/* ---------------------------------
   Hero animation
---------------------------------- */

let roleDebounce = null;

watch(
  () => data.role,
  (role) => {
    clearTimeout(roleDebounce);

    if (!role || role.trim().length < 3) {
      resume.dynamicPh = null;
      resume.suggested = false;
      return;
    }

    roleDebounce = setTimeout(() => {
      resume.fetchRoleSuggestions(role, lang.value);
    }, 700);
  },
);

watch(lang, () => {
  if (data.role && data.role.trim().length >= 3) {
    resume.fetchRoleSuggestions(data.role, lang.value);
  }
});

/* ---------------------------------
   Actions
---------------------------------- */

function scrollToApp() {
  appSection.value?.scrollIntoView({
    behavior: "smooth",
  });
}

function printDoc() {
  window.print();
}

/* ---------------------------------
   Gemini API
---------------------------------- */

/* ---------------------------------
   AI Polish
---------------------------------- */
</script>
