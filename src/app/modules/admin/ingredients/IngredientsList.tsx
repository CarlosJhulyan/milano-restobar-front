import { useEffect, useMemo, useState } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomHeaderColumn } from '../../apps/user-management/users-list/table/columns/CustomHeaderColumn'
import { CustomRow } from '../../apps/user-management/users-list/table/columns/CustomRow'
import { KTCard, KTCardBody, KTSVG } from '../../../../_metronic/helpers'
import { User } from '../../apps/user-management/users-list/core/_models'
import { UsersListPagination } from '../../apps/user-management/users-list/components/pagination/UsersListPagination'
import { httpClient } from '../../../../api/api'
import { ApiPath } from '../../../../api/constans'
import { ingredientsTableColumn } from './IngredientsTableColumns'
import { Loading } from '../Loading'
import { Ingredient } from './constantsIngrediente'
import clsx from 'clsx'
import { CustomHeaderIngredientesColumn } from '../../apps/user-management/users-list/table/columns/CustonHeaderIngredienteColmn'
import { ModalIngredientesUpsert } from './ModalIngredientesUpsert'


const IngredientsList = () => {
  const [data, setData] = useState([]);
  const [mostrarModalIng, setMostrarModalIng] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataEnviar, setDataEnviar] = useState<Ingredient>({
    id_cme_ingrediente: '',
    nombre: '',
    precio_compra: '',
    stock_fisico: '',
    estado: '',
    lgt_medida_id_lgt_medida: '',
  });

  const columns = useMemo(() => ingredientsTableColumn, [])
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })

  const getDataUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.get(ApiPath.Ingredients.List)
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }


  const editIngrediente=async(ingrediente:Ingredient)=>{
    console.log('hola editar');
    
    setMostrarModalIng(true);
    setDataEnviar(ingrediente);
    
  }


  useEffect(() => {
    getDataUsers()
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
              placeholder='Buscar ingrediente'
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
                setMostrarModalIng(true)
                setDataEnviar({
                  id_cme_ingrediente: '',
                  nombre: '',
                  precio_compra: '',
                  stock_fisico: '',
                  estado: '',
                  lgt_medida_id_lgt_medida: '',
                })
              }}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Agregar ingrediente
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
                {headers.map((column: ColumnInstance<Ingredient>) => (
                  <CustomHeaderIngredientesColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<Ingredient>, i) => {
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
                              editIngrediente: (e: Ingredient) => editIngrediente(e),
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
                      No hay ingredientes
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <UsersListPagination />
        {isLoading && <Loading />}

        {
          mostrarModalIng ?
            <ModalIngredientesUpsert ingrediente={dataEnviar} isUserLoading={false} setMostrarModalIng={setMostrarModalIng} getDataUsers={getDataUsers} />
            : null
        }
      </KTCardBody>
    </KTCard>
  )
}

export { IngredientsList }
