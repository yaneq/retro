import React, { FC, useEffect } from "react"
import { FirebaseProvider } from "@providers"
import Head from "next/head"
import { AppProps } from "next/app"
import "../styles/globals.css"
import TagManager from "react-gtm-module"

const GTM_ID = "GTM-53FCH4B"

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  // Google Tag Manager
  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID })
  }, [])

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
