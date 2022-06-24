import {httpClientFormData} from '../../../../api/api'
import {ApiPath} from '../../../../api/constans'
import { Ingredient } from './constantsIngrediente'
// import { Ingredient } from './constantsPlates'

export function addIngredients(body: Ingredient) {
  const formData = new FormData()
 
  
  formData.append('nombre', body.nombre)
  formData.append('precioCompra', body.precio_compra!)
  formData.append('stock', body.stock_fisico)
  formData.append('estado', body.estado)
  formData.append('codMedida', body.lgt_medida_id_lgt_medida)

  return httpClientFormData.post(ApiPath.Ingredients.Create, formData)
}

export function editIngredients(body: Ingredient) {
  const formData = new FormData()

  formData.append('id', body.id_cme_ingrediente)
  formData.append('nombre', body.nombre)
  formData.append('precioCompra', body.precio_compra!)
  formData.append('stock', body.stock_fisico)
  formData.append('estado', body.estado)
  formData.append('codMedida', body.lgt_medida_id_lgt_medida)

  return httpClientFormData.post(ApiPath.Ingredients.Update, formData)
}
