import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {
  AuthModel, 
  UserModel
} from './_models'
import * as authHelper from './AuthHelpers'
import {login, loginAdmin} from './_requests'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void

  authAdmin: AuthModel | undefined
  saveAuthAdmin: (auth: AuthModel | undefined) => void
  currentAdmin: UserModel | undefined
  setCurrentAdmin: Dispatch<SetStateAction<UserModel | undefined>>
  logoutAdmin: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},

  authAdmin: authHelper.getAuthAdmin(),
  saveAuthAdmin: () => {},
  currentAdmin: undefined,
  setCurrentAdmin: () => {},
  logoutAdmin: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [authAdmin, setAuthAdmin] = useState<AuthModel | undefined>(authHelper.getAuthAdmin())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const [currentAdmin, setCurrentAdmin] = useState<UserModel | undefined>()
  
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const saveAuthAdmin = (auth: AuthModel | undefined) => {
    setAuthAdmin(auth)
    if (auth) {
      authHelper.setAuthAdmin(auth)
    } else {
      authHelper.removeAuthAdmin()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  const logoutAdmin = () => {
    saveAuthAdmin(undefined)
    setCurrentAdmin(undefined)
  }

  return (
    <AuthContext.Provider 
      value={{
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        logout,
        authAdmin, 
        saveAuthAdmin, 
        currentAdmin, 
        setCurrentAdmin,
        logoutAdmin,
      }}>
        {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC = ({children}) => {
  const {auth, logout, setCurrentUser, authAdmin, setCurrentAdmin, logoutAdmin} = useAuth()
  const didRequest = useRef(false)
  const didRequestAdmin = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    const requestUser = async (user: UserModel) => {
      try {
        if (!didRequest.current) {          
          const lsValue: string | null = localStorage.getItem(authHelper.AUTH_LOCAL_STORAGE_KEY)
          if (!lsValue) {
            return
          }
          const data = JSON.parse(lsValue) as AuthModel
          setCurrentUser(data.data)
        }
      } catch (error) {
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    const requestAdmin = async (user: UserModel) => {
      try {
        if (!didRequestAdmin.current) {
          const lsValue: string | null = localStorage.getItem(authHelper.AUTH_ADMIN_LOCAL_STORAGE_KEY)
          if (!lsValue) {
            return
          }
          const data = JSON.parse(lsValue) as AuthModel
          setCurrentAdmin(data.data)
        }
      } catch (error) {
        if (!didRequestAdmin.current) {
          logoutAdmin()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequestAdmin.current = true)
    }

    if (auth && auth.data) {
      requestUser(auth.data)
    } else {
      logout()
      setShowSplashScreen(false)
    }

    if (authAdmin && authAdmin.data) {
      requestAdmin(authAdmin.data)
    } else {
      logoutAdmin()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
