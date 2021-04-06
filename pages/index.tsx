import { AuthControls } from "@components"
import { useAuth, useFirebase, useUser } from "@providers"
import * as React from "react"
import { Spinner } from "react-bootstrap"

const Landing = () => {
  const { user, loading } = useUser()
  const auth = useAuth()

  return (
    <div>
      <AuthControls />
      <h1>Welcome to ReRetro</h1>
      {loading && <Spinner animation={"border"} />}
      {user && <>user is {user?.displayName}</>}
    </div>
  )
}

export default Landing
