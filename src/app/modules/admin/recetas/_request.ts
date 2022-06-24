import {httpClient} from '../../../../api/api'
import {ApiPath} from '../../../../api/constans'
// import {Restaurant} from './constants'
import { Receta } from './constats'

export function addRecetas(body: Receta) {
  const formData = {
    // id_cme_receta: body.id_cme_receta,
    descripcion: body.descripcion,
  }
  return httpClient.post(ApiPath.Recipe.Create, formData)
}

// export function deleteReceta(id_cme_receta: any) {
//   return httpClient.delete(ApiPath.Recipe.Delete + id_cme_receta)
// }
