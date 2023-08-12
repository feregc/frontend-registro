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
import {ClasesMatriculada} from "../components/ClasesMatriculada"
import {VerPerfilDeDocente} from "../components/VerPerfilDeDocente"
import {HistorialAcademico} from "../pages/HitorialAcademico"
import { AuthContext } from "../chat/auth/AuthContext";
import { useContext, useEffect } from "react";
import { PublicRoute } from "../../router/PublicRoute";
import { PrivateRoute } from "../../router/PrivateRoute";


export const EstudianteRoutes = () => {

  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
      verificaToken();
  }, [verificaToken]);

  if (auth.checking) {
      return <h1>Espere por favor</h1>;
  }
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
        <Route path="/clases-matriculadas" element={<ClasesMatriculada />} />
        <Route path="/perfil-docente" element={<VerPerfilDeDocente />} />
        <Route path="/matricular" element={<LandingMatricula />} />
        <Route path="/matriculaClase" element={<MatriculaPage />} />
        <Route path="/cancelarClase" element={<CancelarPage />} />
        <Route path="/HistorialAcademico" element={<HistorialAcademico />} />

        <Route
          path="/auth/*"
          element={<PublicRoute isAuthenticated={auth.logged} />}
        />
        <Route
          path="/estudiante/chat"
          element={<PrivateRoute isAuthenticated={auth.logged} />}
        />
     
      </Routes>
    </>
  );
};
