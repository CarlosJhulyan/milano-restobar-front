import { useFormik } from 'formik'
import { FC, useState } from 'react'
import { httpClient } from '../../../../api/api'
import { ApiPath } from '../../../../api/constans'
import * as Yup from 'yup'
import { KTCard, KTCardBody } from '../../../../_metronic/helpers'
// import {Restaurant} from './constants'
import { addRecetas } from './_request'
import { openNotification } from '../../../../utils/openNotification'
import { Receta } from './constats'

type Props = {
    getDataTable: () => void
}

const RoleSchema = Yup.object().shape({
    descripcion: Yup.string()
        .min(3, 'Mínimo 3 caractéres')
        .max(50, 'Máximo 50 caractéres')
        .required('Nombre requerido'),
})

const RecetasForm: FC<Props> = ({ getDataTable }) => {
    const [data, setData] = useState<Receta>({
        id_cme_receta: '',
        descripcion: '',
    })

    const [loading, setLoading] = useState(false)

    const formik = useFormik<Receta>({
        initialValues: data,
        validationSchema: RoleSchema,
        onSubmit: (values) => handleSubmit(values),
    })

    const handleSubmit = async (values: Receta) => {
        setLoading(true)
        try {
            let id:any;
            id = values.id_cme_receta?.toString();
            let data: { success: boolean; message: string }
            let response: any
            if (values.id_cme_receta !== '') {
                // response = await deleteReceta(id)
            } else {
                response = await addRecetas(values)
            }
            data = response.data
            if (data.success) {
                getDataTable()
                openNotification('Restaurant', 'success', data.message)
            } else {
                getDataTable()
                openNotification('Restaurant', 'warning', data.message)
            }
        } catch (error) {
            getDataTable()
            openNotification('Restaurant', 'danger')
        }
        setLoading(false)
    }

    return (
        <KTCard>
            <div
                className='card-header border-0 cursor-pointer'
                role='button'
                data-bs-toggle='collapse'
                data-bs-target='#role_form'
            >
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Formulario Restaurantes</h3>
                </div>
            </div>
            <KTCardBody>
                <div id='role_form' className='collapse show'>
                    <form onSubmit={formik.handleSubmit} noValidate className='form'>
                        {/* <div className='row mb-6'>
                            <label className='col-lg-4 col-form-label fw-bold fs-6'>Nombre</label>

                            <div className='col-lg-8 fv-row'>
                                <input
                                    type='text'
                                    className='form-control form-control-lg form-control-solid'
                                    placeholder='Nombre del restaurante'
                                    {...formik.getFieldProps('lgt_nombre_resturante')}
                                />
                                {formik.touched.lgt_nombre_resturante && formik.errors.lgt_nombre_resturante && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>{formik.errors.lgt_nombre_resturante}</div>
                                    </div>
                                )}
                            </div>
                        </div> */}

                        <div className='row mb-6'>
                            <label className='col-lg-4 col-form-label fw-bold fs-6'>Descripcion</label>

                            <div className='col-lg-8 fv-row'>
                                <input
                                    type='text'
                                    className='form-control form-control-lg form-control-solid'
                                    placeholder='Descripcion'
                                    {...formik.getFieldProps('lgt_razon_restaurante')}
                                    name='descripcion'
                                />
                                {formik.touched.descripcion && formik.errors.descripcion && (
                                    <div className='fv-plugins-message-container'>
                                        <div className='fv-help-block'>{formik.errors.descripcion}</div>
                                    </div>
                                )}
                            </div>
                        </div>



                        <div className='row mb-6'>
                            <div className='card-footer d-flex justify-content-end py-6 px-9'>
                                <button type='submit' className='btn btn-primary' disabled={loading}>
                                    {!loading && 'Guardar'}
                                    {loading && (
                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                            Guardando...{' '}
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </KTCardBody>
        </KTCard>
    )
}

export { RecetasForm }
