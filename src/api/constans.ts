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
    UpdateRole: 'usuario/updateRolUsuario',
  },
  Admin: {
    Auth: 'admin/login',
  },
  Ingredients: {
    List: 'ingrediente/getIngredientes',
  },
  Plates: {
    List: 'plato/getPlatos',
    ListByMenu: 'plato/getPlatosCarta'
  },
  Recipe: {
    RecipePlate: 'receta/getRecetaPlato',
  },
  Menus: {
    List: 'carta/getCartas',
    ListByRestaurant: 'carta/getCartasPorRestaurante',
    Create: 'carta/createCarta',
    Delete: 'carta/deleteCarta'
  },
  Restaurants: {
    List: 'restaurante/getRestaurantes',
    ListByRestaurant: 'restaurante/getMesasPorRestaurante',
  },
  Order: {
    Generate: 'pedido/generarPedido',
    RecentsByUser: 'pedido/getPedidosUsuario',
    ChangeStatus: 'pedido/updateEstadoPedido'
  }
}