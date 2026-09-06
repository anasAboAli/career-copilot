<template>
  <div class="auth-page">
    <LangSwitch />

    <div class="auth-card">
      <div class="auth-brand">
        <span class="mono"> career-copilot </span>

        <span class="auth-status"> / register </span>
      </div>

      <h1>
        {{ t.registerTitle }}
      </h1>

      <p class="auth-subtitle">
        {{ t.registerSubtitle }}
      </p>

      <AuthForm mode="register" />

      <p class="auth-switch">
        {{ t.authHaveAccount }}
        <RouterLink to="/login">
          {{ t.authLoginLink }}
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from "vue";

import LangSwitch from "../components/LangSwitch.vue";
import AuthForm from "../components/AuthForm.vue";

import { I18N } from "../i18n.js";
import { useResumeStore } from "../stores/resume.js";

const resume = useResumeStore();

const lang = computed(() => resume.lang);

const t = computed(() => I18N[lang.value]);

</script>
