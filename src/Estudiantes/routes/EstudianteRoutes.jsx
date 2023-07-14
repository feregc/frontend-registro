import { NavbarEspecifico } from '../../IU/components/NavbarEspecifico'
import { Route, Routes } from 'react-router-dom'
import { LandingEstudiantePage } from '../pages/LandingEstudiantePage'
import { PerfilEstudiantePage } from '../pages/PerfilEstudiantePage'
import {EditarPerfilEstudiantePage} from '../pages/EditarPerfilEstudiantePage';
import {SolicitudEstudiantePage} from '../pages/SolicitudEstudiantePage';
import {SolicitudPage} from '../pages/SolicitudPage';

export const EstudianteRoutes = () => {
  return (
    <>
      <NavbarEspecifico />
      <Routes>
        <Route path='/home' element={<LandingEstudiantePage/>} />
        <Route path='/PerfilEstudiante' element={<PerfilEstudiantePage/>} />
        <Route path='/EditarPerfilEstudiante' element={<EditarPerfilEstudiantePage />} />
        <Route path='/SolicitudEstudiante' element={<SolicitudEstudiantePage />} />
        <Route path='/SolicitudPage' element={<SolicitudPage />} />
      </Routes>
    </>
  )
}
