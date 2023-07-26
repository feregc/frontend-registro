
import { LandingAdministradorPage } from '../pages/LandingAdministradorPage'
import { Route, Routes } from 'react-router-dom'
import { NavbarEspecifico } from '../../IU/components/NavbarEspecifico'
import { RegistroDocentePage } from '../pages/RegistroDocentePage'
import { RegistroEstudiantePage } from '../pages/RegistroEstudiantePage'
import {RolDocentePage} from '../pages/RolDocentePage'
import { ProcesoMatriclaPage } from '../pages/ProcesoMatriclaPage'
import { ProcesoSubidaNotasPage } from '../pages/ProcesoSubidaNotasPage'

export const AdministradorRautes = () => {
  return (
    <>
      <NavbarEspecifico />
      <Routes>
        <Route path='/home' element={<LandingAdministradorPage />} />
        <Route path='/RegistroDocente' element={<RegistroDocentePage />} />
        <Route path='/RegistroEstudiante' element={<RegistroEstudiantePage />} />
        <Route path='/RolDocente' element={<RolDocentePage />} />

        <Route path='/procesoMatricula' element={<ProcesoMatriclaPage />} />
        <Route path='/procesoSubidaNotas' element={<ProcesoSubidaNotasPage />} />
      </Routes>
    </>
  )
}
