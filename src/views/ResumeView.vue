<template>
  <div id="app" :dir="dir">
    <!-- Language switch -->
    <LangSwitch />

    <div class="account-actions">
      <span v-if="auth.user?.email" class="user-email">
        {{ auth.user.email }}
      </span>

      <button class="logout-btn" @click="handleLogout">
        {{ t.authLogout }}
      </button>
    </div>

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
      </Workbench>
    </section>

    <footer>
      <p id="anasName">{{ t.footer }}</p>
      <a id="whatsAnas" href="https://wa.me/970598143863" target="_blank">{{
        t.whatsApp
      }}</a>
    </footer>
  </div>
</template>

<style scoped>
#anasName {
  font-weight: bold;
  font-size: 15px;
  color: white;
  margin-top: 0;
}
#whatsAnas {
  font-weight: bold;
  font-size: 15px;
  color: #7c6ff0;
  transition: 0.3s;
  display: inline-block;
}
#whatsAnas:hover {
  transform: scale(1.2);
}
</style>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

import LangSwitch from "../components/LangSwitch.vue";
import HeroSection from "../components/HeroSection.vue";
import Workbench from "../components/Workbench.vue";

import PersonalStep from "../components/steps/PersonalStep.vue";
import SummaryStep from "../components/steps/SummaryStep.vue";
import ExperienceStep from "../components/steps/ExperienceStep.vue";
import SkillsStep from "../components/steps/SkillsStep.vue";
import ProjectsStep from "../components/steps/ProjectsStep.vue";

import {
  getResume,
  saveResume,
  deleteResume,
} from "../services/resume.service.js";
import { logout } from "../services/auth.service.js";

import { I18N } from "../i18n.js";

import { useResumeStore } from "../stores/resume.js";
import { useAuthStore } from "../stores/auth.js";

const resume = useResumeStore();
const auth = useAuthStore();
const router = useRouter();

auth.initAuth();

watch(
  () => auth.user,
  async (user) => {
    if (!user) {
      return;
    }

    try {
      const savedResume = await getResume(user.uid);

      if (savedResume?.data) {
        Object.assign(resume.data, savedResume.data);
      }

      if (savedResume?.lang) {
        resume.lang = savedResume.lang;
      }
    } catch (error) {
      console.error("Firestore load error:", error);
    }
  },
);

resume.loadFromLocalStorage();

const appSection = ref(null);

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

const data = resume.data;

const dir = computed(() => resume.dir);

const t = computed(() => I18N[lang.value]);

let firestoreSaveTimer = null;
let skipNextFirestoreSave = false;

function scheduleFirestoreSave() {
  clearTimeout(firestoreSaveTimer);

  if (skipNextFirestoreSave) {
    skipNextFirestoreSave = false;
    return;
  }

  if (!auth.user) {
    return;
  }

  firestoreSaveTimer = setTimeout(async () => {
    try {
      await saveResume(auth.user.uid, resume.data, resume.lang);
    } catch (error) {
      console.error("Firestore save error:", error);
    }
  }, 800);
}

watch(
  () => resume.data,
  async () => {
    resume.saveToLocalStorage();

    scheduleFirestoreSave();
  },
  { deep: true },
);

watch(
  () => resume.lang,
  async () => {
    resume.saveToLocalStorage();

    scheduleFirestoreSave();
  },
);

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

function scrollToApp() {
  appSection.value?.scrollIntoView({
    behavior: "smooth",
  });
}

async function handleLogout() {
  await logout();
  await router.push("/login");
}
</script>
