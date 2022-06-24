import {FC, useState} from 'react'
import {httpClient} from '../../../../api/api'
import {ApiPath} from '../../../../api/constans'
// import { KTSVG } from "../../../../_metronic/helpers"
import {PageTitle} from '../../../../_metronic/layout/core'
import {RestaurantesForm} from './RestaurantesForm'
import {RestaurantesList} from './RestaurantesList'

const RestaurantesPage: FC = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getDataTable = async () => {
    setIsLoading(true)
    try {
      const {data} = await httpClient.get(ApiPath.Restaurants.List)
      setData(data.data)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <>
      <PageTitle>Restaurantes</PageTitle>
      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-6'>
          <RestaurantesList getDataTable={getDataTable} data={data} isLoading={isLoading} />
        </div>
        <div className='col-xl-6'>
          <RestaurantesForm getDataTable={getDataTable} />
        </div>
      </div>
    </>
  )
}

export default RestaurantesPage
