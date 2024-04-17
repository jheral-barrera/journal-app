import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'

export const AppRouter = () => {
  return (
    <Routes>

        {/* Ruta de login/registro */}
        <Route path='/auth/*' element={ <AuthRoutes /> } />

        {/* Ruta de la aplicacion journal */}
        <Route path='/*' element={ <JournalRoutes /> } />

    </Routes>
  )
}
