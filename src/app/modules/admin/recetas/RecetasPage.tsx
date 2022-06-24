import { FC, useState } from "react"
import { httpClient } from "../../../../api/api";
import { ApiPath } from "../../../../api/constans";
import { KTCard, KTCardBody } from "../../../../_metronic/helpers"
import {
    PageTitle,
} from "../../../../_metronic/layout/core"
import { Receta } from "./constats";
import { RecetasForm } from "./RecetasForm";
import { RecetasList } from "./RecetasList";
// import { Role } from "./constats"
// import { RolesForm } from "./RolesForm"
// import { RolesList } from "./RolesList"

const RecetasPage: FC = () => {
    //   const [currentUser, setCurrentUser] = useState<Receta[]>([]);

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getDataTable = async () => {
        setIsLoading(true)
        try {
            const { data } = await httpClient.get(ApiPath.Recipe.List)
            setData(data.data)
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }

    return (
        <>
            <PageTitle>Asignar Roles</PageTitle>
            <div className='row gy-5 g-xl-8'>
                <div className='col-xxl-6'>
                    <RecetasList getDataTable={getDataTable} data={data} isLoading={isLoading} />
                </div>
                <div className='col-xl-6'>
                    <RecetasForm getDataTable={getDataTable} />
                </div>
            </div>
        </>
    )
}

export default RecetasPage