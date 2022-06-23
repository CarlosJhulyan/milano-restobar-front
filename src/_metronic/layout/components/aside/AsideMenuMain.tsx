/* eslint-disable react/jsx-no-target-blank */
// import React from 'react';
// import {KTSVG} from '../../../helpers';
// import {AsideMenuItemWithSub} from './AsideMenuItemWithSub';
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../../../app/modules/auth'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const { currentUser, currentAdmin } = useAuth()
  const location = useLocation()
  
  const isPageAdmin = location.pathname.includes('/admin')

  return (
    <>
      {currentUser && (
        <AsideMenuItem
          to='/tablero'
          icon='/media/icons/duotune/art/art002.svg'
          title='Tablero'
          fontIcon='bi-app-indicator'
        />
      )}

      {(currentAdmin && isPageAdmin) && (
        <AsideMenuItem
          to='/admin/tablero'
          icon='/media/icons/duotune/art/art002.svg'
          title='Tablero'
          fontIcon='bi-app-indicator'
        />
      )}

      {isPageAdmin && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Usuarios</span>
            </div>
          </div>
          <AsideMenuItem
            to='/admin/usuarios'
            icon='/media/icons/duotune/communication/com014.svg'
            title='Listado Usuarios'
            fontIcon='bi-layers'
          />
          <AsideMenuItem
            to='/admin/roles'
            icon='/media/icons/duotune/general/gen019.svg'
            title='Asignar Roles'
            fontIcon='bi-layers'
          />
        </>
      )}

      {isPageAdmin && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Platillos</span>
            </div>
          </div>
          <AsideMenuItem
            to='/admin/platos'
            icon='/media/icons/duotune/general/gen011.svg'
            title='Platillos'
            fontIcon='bi-layers'
          />
          <AsideMenuItem
            to='/admin/ingredientes'
            icon='/media/icons/duotune/ecommerce/ecm001.svg'
            title='Ingredientes'
            fontIcon='bi-layers'
          />
          <AsideMenuItem
            to='/admin/recetas'
            icon='/media/icons/duotune/electronics/elc002.svg'
            title='Recetas'
            fontIcon='bi-layers'
          />
          <AsideMenuItem
            to='/admin/medidas'
            icon='/media/icons/duotune/ecommerce/ecm003.svg'
            title='Unidades de Medida'
            fontIcon='bi-layers'
          />
        </>
      )}

      {isPageAdmin && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Restaurante</span>
            </div>
          </div>
          <AsideMenuItem
            to='/admin/cartas'
            icon='/media/icons/duotune/ecommerce/ecm008.svg'
            title='Cartas'
            fontIcon='bi-layers'
          />
          <AsideMenuItem
            to='/admin/restaurantes'
            icon='/media/icons/duotune/ecommerce/ecm004.svg'
            title='Restaurantes'
            fontIcon='bi-layers'
          />
        </>
      )}

      {isPageAdmin && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>General</span>
            </div>
          </div>
          <AsideMenuItem
            to='/admin/restaurantes'
            icon='/media/icons/duotune/general/gen017.svg'
            title='Mesas'
            fontIcon='bi-layers'
          />
          <AsideMenuItem
            to='/admin/restaurantes'
            icon='/media/icons/duotune/general/gen003.svg'
            title='Categorías'
            fontIcon='bi-layers'
          />
        </>
      )}

      {(!isPageAdmin && currentUser?.tipo_usuario === 'M') && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Pedidos</span>
            </div>
          </div>
          <AsideMenuItem
            to='/realizarPedido'
            icon='/media/icons/duotune/ecommerce/ecm008.svg'
            title='Realizar pedido'
            fontIcon='bi-layers'
          />
          <AsideMenuItem
            to='/misPedidos'
            icon='/media/icons/duotune/ecommerce/ecm008.svg'
            title='Mis pedidos'
            fontIcon='bi-layers'
          />
        </>
      )}

      {(!isPageAdmin && currentUser?.tipo_usuario === 'M') && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Platillos</span>
            </div>
          </div>
          <AsideMenuItem
            to='/platos'
            icon='/media/icons/duotune/general/gen011.svg'
            title='Platillos'
            fontIcon='bi-layers'
          />
        </>
      )}

      {(!isPageAdmin && currentUser?.tipo_usuario === 'O') && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Pedidos</span>
            </div>
          </div>
          <AsideMenuItem
            to='/pedidos'
            icon='/media/icons/duotune/ecommerce/ecm008.svg'
            title='Pedidos'
            fontIcon='bi-layers'
          />
        </>
      )}


      {/* <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}
