import { FirebaseProvider } from "@providers"
import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.css"
import "tailwindcss/tailwind.css"
import React from "react"
import "../styles/paper-kit.css"

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  )
}

export default MyApp
