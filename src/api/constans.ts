export enum HTTP_METHODS {
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET',
  DELETE = 'DELETE'
}

export enum CONTENT_TYPE {
  APPLICAITON_JSON = 'application/json',
  MULTIPART_FORMDATA = 'multipart/form-data'
}

export const ApiPath = {
  Users: {
    Auth: 'usuario/login',
    List: 'usuario/getUsuarios',
    Create: 'usuario/createUsuario',
    Update: 'usuario/updateUsuario',
    Delete: 'usuario/deleteUsuario/',
    UpdateRole: 'usuario/updateRolUsuario',
  },
  Admin: {
    Auth: 'admin/login',
  },
  Ingredients: {
    List: 'ingrediente/getIngredientes',
    Create: 'ingrediente/createIngrediente',
    Update: 'ingrediente/updateIngrediente',
  },
  Plates: {
    Create: 'plato/createPlato',
    Update: 'plato/updatePlato',
    List: 'plato/getPlatos',
    ListByMenu: 'plato/getPlatosCarta'
  },
  Recipe: {
    RecipePlate: 'receta/getRecetaPlato',
    Create:'receta/createReceta',
    List: 'receta/getRecetas',
    Delete: 'receta/deleteRecetas',
  },
  Menus: {
    List: 'carta/getCartas',
    ListByRestaurant: 'carta/getCartasPorRestaurante',
    Create: 'carta/createCarta',
    Delete: 'carta/deleteCarta'
  },
  Restaurants: {
    List: 'restaurante/getRestaurantes',
    Create: 'restaurante/createRestaurantes',
    Delete: 'restaurante/deleteRestaurantes/',
    ListByRestaurant: 'restaurante/getMesasPorRestaurante',
  },
  Order: {
    Generate: 'pedido/generarPedido',
    RecentsByUser: 'pedido/getPedidosUsuario',
    ChangeStatus: 'pedido/updateEstadoPedido',
    GetDetailsComplete: 'pedido/getPedidosDetallesComp',
    GetFulfilled: 'pedido/getPedidosAtendidos',
    GetCanceled: 'pedido/getPedidosCancelados',
    GeneratePaymentForm: 'pedido/generarFormaPagoPedido'
  },
  Global: {
    GetCoinsType: 'getFormaPago'
  },
  Categories: {
    ListCategories: 'categoria/getListaCategorias',
    GetCategories: 'categoria/getCategoria',
    Create: 'categoria/createCategoria',
  },
  Table: {
    Create: 'mesa/createMesa',
    Delete: 'mesa/deleteMesa/',
    List: 'mesa/getMesas',
    ListByRestaurant: 'restaurante/getMesasPorRestaurante'
  }
}