import {Menu} from "./constants";
import {KTSVG} from "../../../../_metronic/helpers";

type Props = {
  menu: Menu,
  handleSetMenuItem: (menu: Menu) => void,
  handleDeleteMenu: (id: number) => void
}

const ItemMenuList = ({ menu, handleSetMenuItem, handleDeleteMenu }: Props) => {

  return (
    <tr>
      <td className='text-dark fw-bolder text-hover-primary fs-6'>
        {menu.vta_descripcion_carta}
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>
          {menu.vta_restaurante_carta}
        </span>
      </td>
      <td className='text-end'>
        {/*<button*/}
        {/*    type="button"*/}
        {/*    onClick={() => handleSetMenuItem(menu)}*/}
        {/*    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'*/}
        {/*>*/}
        {/*  <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />*/}
        {/*</button>*/}
        <button
          onClick={() => handleDeleteMenu(menu.id_vta_carta || 0)}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        >
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </button>
      </td>
    </tr>
  )
}

export {ItemMenuList}