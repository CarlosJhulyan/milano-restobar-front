import {useEffect, useMemo, useState} from 'react'
import { KTCard, KTCardBody, KTSVG } from '../../../../_metronic/helpers'
import { UsersListPagination } from '../../apps/user-management/users-list/components/pagination/UsersListPagination'
import { httpClient } from '../../../../api/api'
import { ApiPath } from '../../../../api/constans'
import { Loading } from '../Loading'
import {openNotification} from "../../../../utils/openNotification";
import {Table} from "./constantsTable";
import {ItemTableList} from "./ItemTableList";
import {Restaurant} from "../../users/orders/constants";
import {useFormik} from "formik";

type Props = {
  setIsLoading: (flag: boolean) => void,
  data: Array<Table>,
  getDataTable: (id: number) => void,
  isLoading: boolean,
  restaurantDataSelector: Array<Restaurant>
}

const TablesList = ({setIsLoading, data, getDataTable, isLoading, restaurantDataSelector }: Props) => {
  const formik = useFormik<Table>({
    initialValues: {
      lgt_restaurante_id_lgt_restaurante: 1
    },
    onSubmit: () => {}
  })
  const handleDeleteTable = (id: number) => {
    setIsLoading(true);
    httpClient.delete(`${ApiPath.Table.Delete}${id}`)
      .then(response => {
        if (response.data.success)
          openNotification('Mesa', 'success', response.data.message)
        else
          openNotification('Mesa', 'warning', response.data.message)
        setIsLoading(false)
        getDataTable(1);
      })
      .catch(e => console.error(e))
  }

  const handleChangeSelector = () => {
    // setTimeout(() => {
    //   getDataTable(Number(formik.values.lgt_restaurante_id_lgt_restaurante))
    // }, 100)
  }

  useEffect(() => {
    getDataTable(1)
  }, [])

  return (
    <KTCard>
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
            <div className="row">
              <div className="col">
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>Filtrar por restaurante</label>
                  <div className='col-lg-8 fv-row'>
                    <select
                      onChangeCapture={handleChangeSelector}
                      className='form-select form-select-solid form-select-lg'
                      {...formik.getFieldProps('lgt_restaurante_id_lgt_restaurante')}
                    >
                      {/*<option value=''>Restaurante</option>*/}
                      {restaurantDataSelector.map(item => (
                        <option key={item.id_lgt_restaurante} value={item.id_lgt_restaurante}>{item.lgt_nombre_resturante}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table
            id='table_ingredients'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          >
            <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              <th>Número de mesa</th>
              <th>Restaurante</th>
              <th>Acciones</th>
            </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold'>
            {data.map(item => (
              <ItemTableList
                table={item}
                key={item.id_vta_mesa}
                handleDeleteTable={handleDeleteTable}
              />
            ))}
            </tbody>
          </table>
        </div>
        <UsersListPagination />
        {isLoading && <Loading />}
      </KTCardBody>
    </KTCard>
  )
}

export {TablesList}
