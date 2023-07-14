import { NavbarEspecifico } from '../../IU/components/NavbarEspecifico'
import { Route, Routes } from 'react-router-dom'
// import { LandingDocentePage } from '../pages/LandingDocentePage'
import { LandingPreviusPage } from '../pages/LandingPreviusPage'
import { RecuperacionDocentePage } from '../pages/RecuperacionDocentePage'
import { RestablePassDocentePage } from '../pages/RestablePassDocentePage'
import { DetalleClase } from '../components/DetalleDeClase'
import { PerfilDocente } from '../components/PerfilDocente'
import {EditarPerfil} from '../components/EditarPerfil'
import { CrearSeccionesPage } from '../pages/CrearSeccionesPage'


export const DocenteRoutes = () => {
  return (
    <>
      <NavbarEspecifico />
      <Routes>
        <Route path='/home' element={<LandingPreviusPage/>} />
        <Route path='/recupeacion' element={<RecuperacionDocentePage/>} />
        <Route path='/reset-password/:token' element={<RestablePassDocentePage />} />
        <Route path='/detalle-de-clase/:id' element={<DetalleClase />} />
        <Route path='/perfil' element={<PerfilDocente />} />
        <Route path='/editar-perfil' element={<EditarPerfil />} />
        <Route path='/crearSeccion' element={<CrearSeccionesPage />} />

      </Routes>
    </>
  )
}
