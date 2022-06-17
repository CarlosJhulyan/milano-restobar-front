/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../../../_metronic/helpers'
import { getImageUrlBackend } from '../../../../../_metronic/helpers/getImageUrlBackend'
import { Plate } from '../constants'

type Props = {
  className: string,
  data?: Array<Plate>,
  setModalVisible: (flag: boolean, id: number | undefined) => void,
  plate?: Plate,
  handleGroupPlates: (selected: boolean, plate: Plate) => void
}

const ListPlates: React.FC<Props> = ({className, data = [], setModalVisible,handleGroupPlates}) => {
  
  return (
    <div className='card card-xl-stretch mb-5 mb-xl-8'>
      <div className='card-body pt-3'>
        {data.map(plate => (
          <ItemListPlate 
            key={plate.id_vta_plato} 
            plate={plate}
            className={''} 
            setModalVisible={setModalVisible}
            handleGroupPlates={handleGroupPlates}
          />
        ))}
      </div>
    </div>
  )
}

const ItemListPlate = ({plate = {}, setModalVisible, handleGroupPlates}: Props) => {
  const [selected, setSelected] = useState(false)
  const [amount, setAmount] = useState(0)

  const formik = useFormik<Plate>({
    initialValues: {
      cantidad: 0
    },
    onSubmit: () => {},
  })

  const handleClickSelect = () => setSelected(x => !x)
  
  useEffect(() => {
    handleGroupPlates(selected, {
      ...plate,
      cantidad: amount
    })
  }, [selected, amount])

  useEffect(() => {
    setAmount(formik.values.cantidad || 0)
  }, [formik.values.cantidad])
  

  return (
    <div className='d-flex align-items-sm-center mb-7'>
      <div className='symbol symbol-60px symbol-2by3 me-4'>
        <div
          className='symbol-label'
          style={{backgroundImage: `url(${getImageUrlBackend(`/plates/${plate.vta_ruta_imagen_plato}`)})`}}
        ></div>
      </div>
      <div className='d-flex flex-row-fluid align-items-center flex-wrap my-lg-0 me-2'>
        <div className='flex-grow-1 my-lg-0 my-2 me-2'>
          <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
            {plate.vta_nombre_plato}
          </a>
          <span className='text-muted fw-bold d-block pt-1'>{plate.vta_desc_plato}</span>
        </div>
        <div className='flex-grow-1 my-lg-0 my-2 me-2'>
          S/ {plate.vta_precio}
        </div>
        <div className='d-flex align-items-center'>
          <button
            type='button'
            onClick={() => setModalVisible(true, plate.id_cme_receta)}
            className='btn btn-icon btn-light btn-sm border-0 mx-3'>
            <KTSVG
              path='/media/icons/duotune/general/gen005.svg' 
              className='svg-icon-2 svg-icon-primary'
            />
          </button>
          {selected && (
            <input
              {...formik.getFieldProps('cantidad')}
              type='number'
              min={0}
              placeholder='Cantidad'
              className={'form-control form-control-solid form-control-sm mx-3'}
              autoComplete='off'
              style={{
                width: '100px',
              }}
            />
          )}
          <button
            type='button'
            className={`btn btn-icon ${selected ? 'btn-success' : 'btn-light'} btn-sm border-0`}
            onClick={handleClickSelect}
          >
            {selected ? (
              <KTSVG
                path='/media/icons/duotune/arrows/arr085.svg'
                className='svg-icon-2 svg-icon-primary'
              />
            ): (
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-2 svg-icon-primary'
              />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export {ListPlates}
