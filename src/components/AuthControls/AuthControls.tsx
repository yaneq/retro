import * as React from "react"
import { useAuth, useUser } from "@providers"
import { Button } from "react-bootstrap"
import firebase from "firebase/app"
import "firebase/auth"
import Link from "next/link"

export const AuthControls = () => {
  const auth = useAuth()
  const { user, loading } = useUser()

  const googleLogin = () => {
    let provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).catch((error) => {
      console.log("error logging in", { error })
    })
  }

  const logOut = () => {
    auth.signOut()
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
          <Link href="/boards">
            <Button>Go to dashboard</Button>
          </Link>
          <Button variant={"link"} onClick={logOut}>
            Log out
          </Button>
        </>
      )}
    </>
  )
}
