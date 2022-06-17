export type Menu = {
  id_vta_carta?: number
  vta_descripcion_carta?: string
  lgt_restaurante_id_lgt_restaurante?: number
}

export type Plate = {
  id_vta_plato?: number
  vta_nombre_plato?: string
  vta_desc_plato?: string
  vta_ruta_imagen_plato?: string
  id_vta_carta?: number
  vta_precio?: string
  vta_categoria_plato?: string
  id_cme_receta?: number
  cantidad?: number
}

export type Table = {
  id_vta_mesa?: number
  vta_numero_mesa?: number
  lgt_restaurante_id_lgt_restaurante?: number
}

export type Restaurant = {
  id_lgt_restaurante?: number
  lgt_nombre_resturante?: string
  lgt_direccion?: string
  lgt_ruc_razon_restaurante?: string
  lgt_horario_apertura?: string
  lgt_horario_cierre?: string
}

export type IngredientRecipe = {
  id_cme_ingrediente?: number
  cantidad?: number
  unidad_medida?: string
  nombre?: string
}

export type Recipe = {
  id_cme_receta?: number
  descripcion?: string
  ingredientes?: Array<IngredientRecipe>
}

export type OrderHeader = {
  idvta_pedido_venta_cab?: number
  estado?: string
  monto_total?: number
  id_usuario?: number
  id_cliente?: number
  vta_mesa_id_mesa?: number
  fecha_creacion?: string
  fecha_edicion?: string,
  vta_mesa_id_vta_mesa?: string
}

export type OrderDetail = {
  id_vta_plato?: number
  precio?: number
  cantidad?: number
  id_cme_receta?: number
  idvta_pedido_venta_cab?: number
}