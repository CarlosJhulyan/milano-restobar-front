import {
    FC,
    LegacyRef,
    useEffect,
    useRef,
    useState,
    // useState
} from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import clsx from 'clsx'
//   import { Plate } from './constantsPlates'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { addIngredients, editIngredients } from './_request'
import { openNotification } from '../../../../utils/openNotification'
import { getImageUrlBackend } from '../../../../_metronic/helpers/getImageUrlBackend'
import { Ingredient } from './constantsIngrediente'

type Props = {
    isUserLoading: boolean
    ingrediente: Ingredient
    setMostrarModalIng: (flag: boolean) => void
    getDataUsers: () => void
}


const editUserSchema = Yup.object().shape({
    nombre: Yup.string()
        .required('Nombre requerido'),
    precio_compra: Yup.string()
        .required('precio requerido'),
    stock_fisico: Yup.number()
        .required('atock requerido'),
    estado: Yup.number()
        .required('Estado requerido'),
    lgt_medida_id_lgt_medida: Yup.string().required('Categoria requerido'),
})

const ModalIngredientesUpsert: FC<Props> = ({ ingrediente, isUserLoading, setMostrarModalIng, getDataUsers }) => {
    // const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
    // const userAvatarImg = toAbsoluteUrl(`/media/${user.avatar}`)



    const formik = useFormik({
        initialValues: ingrediente,
        validationSchema: editUserSchema,
        onSubmit: async (values, { setSubmitting }) => {

            console.log(values, 'values agregar');

            setSubmitting(true)
            try {
                let data: { success: boolean; message: string }
                if (values.id_cme_ingrediente !== '') {
                    const response = await editIngredients(values)
                    console.log(response, 'update');

                    data = response.data
                } else {
                    const response = await addIngredients(values)
                    console.log(response, 'agregar');

                    data = response.data
                }
                if (data.success) {
                    getDataUsers()
                    setSubmitting(false)
                    setMostrarModalIng(false)
                    openNotification('Usuario', 'success', data.message)
                } else {
                    setSubmitting(false)
                    openNotification('Usuario', 'warning', data.message)
                }
            } catch (error) {
                getDataUsers()
                setSubmitting(false)
                setMostrarModalIng(false)
                openNotification('Usuario', 'danger')
            }
        },
    })

    return (
        <>
            <div
                className='modal fade show d-block'
                id='kt_modal_add_user'
                role='dialog'
                tabIndex={-1}
                aria-modal='true'
            >
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-650px'>
                    {/* begin::Modal content */}
                    <div className='modal-content'>
                        <div className='modal-header'>
                            {/* begin::Modal title */}
                            <h2 className='fw-bolder'>Agregar Platillo</h2>
                            {/* end::Modal title */}

                            {/* begin::Close */}
                            <div
                                className='btn btn-icon btn-sm btn-active-icon-primary'
                                data-kt-users-modal-action='close'
                                onClick={() => setMostrarModalIng(false)}
                                style={{ cursor: 'pointer' }}
                            >
                                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                            </div>
                            {/* end::Close */}
                        </div>
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            <>
                                <form
                                    id='form_upsert_user'
                                    className='form'
                                    onSubmit={formik.handleSubmit}
                                    noValidate
                                >
                                    {/* begin::Scroll */}
                                    <div
                                        className='d-flex flex-column scroll-y me-n7 pe-7'
                                        id='kt_modal_add_user_scroll'
                                        data-kt-scroll='true'
                                        data-kt-scroll-activate='{default: false, lg: true}'
                                        data-kt-scroll-max-height='auto'
                                        data-kt-scroll-dependencies='#kt_modal_add_user_header'
                                        data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                                        data-kt-scroll-offset='300px'
                                    >


                                        <div className='fv-row mb-7'>
                                            <label className='required fw-bold fs-6 mb-2'>Nombre</label>
                                            <input
                                                {...formik.getFieldProps('nombre')}
                                                type='text'
                                                name='nombre'
                                                className={clsx(
                                                    'form-control form-control-solid mb-3 mb-lg-0',
                                                    { 'is-invalid': formik.touched.nombre && formik.errors.nombre },
                                                    {
                                                        'is-valid': formik.touched.nombre && !formik.errors.nombre,
                                                    }
                                                )}
                                                autoComplete='off'
                                                disabled={formik.isSubmitting || isUserLoading}
                                            />
                                            {formik.touched.nombre && formik.errors.nombre && (
                                                <div className='fv-plugins-message-container'>
                                                    <div className='fv-help-block'>
                                                        <span role='alert'>{formik.errors.nombre}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>



                                        <div className='row'>
                                            <div className='col'>
                                                <div className='fv-row mb-7'>
                                                    <label className='required fw-bold fs-6 mb-2'>Precio</label>
                                                    <input
                                                        {...formik.getFieldProps('precio_compra')}
                                                        type='text'
                                                        name='precio_compra'
                                                        className={clsx(
                                                            'form-control form-control-solid mb-3 mb-lg-0',
                                                            { 'is-invalid': formik.touched.precio_compra && formik.errors.precio_compra },
                                                            {
                                                                'is-valid': formik.touched.precio_compra && !formik.errors.precio_compra,
                                                            }
                                                        )}
                                                        autoComplete='off'
                                                        disabled={formik.isSubmitting || isUserLoading}
                                                    />
                                                    {formik.touched.precio_compra && formik.errors.precio_compra && (
                                                        <div className='fv-plugins-message-container'>
                                                            <div className='fv-help-block'>
                                                                <span role='alert'>{formik.errors.precio_compra}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className='col'>
                                                <div className='fv-row mb-7'>
                                                    <label className='required fw-bold fs-6 mb-2'>Estado</label>
                                                    <div className='col-lg-8 fv-row'>
                                                        <select
                                                            className='form-select form-select-solid form-select-lg'
                                                            {...formik.getFieldProps('estado')}
                                                            name='estado'
                                                        >
                                                            <option value=''>Seleccionar rol de usuario...</option>
                                                            <option value='1'>Activo</option>
                                                        </select>
                                                        {formik.touched.estado && formik.errors.estado && (
                                                            <div className='fv-plugins-message-container'>
                                                                <div className='fv-help-block'>{formik.errors.estado}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {formik.touched.estado && formik.errors.estado && (
                                                        <div className='fv-plugins-message-container'>
                                                            <div className='fv-help-block'>
                                                                <span role='alert'>{formik.errors.estado}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>


                                            <div className='col'>
                                                <div className='fv-row mb-7'>
                                                    <label className='required fw-bold fs-6 mb-2'>Stock</label>
                                                    <input
                                                        {...formik.getFieldProps('stock_fisico')}
                                                        type='text'
                                                        name='stock_fisico'
                                                        className={clsx(
                                                            'form-control form-control-solid mb-3 mb-lg-0',
                                                            { 'is-invalid': formik.touched.stock_fisico && formik.errors.stock_fisico },
                                                            {
                                                                'is-valid': formik.touched.stock_fisico && !formik.errors.stock_fisico,
                                                            }
                                                        )}
                                                        autoComplete='off'
                                                        disabled={formik.isSubmitting || isUserLoading}
                                                    />
                                                    {formik.touched.stock_fisico && formik.errors.stock_fisico && (
                                                        <div className='fv-plugins-message-container'>
                                                            <div className='fv-help-block'>
                                                                <span role='alert'>{formik.errors.stock_fisico}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='fv-row mb-7'>
                                                    <label className='required fw-bold fs-6 mb-2'>Medida</label>
                                                    <input
                                                        {...formik.getFieldProps('lgt_medida_id_lgt_medida')}
                                                        type='text'
                                                        name='lgt_medida_id_lgt_medida'
                                                        className={clsx(
                                                            'form-control form-control-solid mb-3 mb-lg-0',
                                                            { 'is-invalid': formik.touched.lgt_medida_id_lgt_medida && formik.errors.lgt_medida_id_lgt_medida },
                                                            {
                                                                'is-valid': formik.touched.lgt_medida_id_lgt_medida && !formik.errors.lgt_medida_id_lgt_medida,
                                                            }
                                                        )}
                                                        autoComplete='off'
                                                        disabled={formik.isSubmitting || isUserLoading}
                                                    />
                                                    {formik.touched.lgt_medida_id_lgt_medida && formik.errors.lgt_medida_id_lgt_medida && (
                                                        <div className='fv-plugins-message-container'>
                                                            <div className='fv-help-block'>
                                                                <span role='alert'>{formik.errors.lgt_medida_id_lgt_medida}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>

                                    </div>



                                    {/* end::Scroll */}

                                    {/* begin::Actions */}
                                    <div className='text-center pt-15'>
                                        <button
                                            type='reset'
                                            onClick={() => setMostrarModalIng(false)}
                                            className='btn btn-light me-3'
                                            data-kt-users-modal-action='cancel'
                                        // disabled={formik.isSubmitting || isUserLoading}
                                        >
                                            Cancelar
                                        </button>

                                        <button
                                            type='submit'
                                            className='btn btn-primary'
                                            data-kt-users-modal-action='submit'
                                            disabled={
                                                isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched
                                            }
                                        >
                                            <span className='indicator-label'>Guardar</span>
                                            {(formik.isSubmitting || isUserLoading) && (
                                                <span className='indicator-progress'>
                                                    Guardando...{' '}
                                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                                </span>
                                            )}
                                        </button>
                                    </div>

                                    {/* end::Actions */}
                                </form>
                                {/* {(formik.isSubmitting || isUserLoading) && <UsersListLoading />} */}
                            </>
                        </div>
                        {/* end::Modal body */}
                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show'></div>
        </>
    )
}

export { ModalIngredientesUpsert }
