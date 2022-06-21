import {FC, useState} from "react"
import { 
  PageTitle,
} from "../../../../_metronic/layout/core"
import { MenusForm } from "./MenusForm"
import { MenusList } from "./MenusList"
import {Menu} from "./constants";
import {httpClient} from "../../../../api/api";
import {ApiPath} from "../../../../api/constans";

const MenusPage: FC = () => {
  const [currentMenu, setCurrentMenu] = useState<Menu>({})
  const [data, setData] = useState<Array<Menu>>([])
  const [isLoading, setIsLoading] = useState(false)

  const getDataMenu = async () => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.get(ApiPath.Menus.List)
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const handleSetMenuItem = (menu: Menu) => {
    setCurrentMenu(menu)
  }

  return (
    <>
      <PageTitle>Cartas</PageTitle>
      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-6'>
          <MenusList
            getDataMenu={getDataMenu}
            setIsLoading={setIsLoading}
            data={data}
            isLoading={isLoading}
            handleSetMenuItem={handleSetMenuItem}
          />
        </div>
        <div className='col-xl-6'>
          <MenusForm
            getDataMenu={getDataMenu}
            currentMenu={currentMenu}
          />
        </div>
      </div>
    </>
  )
}

export default MenusPage