import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth'

import app from '../firebase.js'

const auth = getAuth(app)

export async function register(email, password) {
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

  await sendEmailVerification(
    userCredential.user
  )

  await signOut(auth)

  return userCredential
}

export async function login(email, password) {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

  if (!userCredential.user.emailVerified) {
    await signOut(auth)

    const error = new Error(
      'Email verification required'
    )

    error.code = 'auth/email-not-verified'

    throw error
  }

  return userCredential
}
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email)
}
export async function resendVerificationEmail(email, password) {

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

  if (userCredential.user.emailVerified) {
    await signOut(auth)

    const error = new Error(
      'Email already verified'
    )

    error.code = 'auth/email-already-verified'

    throw error
  }

  await sendEmailVerification(
    userCredential.user
  )

  await signOut(auth)
}
export async function logout() {
  return await signOut(auth)
}

export function getCurrentUser() {
  return auth.currentUser
}

export function waitForAuthReady() {
  return new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    })
  })
}

export function getAuthErrorMessage(errorCode, lang) {
  const messages = {
    ar: {
      'auth/email-not-verified':
        'يرجى تأكيد بريدك الإلكتروني أولًا. تحقق من صندوق الوارد ثم سجّل الدخول مرة أخرى.',

      'auth/invalid-email':
        'البريد الإلكتروني غير صحيح.',

      'auth/missing-password':
        'يرجى إدخال كلمة المرور.',

      'auth/weak-password':
        'كلمة المرور يجب أن تكون 6 أحرف على الأقل.',

      'auth/email-already-in-use':
        'هذا البريد الإلكتروني مستخدم بالفعل.',

      'auth/invalid-credential':
        'البريد الإلكتروني أو كلمة المرور غير صحيحة.',

      'auth/user-not-found':
        'لا يوجد حساب بهذا البريد الإلكتروني.',

      'auth/wrong-password':
        'كلمة المرور غير صحيحة.',

      'auth/too-many-requests':
        'تمت محاولات كثيرة. حاول مرة أخرى لاحقًا.'
    },

    en: {
      'auth/email-not-verified':
        'Please verify your email first. Check your inbox, then log in again.',

      'auth/invalid-email':
        'Please enter a valid email address.',

      'auth/missing-password':
        'Please enter a password.',

      'auth/weak-password':
        'Password must be at least 6 characters.',

      'auth/email-already-in-use':
        'This email is already in use.',

      'auth/invalid-credential':
        'Invalid email or password.',

      'auth/user-not-found':
        'No account exists with this email.',

      'auth/wrong-password':
        'Incorrect password.',

      'auth/too-many-requests':
        'Too many attempts. Please try again later.'
    }
  }

  return (
    messages[lang]?.[errorCode] ||
    messages.en[errorCode] ||
    'Something went wrong. Please try again.'
  )
}