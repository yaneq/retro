import * as React from "react"
import { useAuth, useUser } from "@providers"
import { Button } from "react-bootstrap"
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
    auth.signInWithPopup(provider).catch((error) => {
      console.log("error logging in", { error })
    })
  }

  const logOut = () => {
    auth.signOut()
    router.push("/")
  }

  return (
    <>
      {!user && (
        <>
          <Button onClick={googleLogin}>Log in</Button>
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
            <Button className="items-center px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg hover:bg-blueGray-900 focus:ring focus:outline-none">
              Dashboard
            </Button>
          </Link>
        </>
      )}
    </>
  )
}
