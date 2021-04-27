import * as React from "react"
import { SEO, TopMenu } from "@components"
import firebase from "firebase/app"
import "firebase/auth"
import { useAuth, useUser } from "@providers"
import { FcGoogle } from "react-icons/fc"
import router from "next/router"
import Link from "next/link"
import Head from "next/head"

const Landing = () => {
  const auth = useAuth()
  const { user } = useUser()
  const googleLogin = () => {
    let provider = new firebase.auth.GoogleAuthProvider()
    auth
      .signInWithPopup(provider)
      .then(() => {
        router.push("/boards")
      })
      .catch((error) => {
        console.log("error logging in", { error })
      })
  }

  return (
    <div>
      <SEO />
      <TopMenu showAuth={true} showPricing={true} />
      <div className="container">
          <p className="flex justify-center filter drop-shadow-lg">
          <img src="/reretro2.svg" alt="Reretro" className="w-1/3" />
          </p>
        <p className="text-2xl sm:text-2xl font-extrabold text-center text-primary-btn-hover w-full filter drop-shadow-lg">
          Retrospective <span className="text-primary-btn">you will love</span>
          </p>
        <div className="bg-green-400 rounded-2xl shadow-3xl p-5 sm:p-20 my-10 text-white font-sans">
          <video autoPlay={true} loop={true}>
            <source src="/reretro-preview.webm" type="video/webm" />
          </video>
          <p className="text-xl mt-10 font-bold py-2">
            What is a Sprint Retrospective?
          </p>

          <p className="py-1">
            As described in the Scrum Guide, the purpose of the Sprint
            Retrospective is to plan ways to increase quality and effectiveness.
          </p>
          <p className="py-1">
            The Scrum Team inspects how the last Sprint went with regards to
            individuals, interactions, processes, tools, and their Definition of
            Done. Inspected elements often vary with the domain of work.
            Assumptions that led them astray are identified and their origins
            explored. The Scrum Team discusses what went well during the Sprint,
            what problems it encountered, and how those problems were (or were
            not) solved.
          </p>

          {!user && (
            <a
              className="items-center inline-flex px-10 py-5 mt-10 font-semibold text-black transition duration-500 ease-in-out transform rounded-lg hover:bg-gray-100 focus:outline-none bg-white cursor-pointer shadow-lg hover:shadow-xl"
              onClick={googleLogin}
            >
              <FcGoogle size={28} />
              <span className={"pl-3"}>Try it!</span>
            </a>
          )}
          {user && (
            <Link href="/boards">
              <button className="items-center px-10 py-5 mt-10 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg hover:bg-green-500 focus:outline-none bg-green-400 cursor-pointer shadow-lg hover:shadow-xl">
                Go to Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-100 mt-20">
        <div className="container py-20"></div>
      </div>
      <div className="bg-black w-full ">
        <div className="container py-10 text-gray-400 text-center font-sans text-sm font-bold">
          © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}

export default Landing
