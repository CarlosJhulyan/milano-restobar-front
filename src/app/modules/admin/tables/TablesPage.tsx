import {FC, useState} from "react"
import {
  PageTitle,
} from "../../../../_metronic/layout/core"
import {httpClient} from "../../../../api/api";
import {ApiPath} from "../../../../api/constans";
import {TableForm} from "./TableForm";
import {Table} from "./constantsTable";
import {TablesList} from "./TablesList";
import {Restaurant} from "../../users/orders/constants";

const TablesPage: FC = () => {
  const [data, setData] = useState<Array<Table>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [restaurantDataSelector, setRestaurantDataSelector] = useState<Array<Restaurant>>([])
  const [loadingRestaurant, setLoadingRestaurant] = useState(false)

  const getDataTable = async (id: number) => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.post(ApiPath.Table.ListByRestaurant, {
        codRestaurante: id
      })
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const getRestaurantsData = () => {
    setLoadingRestaurant(true)
    httpClient.get(ApiPath.Restaurants.List)
      .then(response => {
        setRestaurantDataSelector(response.data.data)
        setLoadingRestaurant(false)
      })
      .catch(e => console.log(e))
  }

  return (
    <>
      <PageTitle>Mesas</PageTitle>
      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-6'>
          <TablesList
            restaurantDataSelector={restaurantDataSelector}
            getDataTable={getDataTable}
            setIsLoading={setIsLoading}
            data={data}
            isLoading={isLoading}
          />
        </div>
        <div className='col-xl-6'>
          <TableForm
            restaurantDataSelector={restaurantDataSelector}
            loading={loadingRestaurant}
            getRestaurantsData={getRestaurantsData}
            getDataTable={getDataTable}
          />
        </div>
      </div>
    </>
  )
}

export default TablesPage