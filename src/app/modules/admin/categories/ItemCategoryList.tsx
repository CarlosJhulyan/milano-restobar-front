import {getImageUrlBackend} from "../../../../_metronic/helpers/getImageUrlBackend";
import {KTSVG} from "../../../../_metronic/helpers";
import React from "react";
import {Category} from "./constantsCategory";

type Props = {
  category: Category,
  handleDeleteCategory: (id: number) => void,
  handleEditCategory: (category: Category) => void,
}

const ItemCategoryList = ({ category, handleDeleteCategory, handleEditCategory }: Props) => {
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-50px me-5'>
            <span className='symbol-label bg-light'>
              <img
                src={getImageUrlBackend(`/categories/${category.ruta_icono_categoria}`)}
                className='h-75 align-self-end'
                alt=''
              />
            </span>
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <span className='text-dark fw-bolder mb-1 fs-6'>
              {category.descripcion_categoria}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
          {category.descripcion_encargado}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bolder d-block mb-1 fs-6'>
          {category.id_vta_categoria}
        </span>
      </td>
      <td className='text-end'>
        <button
          onClick={() => handleEditCategory(category)}
          className='btn btn-icon btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
        >
          <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </button>
        <button
          onClick={() => handleDeleteCategory(Number(category.id_vta_categoria))}
          className='btn btn-icon btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4'
        >
          <KTSVG
            path='/media/icons/duotune/general/gen027.svg'
            className='svg-icon-3'
          />
        </button>
      </td>
    </tr>
  )
}

export default ItemCategoryList