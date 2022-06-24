import { Store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';

type TypeNotification =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'default';

type TypeTitleSystem =
  | 'Sistema'
  | 'Restaurant'
  | 'Login'
  | 'Registro'
  | 'Usuario'
  | 'Pedido'
  | 'Carta'
  | 'Rol'
  | 'Administrador';


export const openNotification = (title: TypeTitleSystem, type: TypeNotification = 'default', messageExt?: String) => {
  const messageErrorDefault = 'Error en la petición';

  let message = messageExt;
  if (type === 'danger') message = messageErrorDefault;

  Store.addNotification({
    title,
    message,
    type,
    container: 'top-right',
    insert: 'top',
    dismiss: {
      duration: 2000
    },
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
  });
}