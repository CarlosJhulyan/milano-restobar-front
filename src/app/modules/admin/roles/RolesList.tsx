import { useEffect, useMemo, useState } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomHeaderColumn } from '../../apps/user-management/users-list/table/columns/CustomHeaderColumn'
import { CustomRow } from '../../apps/user-management/users-list/table/columns/CustomRow'
import { useQueryResponseLoading } from '../../apps/user-management/users-list/core/QueryResponseProvider'
import { KTCard, KTCardBody, KTSVG } from '../../../../_metronic/helpers'
import { UsersListPagination } from '../../apps/user-management/users-list/components/pagination/UsersListPagination'

import { httpClient } from '../../../../api/api'
import { ApiPath } from '../../../../api/constans'
import { rolesTableColumn } from './rolesTableColumns'
import { Role, User } from './constats'
import { Loading } from '../Loading'
import { Button, Modal } from 'react-bootstrap'

const RolesList = ({ setCurrentUser }: { setCurrentUser: any }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const isLoading = useQueryResponseLoading()
  const columns = useMemo(() => rolesTableColumn, [])
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDataUsers = async () => {
    const { data } = await httpClient.get(ApiPath.Users.List)

    console.log(data.data, 'list from');

    setData(data.data);
    setCurrentUser(data.data)
  }

  useEffect(() => {
    getDataUsers()
  }, [])

  return (
    <KTCard>
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
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
        </div>
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
                  return <CustomRow row={row} key={`row-${i}-${row.id}`} handleShow={handleShow} />
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
        {
          show ?
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            : null
        }
        <UsersListPagination />
        {isLoading && <Loading />}
      </KTCardBody>
    </KTCard>
  )
}

export { RolesList }
