import { FirebaseProvider } from "@providers"
import "bootstrap/dist/css/bootstrap.css"
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
