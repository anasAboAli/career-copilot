<template>
  <div class="auth-form">
    <div class="field-group">
      <label>{{ t.authEmail }}</label>

      <input
        v-model="email"
        type="email"
        autocomplete="email"
        placeholder="you@email.com"
      />
    </div>

    <div class="field-group">
      <label>{{ t.authPassword }}</label>

      <input
        v-model="password"
        type="password"
        autocomplete="current-password"
        placeholder="••••••••"
      />
    </div>

    <div class="auth-actions">
      <button
        class="btn-primary"
        :disabled="loading"
        @click="props.mode === 'register' ? handleRegister() : handleLogin()"
      >
        {{
          loading
            ? t.authLoading
            : props.mode === "register"
              ? t.authRegister
              : t.authLogin
        }}
      </button>
    </div>

    <p v-if="message" class="auth-message">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: "login",
  },
});
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { I18N } from "../i18n.js";
import { useResumeStore } from "../stores/resume.js";
import {
  login,
  register,
  getAuthErrorMessage,
} from "../services/auth.service.js";

const router = useRouter();

const email = ref("");
const password = ref("");

const resume = useResumeStore();

const lang = computed(() => resume.lang);

const t = computed(() => I18N[lang.value]);

const loading = ref(false);
const message = ref("");

async function handleLogin() {
  message.value = t.value.authLoginSuccess;
  loading.value = true;

  try {
    await login(email.value.trim(), password.value);

    await router.push("/app");
  } catch (error) {
    console.error("Login error:", error);

    message.value = getAuthErrorMessage(error.code, lang.value);
  } finally {
    loading.value = false;
  }
}

async function handleRegister() {
  message.value = "";
  loading.value = true;

  try {
    await register(email.value.trim(), password.value);
    await router.push("/app");
  } catch (error) {
    console.error("Registration error:", error);

    message.value = getAuthErrorMessage(error.code, lang.value);
  } finally {
    loading.value = false;
  }
}
</script>
