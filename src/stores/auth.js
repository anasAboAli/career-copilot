import { defineStore } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

import app from '../firebase.js'

const auth = getAuth(app)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true,
    initialized: false
  }),

  getters: {
    isAuthenticated: state =>
      !!state.user
  },

  actions: {
    initAuth() {
      if (this.initialized) {
        return
      }

      this.initialized = true

      onAuthStateChanged(auth, user => {
        this.user = user
        this.loading = false
      })
    }
  }
})