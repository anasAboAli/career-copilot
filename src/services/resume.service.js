import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc
} from 'firebase/firestore'

import app from '../firebase.js'

const db = getFirestore(app)

export async function saveResume(
  userId,
  data,
  lang
) {
  const resumeRef = doc(
    db,
    'resumes',
    userId
  )

  await setDoc(resumeRef, {
    data,
    lang,
    updatedAt: new Date()
  })
}

export async function getResume(userId) {
  const resumeRef = doc(
    db,
    'resumes',
    userId
  )

  const snapshot = await getDoc(resumeRef)

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data()
}

export async function deleteResume(userId) {
  const resumeRef = doc(
    db,
    'resumes',
    userId
  )

  await deleteDoc(resumeRef)
}