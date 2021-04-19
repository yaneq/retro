import * as React from "react"
import { TopMenu } from "@components"
import firebase from "firebase/app"
import "firebase/auth"
import { useAuth } from "@providers"
import { Google } from "react-bootstrap-icons"
import router from "next/router"

const Landing = () => {
  const auth = useAuth()
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
      <TopMenu />
      <div className="container bg-gradient-to-r from-blue-700 to-purple-800 rounded-2xl shadow-3xl p-20 my-10 text-white font-sans">
        <p className="text-6xl font-extrabold text-center text-white w-full filter drop-shadow-lg">
          Just another
        </p>
        <p className="text-6xl font-extrabold text-center text-blue-100 w-full filter drop-shadow-lg">
          retrospective tool
        </p>
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

        <a
          className="items-center inline-flex px-10 py-5 mt-10 font-semibold text-black transition duration-500 ease-in-out transform rounded-lg hover:bg-gray-100 focus:outline-none bg-white cursor-pointer shadow-lg hover:shadow-xl"
          onClick={googleLogin}
        >
          <Google />
          <span className={"pl-3"}>Sign up for free</span>
        </a>
      </div>
      {/* <div className="flex">
        <div className="container mt-5 flex-none w-full border-dashed p-5">
          <h1 className="font-bold text-4xl">Some sans font</h1>
        </div>
      </div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-gray-500">You have a new message!</p>
        </div>
      </div>
      <div className="container w-full p-20 m-4 mx-auto my-16 text-center bg-white border-2 border-dashed border-blueGray-300 h-96 rounded-xl">
        <p className="mt-20 italic tracking-tighter text-md text-blueGray-500 title-font">
          -- Content goes here --
        </p>
      </div> */}
    </div>
  )
}

export default Landing
