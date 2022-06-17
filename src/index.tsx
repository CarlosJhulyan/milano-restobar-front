import ReactDOM from 'react-dom'
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'

import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'

import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'
import { ReactNotifications } from 'react-notifications-component'

setupAxios(axios)

Chart.register(...registerables)

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <MetronicI18nProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ReactNotifications />
    </MetronicI18nProvider>
  </QueryClientProvider>,
  document.getElementById('root')
)
