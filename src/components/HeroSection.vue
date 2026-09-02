<template>
  <section class="hero">
    <div class="seam"></div>

    <div class="hero-ink">
      <div class="eyebrow">
        {{ t.eyebrowInput }}
      </div>

      <div
        class="terminal-block mono"
        v-html="typedHtml"
      ></div>
    </div>

    <div class="hero-paper">
      <h1 class="hero-doc-title">
        {{ data.name || t.heroPlaceholderName }}
      </h1>

      <div class="hero-doc-role">
        {{ data.role || heroRoleSample }}
      </div>

      <div class="hero-doc-rule"></div>

      <div
        class="hero-doc-line"
        style="width:92%"
      ></div>

      <div
        class="hero-doc-line"
        style="width:78%"
      ></div>

      <div
        class="hero-doc-line"
        style="width:85%"
      ></div>
    </div>
  </section>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
  watch
} from 'vue'

import {
  I18N,
  ROLE_SAMPLES_EN,
  ROLE_SAMPLES_AR
} from '../i18n.js'

import { useResumeStore } from '../stores/resume.js'

const resume = useResumeStore()

const lang = computed(() => resume.lang)

const t = computed(() => I18N[lang.value])

const data = resume.data

const roleSampleIdx = ref(0)

const heroRoleSample = computed(() =>
  lang.value === 'ar'
    ? ROLE_SAMPLES_AR[roleSampleIdx.value]
    : ROLE_SAMPLES_EN[roleSampleIdx.value]
)

setInterval(() => {
  roleSampleIdx.value =
    (
      roleSampleIdx.value + 1
    ) % ROLE_SAMPLES_EN.length
}, 2600)

const typedHtml = ref('')

function buildScript() {
  const role = heroRoleSample.value

  if (lang.value === 'ar') {
    return `
<span class="k">بيانات</span> = {
  الدور: <span class="s">"${role}"</span>,
  الحالة: <span class="s">"جاهز للتقديم"</span>
}`
  }

  return `
<span class="k">const</span> profile = {
  role: <span class="s">"${role}"</span>,
  status: <span class="s">"ready to apply"</span>
}`
  }

function revealSlice(html, count) {
  let out = ''
  let visible = 0
  let inTag = false

  for (const ch of html) {
    if (ch === '<') {
      inTag = true
    }

    if (!inTag) {
      if (visible >= count) {
        break
      }

      visible++
    }

    out += ch

    if (ch === '>') {
      inTag = false
    }
  }

  return out
}

function runTyping() {
  const raw = buildScript()

  const plain =
    raw.replace(/<[^>]*>/g, '')

  let i = 0

  typedHtml.value = ''

  const timer = setInterval(() => {
    i++

    typedHtml.value =
      revealSlice(raw, i) +
      '<span class="cursor"></span>'

    if (i >= plain.length) {
      clearInterval(timer)
    }
  }, 26)
}

onMounted(() => {
  runTyping()
})

watch(
  [lang, roleSampleIdx],
  () => {
    runTyping()
  }
)
</script>