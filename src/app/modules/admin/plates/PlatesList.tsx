import { useEffect, useMemo, useState } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomHeaderColumn } from '../../apps/user-management/users-list/table/columns/CustomHeaderColumn'
import { CustomRow } from '../../apps/user-management/users-list/table/columns/CustomRow'
import { KTCard, KTCardBody, KTSVG } from '../../../../_metronic/helpers'
import { User } from '../../apps/user-management/users-list/core/_models'
import { UsersListPagination } from '../../apps/user-management/users-list/components/pagination/UsersListPagination'
import { httpClient } from '../../../../api/api'
import { ApiPath } from '../../../../api/constans'
import { Loading } from '../Loading'
import clsx from 'clsx'
import { platesTableColumns } from './platesTableColumns'
import { Plate } from './constantsPlates'
import { CustomPlateHeader } from '../../apps/user-management/users-list/table/columns/CustomPLateHeader'
import { CustomHeaderPlateColumn } from '../../apps/user-management/users-list/table/columns/CustomHeaderPlateColumn'
import { ModalPlatesUpsert } from './ModalPlatesUpsert'


const PlatesList = () => {
  const [data, setData] = useState([]);
  const [dataCate, setDataCate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataEnviar, setDataEnviar] = useState<Plate>({
    vta_nombre_plato: '',
    vta_desc_plato: '',
    vta_ruta_imagen_plato: '',
    vta_precio: '',
    id_vta_plato: '',
    vta_dificultad_id_vta_dificultad: '',
    vta_categoria_id_vta_categoria: '',
    id_cme_receta: ''
  });
  const [mostrarModal, setMostrarModal] = useState(false);
  const columns = useMemo(() => platesTableColumns, [])
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })

  const editPlates = async (plate: Plate) => {
    setMostrarModal(true);
    setDataEnviar(plate);
  }
  const getDataUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.get(ApiPath.Plates.List)
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const getCategoria = async () => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.get(ApiPath.Categorias.GetCategorias)
      setDataCate(data.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }


  useEffect(() => {
    getDataUsers();
    getCategoria();
  }, [])

  return (
    <KTCard>
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
          {/* begin::Search */}
          <div className='d-flex align-items-center position-relative my-1'>
            <KTSVG
              path='/media/icons/duotune/general/gen021.svg'
              className='svg-icon-1 position-absolute ms-6'
            />
            <input
              type='text'
              data-kt-user-table-filter='search'
              className='form-control form-control-solid w-250px ps-14'
              placeholder='Buscar Platillo'
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
                  vta_nombre_plato: '',
                  vta_desc_plato: '',
                  vta_ruta_imagen_plato: '',
                  vta_precio: '',
                  id_vta_plato: '',
                  vta_dificultad_id_vta_dificultad: '',
                  vta_categoria_id_vta_categoria: '',
                  id_cme_receta: ''
                })
              }}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Agregar platillo
            </button>
            {/* end::Add user */}
          </div>
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table
            id='table_ingredients'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            {...getTableProps()}
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                {headers.map((column: ColumnInstance<Plate>) => (
                  <CustomHeaderPlateColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<Plate>, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={clsx({ 'text-end min-w-100px': cell.column.id === 'actions' })}
                          >
                            {cell.render('Cell', {
                              editPlates: (e: Plate) => editPlates(e),
                              // deleteRow: (e: User) => deleteRow(e),
                            })}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      No hay platillos
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <UsersListPagination />
        {isLoading && <Loading />}
      </KTCardBody>

      {
        mostrarModal ?
          <ModalPlatesUpsert
            dataCate={dataCate}
            isUserLoading={false}
            plate={dataEnviar}
            setMostrarModal={setMostrarModal}
            getDataUsers={getDataUsers}
          />
          : null}

    </KTCard >
  )
}

export { PlatesList }
