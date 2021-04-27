import Head from "next/head"
import React from "react"

const TITLE = "Reretro.app - Easy to Use"
const DESCRIPTION = "Free and easy to use retrospective tool for teams"

export const SEO = () => (
  <Head>
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="362" />
    <meta property="og:image" content="/preview.png" />
    <meta name="description" content={DESCRIPTION} />
    <meta property="og:title" content={TITLE} />
    <meta property="og:description" content={DESCRIPTION} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="Penny" />
    <meta name="twitter:title" content={TITLE} />
    <meta name="twitter:description" content={DESCRIPTION} />
  </Head>
)
