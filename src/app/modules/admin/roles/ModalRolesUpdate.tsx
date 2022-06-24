import {
    FC,
    useEffect,
} from 'react'
import { Role, User } from './constats'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { httpClient } from '../../../../api/api'
import { ApiPath } from '../../../../api/constans'
import { openNotification } from '../../../../utils/openNotification'

type Props = {
    isUserLoading: boolean
    user: Role
    setShow: (flag: boolean) => void
    getDataUsers: () => void
}


const RoleSchema = Yup.object().shape({
    tipo_usuario: Yup.string().required('Seleccione el rol de usuario')
})
const ModalRolesUpdate: FC<Props> = ({ user, isUserLoading, setShow, getDataUsers }) => {
    // const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
    // const userAvatarImg = toAbsoluteUrl(`/media/${user.avatar}`)




    console.log(user, 'data del modal user');
    const formik = useFormik<Role>({
        initialValues: user,
        validationSchema: RoleSchema,
        onSubmit: (values) => handleSubmit(values)
    })


    const handleSubmit = async (values: Role) => {

        console.log(values, 'valuesss');

        // setLoading(true)
        try {
          const { data: { success, message } } = await httpClient.patch(ApiPath.Users.UpdateRole, values)
          console.log(message);
          setShow(false);
          openNotification('Rol', 'success', message);
          getDataUsers();
        } catch (error) {
          console.error(error);
          setShow(false);
          openNotification('Rol', 'danger', 'error al Actualizar')
        }
        // setLoading(false)
    }

    // useEffect(() => {
        //   if (user && user.avatar) {
        //     setImagenURL(getImageUrlBackend(`/avatars/${user.avatar}`))
        //   }
    // }, [])




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
                            <h2 className='fw-bolder'>Update Rol</h2>
                            {/* end::Modal title */}

                            {/* begin::Close */}
                            <div
                                className='btn btn-icon btn-sm btn-active-icon-primary'
                                data-kt-users-modal-action='close'
                                //   onClick={() => setModalVisible(false)}
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

                                        <div className='row mb-6'>
                                            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Rol de usuario</label>
                                            <div className='col-lg-8 fv-row'>
                                                <select
                                                    className='form-select form-select-solid form-select-lg'
                                                    {...formik.getFieldProps('tipo_usuario')}
                                                >
                                                    <option value=''>Seleccionar rol de usuario...</option>
                                                    <option value='C'>Cocinero</option>
                                                    <option value='O'>Cajero</option>
                                                    <option value='M'>Mesero</option>
                                                    <option value='B'>Bartender</option>
                                                </select>
                                                {formik.touched.tipo_usuario && formik.errors.tipo_usuario && (
                                                    <div className='fv-plugins-message-container'>
                                                        <div className='fv-help-block'>{formik.errors.tipo_usuario}</div>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                        {/* </div> */}

                                        <div className='text-center pt-15'>
                                            <button
                                                type='reset'
                                                onClick={() => setShow(false)}
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
                                                // onClick={() => handleSubmit}

                                            // disabled={
                                            //   isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched
                                            // }
                                            >
                                                <span className='indicator-label'>Guardar</span>
                                                {/* {(formik.isSubmitting || isUserLoading) && (
                                                    <span className='indicator-progress'>
                                                        Guardando...{' '}
                                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                                    </span>
                                                )} */}
                                            </button>
                                        </div>
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

export { ModalRolesUpdate }
