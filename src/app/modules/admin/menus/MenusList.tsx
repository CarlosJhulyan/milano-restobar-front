import {useEffect, useMemo, useState} from 'react'
import { KTCard, KTCardBody, KTSVG } from '../../../../_metronic/helpers'
import { UsersListPagination } from '../../apps/user-management/users-list/components/pagination/UsersListPagination'
import { httpClient } from '../../../../api/api'
import { ApiPath } from '../../../../api/constans'
import { Loading } from '../Loading'
import { ItemMenuList } from './ItemMenuList'
import {Menu} from "./constants";
import {openNotification} from "../../../../utils/openNotification";

type Props = {
  handleSetMenuItem: (menu: Menu) => void,
  setIsLoading: (flag: boolean) => void,
  data: Array<Menu>,
  getDataMenu: () => void,
  isLoading: boolean
}

const MenusList = ({handleSetMenuItem, setIsLoading, data, getDataMenu, isLoading }: Props) => {

  const handleDeleteMenu = (id: number) => {
    setIsLoading(true);
    httpClient.post(ApiPath.Menus.Delete, {
      codCarta: id
    })
      .then(response => {
        if (response.data.success)
          openNotification('Carta', 'success', response.data.message)
        else
          openNotification('Carta', 'warning', response.data.message)
        setIsLoading(false)
        getDataMenu();
      })
      .catch(e => console.error(e))
  }

  useEffect(() => {
    getDataMenu()
  }, [])

  return (
    <KTCard>
      {/*<div className='card-header border-0 pt-6'>*/}
      {/*  <div className='card-title'>*/}
      {/*    <div className='d-flex align-items-center position-relative my-1'>*/}
      {/*      <KTSVG*/}
      {/*        path='/media/icons/duotune/general/gen021.svg'*/}
      {/*        className='svg-icon-1 position-absolute ms-6'*/}
      {/*      />*/}
      {/*      <input*/}
      {/*        type='text'*/}
      {/*        data-kt-user-table-filter='search'*/}
      {/*        className='form-control form-control-solid w-250px ps-14'*/}
      {/*        placeholder='Buscar Carta'*/}
      {/*        // value={searchTerm}*/}
      {/*        // onChange={(e) => setSearchTerm(e.target.value)}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table
            id='table_ingredients'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <th>Carta</th>
                <th>Restaurante</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold'>
              {data.map(item => (
                <ItemMenuList
                  menu={item}
                  key={item.id_vta_carta}
                  handleDeleteMenu={handleDeleteMenu}
                  handleSetMenuItem={handleSetMenuItem}
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

export {MenusList}
