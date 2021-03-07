import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAhcCm2cEB_yY5V68GGPZMcU_IEA7nuKac",
  authDomain: "jk-retro.firebaseapp.com",
  projectId: "jk-retro",
  storageBucket: "jk-retro.appspot.com",
  messagingSenderId: "505664295047",
  appId: "1:505664295047:web:8b986803f8cccf89156822",
  measurementId: "G-9NSCWYJP6L",
}

export const initializeFirebase = () => {
  if (firebase.apps.length === 0) {
    const app = firebase.initializeApp(firebaseConfig)
    // firebase.analytics()
    return app
  }
  return firebase.apps[0]
}

initializeFirebase()

export const auth = firebase.auth()
export const firestore = firebase.firestore()
