import * as React from "react"
import { Footer, SEO, TopMenu } from "@components"
import firebase from "firebase/app"
import "firebase/auth"
import { useAuth, useUser } from "@providers"
import { FcGoogle } from "react-icons/fc"
import router from "next/router"
import Link from "next/link"
import { CheckCircleIcon } from "@heroicons/react/solid"

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
        <p className="flex justify-center filter drop-shadow-lg mt-8 mb-1">
          <img
            src="/reretro2.svg"
            alt="Reretro"
            className="w-2/3 sm:w-1/3 lg:w-1/4"
          />
        </p>
        <p className="text-xl sm:text-2xl font-extrabold text-center text-primary-btn-hover w-full filter drop-shadow-lg">
          Retrospectives <span className="text-primary-btn">you will love</span>
        </p>
        <div className="bg-green-400 rounded-2xl shadow-3xl p-5 lg:p-20 my-10 text-white font-sans">
          <video controls autoPlay loop muted className={"rounded-xl"}>
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

          <ul className="list-none mt-12 mx-0  text-md sm:text-2xl bg-blue mx-auto text-primary-btn-hover bg-white p-6 sm:p-12 rounded-xl">
            <li className="pb-8 flex items-center">
              <div className="w-14">
                <CheckCircleIcon className={"w-10 text-green-400"} />
              </div>
              <div className="flex-1">No login required for team members</div>
            </li>

            <li className="flex items-center">
              <div className="w-14">
                <CheckCircleIcon className={"w-10 text-green-400"} />
              </div>
              <div className="flex-1">Unlimited simultaneous users</div>
            </li>
          </ul>

          {!user && (
            <a
              className="items-center inline-flex px-10 py-5 mt-10 font-semibold text-black transition duration-200 ease-in-out transform rounded-lg hover:bg-gray-100 focus:outline-none bg-white cursor-pointer shadow-lg hover:shadow-xl"
              onClick={googleLogin}
            >
              <FcGoogle size={28} />
              <span className={"pl-3"}>Try it!</span>
            </a>
          )}
          {user && (
            <Link href="/boards">
              <button className="items-center w-full sm:w-auto px-10 py-5 mt-10 font-semibold text-primary-btn-hover hover:text-primary-btn transition duration-200 ease-in-out transform rounded-lg  focus:outline-none bg-white cursor-pointer shadow-lg hover:shadow-xl">
                Go to Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing
