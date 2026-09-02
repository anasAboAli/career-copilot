<template>
  <div>
    <!-- Full name -->
    <div class="field-group">
      <label>{{ t.fullName }}</label>

      <input
        type="text"
        v-model="data.name"
        :placeholder="t.fullNamePh"
      />
    </div>

    <!-- Target role -->
    <div class="field-group">
      <label>{{ t.targetRole }}</label>

      <input
        type="text"
        v-model="data.role"
        :placeholder="t.targetRolePh"
      />

      <span
        v-if="suggesting"
        class="ph-hint mono"
      >
        {{ t.suggesting }}
      </span>

      <span
        v-else-if="data.role && suggested"
        class="ph-hint mono"
      >
        {{ t.suggestedFor }} ✦{{ data.role }}✧
      </span>
    </div>

    <!-- Email + Location -->
    <div class="row2">

      <div class="field-group">
        <label>{{ t.email }}</label>

        <input
          type="email"
          v-model="data.email"
          placeholder="you@email.com"
        />
      </div>

      <div class="field-group">
        <label>{{ t.location }}</label>

        <input
          type="text"
          v-model="data.location"
          :placeholder="t.locationPh"
        />
      </div>

    </div>

    <!-- Links -->
    <div class="field-group">
      <label>{{ t.links }}</label>

      <input
        type="text"
        v-model="data.links"
        :placeholder="t.linksPh"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { I18N } from '../../i18n.js'

import { useResumeStore } from '../../stores/resume.js'

const resume = useResumeStore()

const lang = computed(() => resume.lang)

const t = computed(() => I18N[lang.value])

const data = resume.data

const suggesting = computed(() =>
  resume.suggesting
)

const suggested = computed(() =>
  resume.suggested
)
</script>