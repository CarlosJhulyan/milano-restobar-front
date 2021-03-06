import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
// import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {DashboardAdmin} from '../modules/admin/DashboardAdmin'
import {useAuth} from '../modules/auth'
import RecetasPage from '../modules/admin/recetas/RecetasPage'

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  // const UsersPage = lazy(() => import('../modules/apps/user-managements/UsersPage'))
  const UsersPageAdmin = lazy(() => import('../modules/admin/users/UsersPage'))
  const IngredientsPageAdmin = lazy(() => import('../modules/admin/ingredients/IngredientsPage'))
  const PlatesPageAdmin = lazy(() => import('../modules/admin/plates/PlatesPage'))
  const MenusPageAdmin = lazy(() => import('../modules/admin/menus/MenusPage'))
  const RestaurantesPageAdmin = lazy(() => import('../modules/admin/restaurantes/RestaurantesPage'))
  const RolesPage = lazy(() => import('../modules/admin/roles/RolesPage'))
  const TablesPageAdmin = lazy(() => import("../modules/admin/tables/TablesPage"))
  const CategoriesPageAdmin = lazy(() => import("../modules/admin/categories/CategoriesPage"))

  const PlatesPage = lazy(() => import('../modules/users/plates/PlatesPage'))
  const MakeOrderPage = lazy(() => import('../modules/users/orders/MakeOrderPage/MakeOrderPage'))
  const MyOrdersPage = lazy(() => import('../modules/users/orders/MyOrders/MyOrdersPage'))
  const OrdersListPage = lazy(() => import('../modules/users/ordersCajero/OrdersList/OrdersPage'))
  const PlaceOrderPage = lazy(() => import('../modules/users/ordersCajero/PlaceOrder/PlaceOrderPage'))
  const OrdersListPageCanceled = lazy(() => import('../modules/users/ordersCajero/OrdersCanceled/OrdersPage'))

  const {currentUser, currentAdmin} = useAuth()

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {currentUser && <Route path='login/*' element={<Navigate to='/tablero' />} />}
        {currentAdmin && <Route path='admin/login/*' element={<Navigate to='/admin/tablero' />} />}
        {currentAdmin && (
          <>
            <Route path='admin/tablero' element={<DashboardAdmin />} />
            <Route path='admin/usuarios' element={<UsersPageAdmin />} />
            <Route path='admin/roles' element={<RolesPage />} />
            <Route path='admin/ingredientes' element={<IngredientsPageAdmin />} />
            <Route path='admin/platos' element={<PlatesPageAdmin />} />
            <Route path='admin/cartas' element={<MenusPageAdmin />} />
            <Route path='admin/restaurantes' element={<RestaurantesPageAdmin />} />
            <Route path='admin/recetas' element={<RecetasPage />} />
            <Route path='admin/mesas' element={<TablesPageAdmin />} />
            <Route path='admin/categorias' element={<CategoriesPageAdmin />} />
          </>
        )}

        {(currentUser && currentUser.tipo_usuario === 'M') && (
          <>
            <Route path='tablero' element={<DashboardAdmin />} />
            <Route path='platos' element={<PlatesPage />} />
            <Route path='realizarPedido' element={<MakeOrderPage />} />
            <Route path='misPedidos' element={<MyOrdersPage />} />
          </>
        )}

        {(currentUser && currentUser.tipo_usuario === 'O') && (
          <>
            <Route path='tablero' element={<DashboardAdmin />} />
            <Route path='pedidos' element={<OrdersListPage />} />
            <Route path='realizarPago' element={<PlaceOrderPage />} />
            <Route path='cancelados' element={<OrdersListPageCanceled />} />
          </>
        )}

        {/* <Route path='tablero' element={<DashboardWrapper />} /> */}
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPageAdmin />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
