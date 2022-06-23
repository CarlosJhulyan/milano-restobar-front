import {httpClientFormData} from '../../../../api/api'
import {User} from './constants'
import {ApiPath} from '../../../../api/constans'

export function addUser(body: User, avatar: File) {
  const formData = new FormData()

  formData.append('nombre', body.nombre)
  formData.append('apellidom', body.apellido_materno)
  formData.append('apellidop', body.apellido_paterno)
  formData.append('fechaNac', body.fecha_nacimiento)
  formData.append('correo', body.correo!)
  formData.append('celular', body.celular!)
  formData.append('dni', body.dni!)
  formData.append('direccion', body.direccion!)

  if (avatar) formData.append('avatar', avatar)

  return httpClientFormData.post(ApiPath.Users.Create, formData)
}

export function editUser(body: User, avatar: File) {
  const formData = new FormData()

  formData.append('idusuario', body.id_cme_usuario)
  formData.append('nombre', body.nombre)
  formData.append('apellidom', body.apellido_materno)
  formData.append('apellidop', body.apellido_paterno)
  formData.append('fechaNac', body.fecha_nacimiento)
  formData.append('correo', body.correo!)
  formData.append('celular', body.celular!)
  formData.append('dni', body.dni!)
  formData.append('direccion', body.direccion!)

  if (avatar) formData.append('avatar', avatar)

  return httpClientFormData.put(ApiPath.Users.Update, formData)
}
