/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { getImageUrlBackend } from '../../../../_metronic/helpers/getImageUrlBackend'
import { Plate } from './constants'


type Props = {
  className: string
  color: string,
  data: Plate
}

const PlateCard: React.FC<Props> = ({className, color, data}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-body p-0'>
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          <img src={getImageUrlBackend(`/plates/${data.vta_ruta_imagen_plato}`)} alt="imagen plato" style={{
            position: 'absolute',
            top: '0',
            left: '0',
            objectFit: 'cover',
          }} className={`card-rounded h-275px w-100`} />
          {/* begin::Heading */}
          <div className='d-flex flex-stack'>
            {/* <h3 style={{zIndex: 0}} className='m-0 text-primary fw-bolder fs-3 bg-white'>Lomo Saltado</h3> */}
            <div className='ms-1' style={{zIndex: 0}}>
              {/* begin::Menu */}
              {/* <button
                type='button'
                className={`bg-light-primary btn btn-sm btn-color-primary btn-active-white btn-active-color-${color} border-0 me-n3`}
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-start'
              >
                Detalles
              </button> */}
              {/* <Dropdown1 /> */}
              {/* end::Menu */}
            </div>
          </div>
          {/* end::Heading */}
          {/* begin::Balance */}
          {/* <div className='d-flex text-center flex-column pt-8'>
            <span style={{zIndex: 0}} className='fw-bolder fs-2x pt-1'>S/ 58.00</span>
          </div> */}
          {/* end::Balance */}
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-white'
          style={{marginTop: '-100px'}}
        >
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-6'>
            {/* begin::Symbol */}
            {/* <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotune/maps/map004.svg' className='svg-icon-1' />
              </span>
            </div> */}
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  {data.vta_nombre_plato}
                </a>
                <div className='text-gray-400 fw-bold fs-7'>{data.vta_desc_plato}</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>S/ {data.vta_precio}</div>
                {/* <KTSVG
                  path='/media/icons/duotune/arrows/arr066.svg'
                  className='svg-icon-5 svg-icon-success ms-1'
                /> */}
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center mb-6'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <span className='fs-5 fw-bolder'>
                  Receta e ingredientes
                </span>
                <div className='text-gray-400 fw-bold fs-7'>
                  <a href="#" className='text-gray-800 text-hover-primary'>Ver detalles</a>
                </div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              <div className='d-flex align-items-center'>
                {/* <div className='fw-bolder fs-5 text-gray-800 pe-1'>$1,7b</div> */}
                {/* <KTSVG
                  path='/media/icons/duotune/general/gen024.svg'
                  className='svg-icon-5 svg-icon-danger ms-1'
                /> */}
              </div>
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='d-flex align-items-center'>
            {/* begin::Symbol */}
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-1' />
              </span>
            </div>
            {/* end::Symbol */}
            {/* begin::Description */}
            <div className='d-flex align-items-center flex-wrap w-100'>
              {/* begin::Title */}
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bolder'>
                  Categoría
                </a>
                <div className='text-gray-400 fw-bold fs-7'>{data.vta_categoria_plato}</div>
              </div>
              {/* end::Title */}
              {/* begin::Label */}
              {/* <div className='d-flex align-items-center'>
                <div className='fw-bolder fs-5 text-gray-800 pe-1'>$270m</div>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr065.svg'
                  className='svg-icon-5 svg-icon-danger ms-1'
                />
              </div> */}
              {/* end::Label */}
            </div>
            {/* end::Description */}
          </div>
          {/* end::Item */}
        </div>
        {/* end::Body */}
      </div>
    </div>
  )
}

export {PlateCard}
