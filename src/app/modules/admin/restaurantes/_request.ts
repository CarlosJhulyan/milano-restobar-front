import {httpClient} from '../../../../api/api'
import {ApiPath} from '../../../../api/constans'
import {Restaurant} from './constants'

export function addRestaurant(body: Restaurant) {
  const formData = {
    id_lgt_restaurante: body.id_lgt_restaurante,
    lgt_nombre_resturante: body.lgt_nombre_resturante,
    lg_ruc_resturante: body.lg_ruc_resturante,
    lgt_razon_restaurante: body.lgt_razon_restaurante,
    lgt_direccion_restaurante: body.lgt_direccion_restaurante,
    lgt_horario_apertura: body.lgt_horario_apertura,
    lgt_horario_cierre: body.lgt_horario_cierre,
  }

  return httpClient.post(ApiPath.Restaurants.Create, formData)
}

export function deleteRestaurant(id: string) {
  return httpClient.delete(ApiPath.Restaurants.Delete + id)
}
