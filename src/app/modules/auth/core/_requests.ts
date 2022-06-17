import { httpClient } from '../../../../api/api'
import {AuthModel, UserModel} from './_models'
import { ApiPath } from '../../../../api/constans'

export function login(user: string, password: string) {
  return httpClient.post<AuthModel>(ApiPath.Users.Auth, {
    user,
    password,
  })
}

export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return httpClient.post(ApiPath.Users.Auth, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

export function requestPassword(email: string) {
  return httpClient.post<{result: boolean}>(ApiPath.Users.Auth, {
    email,
  })
}

export function getUserByToken(token: string) {
  return httpClient.post<UserModel>(ApiPath.Users.Auth, {
    api_token: token,
  })
}

export function loginAdmin(user: string, password: string) {
  return httpClient.post<AuthModel>(ApiPath.Admin.Auth, {
    user,
    password,
  })
}