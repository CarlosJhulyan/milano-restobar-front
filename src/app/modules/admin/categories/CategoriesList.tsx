import {KTCard, KTCardBody, KTSVG, toAbsoluteUrl} from "../../../../_metronic/helpers";
import {UsersListPagination} from "../../apps/user-management/users-list/components/pagination/UsersListPagination";
import {Loading} from "../Loading";
import React, {useEffect, useState} from "react";
import {httpClient} from "../../../../api/api";
import {ApiPath} from "../../../../api/constans";
import ItemCategoryList from "./ItemCategoryList";
import {ModalCategoriesUpsert} from "./ModalCategoriesUpsert";
import {Category} from "./constantsCategory";
const CategoriesList = () => {
  const [dataCate, setDataCate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataEnviar, setDataEnviar] = useState<Category>({
    ruta_icono_categoria: '',
    descripcion_encargado: '',
    id_vta_categoria: '',
    cme_encargado_id_cme_encargado: '',
    descripcion_categoria: ''
  });
  const [mostrarModal, setMostrarModal] = useState(false);

  const getDataCategories = () => {
    httpClient.get(ApiPath.Categories.ListCategories)
      .then(response => {
        if (response.data.success) {
          setDataCate(response.data.data)
        }
      })
      .catch(e => console.error(e))
  }

  const handleDeleteCategory = () => {

  }

  const handleEditCategory = async (category: Category) => {
    setMostrarModal(true);
    setDataEnviar(category);
  }

  useEffect(() => {
    getDataCategories()
  }, [])

  return (
    <KTCard>
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
          {/* begin::Search */}
          {/*<div className='d-flex align-items-center position-relative my-1'>*/}
          {/*  <KTSVG*/}
          {/*    path='/media/icons/duotune/general/gen021.svg'*/}
          {/*    className='svg-icon-1 position-absolute ms-6'*/}
          {/*  />*/}
          {/*  <input*/}
          {/*    type='text'*/}
          {/*    data-kt-user-table-filter='search'*/}
          {/*    className='form-control form-control-solid w-250px ps-14'*/}
          {/*    placeholder='Buscar Platillo'*/}
          {/*    // value={searchTerm}*/}
          {/*    // onChange={(e) => setSearchTerm(e.target.value)}*/}
          {/*  />*/}
          {/*</div>*/}
          {/* end::Search */}
        </div>
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            {/* <UsersListFilter /> */}

            {/* begin::Export */}
            {/* <button type='button' className='btn btn-light-primary me-3'>
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              Exportar
            </button> */}
            {/* end::Export */}

            {/* begin::Add user */}
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => {
                setMostrarModal(true)
                setDataEnviar({
                  descripcion_categoria: '',
                  ruta_icono_categoria: '',
                  descripcion_encargado: '',
                  cme_encargado_id_cme_encargado: '',
                  id_vta_categoria: '',
                })
              }}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Agregar Categoría
            </button>
          </div>
        </div>
      </div>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='ps-4 min-w-300px rounded-start'>Categoria</th>
                <th className='min-w-125px'>Nombre de encargado</th>
                <th className='min-w-125px'>Descripción de encargado</th>
                <th className='min-w-200px text-end rounded-end'>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {dataCate.map((item, index) => (
              <ItemCategoryList
                handleEditCategory={handleEditCategory}
                handleDeleteCategory={handleDeleteCategory}
                key={index}
                category={item}
              />
            ))}
            </tbody>
          </table>
        </div>
        <UsersListPagination />
        {isLoading && <Loading />}
      </KTCardBody>

      {
        mostrarModal ?
          <ModalCategoriesUpsert
            setMostrarModal={setMostrarModal}
            category={dataEnviar}
            getDataCategories={getDataCategories}
            isUserLoading={isLoading}
          />
          : null}

    </KTCard >
  )
}

export default CategoriesList