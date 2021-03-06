import * as React from "react"
import { useAuth, useUser } from "@providers"
import firebase from "firebase/app"
import "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"

export const AuthControls = () => {
  const auth = useAuth()
  const { user, loading } = useUser()
  const router = useRouter()

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

  const logOut = () => {
    auth.signOut()
    router.push("/")
  }

  return (
    <div className={"font-sans"}>
      {!user && (
        <>
          <button
            className="items-center px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg hover:bg-green-500 focus:outline-none bg-green-400"
            onClick={googleLogin}
          >
            Log in
          </button>
        </>
      )}
      {user && (
        <>
          <a
            className="mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={logOut}
          >
            Log out
          </a>
          <Link href="/boards">
            <button className="items-center px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg hover:bg-green-500 focus:outline-none bg-green-400">
              Dashboard
            </button>
          </Link>
        </>
      )}
    </div>
  )
}
