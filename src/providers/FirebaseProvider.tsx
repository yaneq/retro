import * as React from "react"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { initializeFirebase } from "src/helpers/utils"

const FirebaseContext = React.createContext<{
  app?: firebase.app.App
  auth?: firebase.auth.Auth
  firestore?: firebase.firestore.Firestore
}>({})

interface IFirebaseContextProps {}

export const FirebaseProvider: React.FC<IFirebaseContextProps> = ({
  children,
}) => {
  const app = initializeFirebase()

  return (
    <FirebaseContext.Provider
      value={{
        app,
        auth: app.auth(),
        firestore: app.firestore(),
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => React.useContext(FirebaseContext)

export const useAuth = (): firebase.auth.Auth => {
  const { auth } = useFirebase()
  return auth!
}

interface IUseUserState {
  user: firebase.User | null
  loading: boolean
}

export const useUser = (): IUseUserState => {
  const { app } = useFirebase()
  const [state, setState] = React.useState<IUseUserState>({
    user: null,
    loading: true,
  })

  React.useEffect(() => {
    return app?.auth().onIdTokenChanged(async (newValue) => {
      setState({ user: newValue, loading: false })
    })
  }, [app])

  return state
}

interface ICustomClaims {
  premiumAccount?: boolean
}

export const useCustomClaims = (): ICustomClaims => {
  const { user } = useUser()
  const [claims, setClaims] = React.useState<ICustomClaims>({})

  React.useEffect(() => {
    if (!!user) {
      setClaims({})
    }
    {
      user?.getIdTokenResult(true).then((result) => {
        if (result) {
          setClaims(result.claims)
        }
      })
    }
  }, [user])

  return claims
}
