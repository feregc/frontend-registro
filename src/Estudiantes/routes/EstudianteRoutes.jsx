import { NavbarEspecifico } from "../../IU/components/NavbarEspecifico";
import { Route, Routes } from "react-router-dom";
import { LandingEstudiantePage } from "../pages/LandingEstudiantePage";
import { PerfilEstudiantePage } from "../pages/PerfilEstudiantePage";
import { EditarPerfilEstudiantePage } from "../pages/EditarPerfilEstudiantePage";
import { SolicitudEstudiantePage } from "../pages/SolicitudEstudiantePage";
import { SolicitudPage } from "../pages/SolicitudPage";
import { PagosPage } from "../pages/PagosPage";
import { MatriculaPage } from "../pages/MatriculaPage";
import { LandingMatricula } from "../pages/LandingMatricula";
import { CancelarPage } from "../pages/CancelarPage";
import { VerCalificacionesPage } from "../pages/VerCalificacionesPage";
import { EvaluarDocente } from "../components/EvaluarDocente";
import { VerSolicitudesPage } from "../pages/VerSolicitudesPage";

export const EstudianteRoutes = () => {
  return (
    <>
      <NavbarEspecifico />
      <Routes>
        <Route path="/home" element={<LandingEstudiantePage />} />
        <Route path="/PerfilEstudiante" element={<PerfilEstudiantePage />} />

        <Route path="/ver-calificaciones" element={<VerCalificacionesPage/>} />
        <Route path="/evaluar-docente" element={<EvaluarDocente/>} />
        <Route
          path="/EditarPerfilEstudiante"
          element={<EditarPerfilEstudiantePage />}
        />
        <Route
          path="/SolicitudEstudiante"
          element={<SolicitudEstudiantePage />}
        />
        <Route path="/SolicitudPage" element={<SolicitudPage />} />
        <Route path="/PagosPage" element={<PagosPage />} />
        <Route path="/VerSolicitudPage" element={<VerSolicitudesPage/>} />

        <Route path="/matricular" element={<LandingMatricula />} />
        <Route path="/matriculaClase" element={<MatriculaPage />} />
        <Route path="/cancelarClase" element={<CancelarPage />} />
        matriculaClase
      </Routes>
    </>
  );
};
