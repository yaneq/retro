import React from "react"
import { FirebaseProvider } from "@providers"
import Head from "next/head"
import "../styles/globals.css"
import "tailwindcss/tailwind.css"

// import "../styles/paper-kit.css"

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Component {...pageProps} />
    </FirebaseProvider>
  )
}

export default MyApp
