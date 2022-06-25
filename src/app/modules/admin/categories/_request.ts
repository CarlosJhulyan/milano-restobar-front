import {httpClientFormData} from '../../../../api/api'
import {ApiPath} from '../../../../api/constans'
import {Category} from "./constantsCategory";

export function addCategories(body: Category, icono: File) {
  const formData = new FormData()
  formData.append('descripcion', body.descripcion_categoria)
  formData.append('codEncargado', body.cme_encargado_id_cme_encargado)

  if (icono) formData.append('imagen', icono)

  return httpClientFormData.post(ApiPath.Categories.Create, formData)
}