import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { httpClient } from '../../../../../api/api'
import { ApiPath } from '../../../../../api/constans'
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers'
import { Loading } from '../../Loading'
import { Menu, OrderDetail, Plate, Recipe } from '../constants'
import { ListPlates } from './ListPlates'
import { cardSelectType } from './MakeOrderPage'
import { ModaRecipeDetails } from './ModalRecipeDetails'

const plateSchema = Yup.object().shape({
  
})

type Props = {
  cardSelect: string,
  setCardSelect: (value: cardSelectType) => void,
  dataMenu: Menu,
  setOrderDetails: (details: Array<OrderDetail>) => void
  setOrderHeader: (total: number) => void
}

const PlatesSelector = ({ cardSelect, setCardSelect, dataMenu, setOrderDetails, setOrderHeader }: Props) => {
  const [data, setData] = useState<Plate>({})
  const [listPlates, setListPlates] = useState<Array<Plate>>([])
  const [loading, setLoading] = useState(false)
  const [loadingDataModal, setLoadingDataModal] = useState(false)
  const [modalRecipeDetailsVisible, setModalRecipeDetailsVisible] = useState(false)
  const [dataRecipe, setDataRecipe] = useState<Recipe>({})
  const [platesSelected, setPlatesSelected] = useState<Array<Plate>>([])

  const formik = useFormik<Plate>({
    initialValues: data,
    validationSchema: plateSchema,
    onSubmit: (values) => handleSubmit(values)
  })

  const handleSubmit = async (values: Plate) => {
    setCardSelect('3')
  }

  const getListPlates = async (codCarta: number) => {
    setLoading(true)
    try {
      const { data: { data } } = await httpClient.post(ApiPath.Plates.ListByMenu, {
        codCarta
      });
      setListPlates(data);
    } catch (error) {
      console.error(error);
      
    }
    setLoading(false)
  }

  const getRecipePlate = async (codReceta: number) => {
    setLoadingDataModal(true)
    try {
      const { data: { data } } = await httpClient.post(ApiPath.Recipe.RecipePlate, {
        codReceta
      });
      setDataRecipe(data)
    } catch (error) {
      console.error(error);
    }
    setLoadingDataModal(false)
  }

  const handleChangeVisibleModal = (flag: boolean, id: number = 0) => {
    setModalRecipeDetailsVisible(flag)
    if (flag === true) {
      getRecipePlate(id)
    }
  }

  const handleGroupPlates = (selected: boolean, plate: Plate) => {
    const selecteds = platesSelected.filter(item => {
      return item.id_cme_receta !== plate.id_cme_receta
    })

    if (selected)
      setPlatesSelected([
        ...selecteds,
        plate
      ])
    else
      setPlatesSelected([
        ...selecteds
      ])
  }

  useEffect(() => {
    getListPlates(dataMenu.id_vta_carta || 0)
  }, [dataMenu])

  useEffect(() => {
    const orderDetail = platesSelected.map(item => {
      return {
        id_vta_plato: item.id_vta_plato,
        id_cme_receta: item.id_cme_receta,
        cantidad: item.cantidad,
        precio: Number(item.cantidad) * Number(item.vta_precio)
      }
    }) as Array<OrderDetail>
    const total = orderDetail.reduce((previus: number, current: OrderDetail) => {
      return previus + Number(current.precio);
    }, 0)    
    setOrderDetails(orderDetail)
    setOrderHeader(total)
  }, [platesSelected])
  
  

  return (
    <KTCard>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        // data-bs-target='#add_plates'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Agregar Platillos</h3>
        </div>
      </div>
      <KTCardBody>
        <div id="add_plates" className={`collapse ${cardSelect === '2' ? 'show' : ''}`}>
          {(listPlates.length === 0 && !loading) && (
            <div className="alert alert-warning" role="alert">
              No hay platos en la carta seleccionada
            </div>
          )}
          <form
            onSubmit={formik.handleSubmit}
            noValidate className='form'
          >
            <ListPlates 
              handleGroupPlates={handleGroupPlates}
              setModalVisible={handleChangeVisibleModal} 
              data={listPlates} 
              className={''}
            />

            <div className='card-footer d-flex justify-content-end'>
              <button
                type='button'
                onClick={() => {
                  setCardSelect('1')
                }}
                className='btn btn-light me-3'
                data-kt-users-modal-action='cancel'
                // disabled={formik.isSubmitting || isUserLoading}
              >
                Anterior
              </button>
              <button 
                type='submit' 
                className='btn btn-primary' 
                disabled={
                  loading || 
                  listPlates.length === 0 || 
                  platesSelected.length === 0 ||
                  platesSelected.some(item => item.cantidad === 0)
                }
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>
        {modalRecipeDetailsVisible && (
          <ModaRecipeDetails
            loadingData={loadingDataModal}
            setModalVisible={setModalRecipeDetailsVisible}
            dataRecipe={dataRecipe}
          />
        )}
        {(loading && cardSelect === '2') && <Loading />}
      </KTCardBody>
    </KTCard>
  )
}

export {PlatesSelector}
