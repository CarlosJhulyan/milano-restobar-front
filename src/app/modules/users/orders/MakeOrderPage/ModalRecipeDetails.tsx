import {
  FC,
} from 'react'
import { KTSVG } from '../../../../../_metronic/helpers'
import { Loading } from '../../Loading'
import { IngredientRecipe, Recipe } from '../constants'

type Props = {
  setModalVisible: (flag: boolean) => void,
  dataRecipe: Recipe,
  loadingData: boolean
}
type PropsTable = {
  className: string,
  listIngredients: Array<IngredientRecipe>
}

const ModaRecipeDetails: FC<Props> = ({setModalVisible, dataRecipe, loadingData}) => {
  return (
    <>
      <div
        className='modal fade show d-block'
        id='modal_recipe_details'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className='modal-header'>
              {/* begin::Modal title */}
              <h2 className='fw-bolder'>Detalles de Receta</h2>
              {/* end::Modal title */}

              {/* begin::Close */}
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => setModalVisible(false)}
                style={{cursor: 'pointer'}}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
              {/* end::Close */}
            </div>
            {/* begin::Modal body */}
            <div className='modal-body scroll-y'>
              {!loadingData ? (
                <>
                  <div className='mb-10'>
                    {dataRecipe.descripcion}
                  </div>
                  <TableIngredients listIngredients={dataRecipe.ingredientes || []} className='' />
                </>
              ) : (
                <div className='mb-10'>
                  <Loading />
                </div>
              )}
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

const TableIngredients: React.FC<PropsTable> = ({className, listIngredients}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-150px'>Ingrediente</th>
                <th className='min-w-140px'>Cantidad</th>
                <th className='min-w-120px'>Unidad de medida</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
                {listIngredients.map(item => (
                  <tr key={item.id_cme_ingrediente}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                          <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                            {item.nombre}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        {item.cantidad}
                      </span>
                    </td>
                    <td className='text-end'>
                      <div className='d-flex flex-column w-100 me-2'>
                        <div className='d-flex flex-stack mb-2'>
                          <span className='text-muted me-2 fs-7 fw-bold'>{item.unidad_medida}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {ModaRecipeDetails}