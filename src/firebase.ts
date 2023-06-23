// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCO9ADi_WmaHeqnPEFvD_45Lei78NFnPAc',
  authDomain: 'to-do-989c9.firebaseapp.com',
  projectId: 'to-do-989c9',
  storageBucket: 'to-do-989c9.appspot.com',
  messagingSenderId: '87124149783',
  appId: '1:87124149783:web:df2e5d7d584a1b16fbfe52',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth: Auth = getAuth(app)

export const db: Firestore = getFirestore(app)

export default app
