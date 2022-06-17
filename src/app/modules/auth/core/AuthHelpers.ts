import {AuthModel} from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'auth'
const AUTH_ADMIN_LOCAL_STORAGE_KEY = 'auth-admin'

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const auth = getAuth()
      if (auth && auth.message) {
        config.headers.Authorization = `Bearer ${auth.message}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

// Admin

const getAuthAdmin = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_ADMIN_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      return auth
    }
  } catch (error) {
    console.error('AUTH_ADMIN LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuthAdmin = (admin: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(admin)
    localStorage.setItem(AUTH_ADMIN_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH ADMIN LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuthAdmin = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_ADMIN_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH ADMIN LOCAL STORAGE REMOVE ERROR', error)
  }
}

export {
  getAuth,
  setAuth, 
  removeAuth, 
  AUTH_LOCAL_STORAGE_KEY,
  getAuthAdmin,
  setAuthAdmin,
  removeAuthAdmin,
  AUTH_ADMIN_LOCAL_STORAGE_KEY,
}
