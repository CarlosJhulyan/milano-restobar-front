import { FC, useEffect, useMemo, useState } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomHeaderColumn } from '../../apps/user-management/users-list/table/columns/CustomHeaderColumn'
import { CustomRow } from './CustomRow'
import { KTCard, KTCardBody, KTSVG } from '../../../../_metronic/helpers'
import { UsersListPagination } from '../../apps/user-management/users-list/components/pagination/UsersListPagination'
import { httpClient } from '../../../../api/api'
import { ApiPath } from '../../../../api/constans'
import { Loading } from '../Loading'
// import {restaurantesTableColumns} from './RecetasTableColumns'
// import {Restaurant} from './constants'
import { openNotification } from '../../../../utils/openNotification'
// import {deleteRestaurant} from './_request'
import { Receta } from './constats'
// import { recetasTableHeader } from './RecetasTableHeader'
import { recetasTableColumns } from './RecetasTableColumns'
import { log } from 'console'

type Props = {
    data: Receta[]
    isLoading: boolean
    getDataTable: () => void
}

const RecetasList: FC<Props> = ({ getDataTable, data, isLoading }) => {
    const columns = useMemo(() => recetasTableColumns, [])
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data,
    })


    const deleteRow = async (recetas: Receta) => {
        console.log(recetas);
        let id_cme_receta = recetas.id_cme_receta;
        httpClient.post(ApiPath.Recipe.Delete, {
            id_cme_receta
        })
        getDataTable();
    }

    useEffect(() => {
        getDataTable()
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
                            placeholder='Buscar Carta'
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
                        {/* <button 
              type='button' 
              className='btn btn-primary' 
              // onClick={openAddUserModal}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Agregar platillo
            </button> */}
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
                                {headers.map((column: ColumnInstance<Receta>) => (
                                    <CustomHeaderColumn key={column.id} column={column} />
                                ))}
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                            {rows.length > 0 ? (
                                rows.map((row: Row<Receta>, i) => {
                                    prepareRow(row)
                                    return (
                                        <CustomRow
                                            row={row}
                                            key={`row-${i}-${row.id}`}
                                            methods={{ deleteRow: deleteRow }}
                                        />
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7}>
                                        <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                            No hay restaurantes
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
        </KTCard>
    )
}

export { RecetasList }
