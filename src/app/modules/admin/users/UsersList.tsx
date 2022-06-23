import {FC, useEffect, useMemo, useState} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {useQueryResponseLoading} from '../../apps/user-management/users-list/core/QueryResponseProvider'
import {KTCard, KTCardBody, KTSVG} from '../../../../_metronic/helpers'
import {UsersListPagination} from '../../apps/user-management/users-list/components/pagination/UsersListPagination'
import {usersTableColumn} from './usersTableColumns'
import {httpClient} from '../../../../api/api'
import {ApiPath} from '../../../../api/constans'
import clsx from 'clsx'
import {ModalUserUpsert} from './ModalUserUpsert'
import {User} from './constants'
import {Loading} from '../Loading'
import {editorToolbarSettings} from '../../../../_metronic/partials'
import {openNotification} from '../../../../utils/openNotification'

type PropsColumn = {
  column: ColumnInstance<User>
}

const UsersList = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    id_cme_usuario: '',
    nombre: '',
    avatar: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    celular: '',
    fecha_nacimiento: '',
    direccion: '',
    dni: '',
  })
  const [data, setData] = useState([])
  const isLoading = useQueryResponseLoading()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const columns = useMemo(() => usersTableColumn, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable<User | any>({
    columns,
    data,
  })

  const getDataUsers = async () => {
    const {data} = await httpClient.get(ApiPath.Users.List)
    setData(data.data)
  }

  const editRow = async (user: User) => {
    setIsModalVisible(true)
    setCurrentUser(user)
  }

  const deleteRow = async (user: User) => {
    const {data} = await httpClient.delete(ApiPath.Users.Delete + user.id_cme_usuario)
    if (data.success) {
      getDataUsers()
      openNotification('Usuario', 'success', data.message)
    } else {
      openNotification('Usuario', 'danger', data.message)
    }
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
              placeholder='Buscar usuario'
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
            <button type='button' className='btn btn-light-primary me-3'>
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              Exportar
            </button>
            {/* end::Export */}

            {/* begin::Add user */}
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => {
                setIsModalVisible(true)
                setCurrentUser({
                  id_cme_usuario: '',
                  nombre: '',
                  avatar: '',
                  apellido_paterno: '',
                  apellido_materno: '',
                  correo: '',
                  celular: '',
                  fecha_nacimiento: '',
                  direccion: '',
                  dni: '',
                })
              }}
            >
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Nuevo usuario
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
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            {...getTableProps()}
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                {headers.map((column: ColumnInstance<User>) => (
                  <CustomHeaderColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<User>, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
                          >
                            {cell.render('Cell', {
                              editRow: (e: User) => editRow(e),
                              deleteRow: (e: User) => deleteRow(e),
                            })}
                          </td>
                        )
                      })}
                    </tr>
                  )
                  // return <CustomRow row={row} key={`row-${i}-${row.id}`} />
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      No hay usuarios
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

      {isModalVisible && (
        <ModalUserUpsert
          isUserLoading={false}
          user={currentUser}
          setModalVisible={setIsModalVisible}
          getDataUsers={getDataUsers}
        />
      )}
    </KTCard>
  )
}

const CustomHeaderColumn: FC<PropsColumn> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {UsersList}
