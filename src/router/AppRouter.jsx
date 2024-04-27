import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'

import { useCheckAuth } from '../hooks'

import { CheckingAuthLoading } from '../ui'

export const AppRouter = () => {
  const status = useCheckAuth();

  if ( status === 'checking' ) return <CheckingAuthLoading />

  return (
    <Routes>

      {
        ( status === 'authenticated')
          ? <Route path='/*' element={ <JournalRoutes />} />
          : <Route path='/auth/*' element={ <AuthRoutes />} />
      }

      <Route path='/*' element={ <Navigate to='/auth/login' />}  />


      {/* Ruta de login/registro */}
      {/* <Route path='/auth/*' element={ <AuthRoutes /> } /> */}

      {/* Ruta de la aplicacion journal */}
      {/* <Route path='/*' element={ <JournalRoutes /> } /> */}

    </Routes>
  )
}
