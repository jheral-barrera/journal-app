import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { useSelector } from 'react-redux'
import { CheckingAuthLoading } from '../ui'

export const AppRouter = () => {

  const { status } = useSelector( state => state.auth );

  if ( status === 'checking' ) return <CheckingAuthLoading />

  return (
    <Routes>

        {/* Ruta de login/registro */}
        <Route path='/auth/*' element={ <AuthRoutes /> } />

        {/* Ruta de la aplicacion journal */}
        <Route path='/*' element={ <JournalRoutes /> } />

    </Routes>
  )
}
