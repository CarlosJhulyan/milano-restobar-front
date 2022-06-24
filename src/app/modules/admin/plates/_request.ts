import {httpClientFormData} from '../../../../api/api'
import {ApiPath} from '../../../../api/constans'
import { Plate } from './constantsPlates'

export function addPlates(body: Plate, avatar: File) {
  const formData = new FormData()
  formData.append('nombre', body.vta_nombre_plato)
  formData.append('descripcion', body.vta_desc_plato)
  formData.append('precio', body.vta_precio.toString())
  formData.append('codDificultad', body.vta_dificultad_id_vta_dificultad.toString())
  formData.append('codCategoria', body.vta_categoria_id_vta_categoria.toString())
  formData.append('codReceta', body.id_cme_receta.toString())

  if (avatar) formData.append('imagen', avatar)

  return httpClientFormData.post(ApiPath.Plates.Create, formData)
}

export function editPlates(body: Plate, avatar: File) {
  const formData = new FormData()

  formData.append('nombre', body.vta_nombre_plato)
  formData.append('descripcion', body.vta_desc_plato)
  formData.append('precio', body.vta_precio.toString())
  formData.append('id', body.id_vta_plato )
  formData.append('codDificultad', body.vta_dificultad_id_vta_dificultad.toString())
  formData.append('codCategoria', body.vta_categoria_id_vta_categoria.toString())
  formData.append('codReceta', body.id_cme_receta.toString())
  if (avatar) formData.append('imagen', avatar)

  return httpClientFormData.post(ApiPath.Plates.Update, formData)
}
