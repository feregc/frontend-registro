import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LandingPage } from "../IU/pages/LandingPage";
import { NavbarGeneral } from "../IU/components/NavbarGeneral";
import { LoginAdminPage } from "../Administardor/pages/LoginAdminPage";
import { LoginDocentePage } from "../Docentes/pages/LoginDocentePage";
import { LoginEstudiantePage } from "../Estudiantes/pages/LoginEstudiantePage";
import { SobrePage } from "../IU/pages/SobrePage";
import { AdministradorRautes } from "../Administardor/routes/AdministradorRautes";
import { DocenteRoutes } from "../Docentes/routes/DocenteRoutes";
import { EstudianteRoutes } from "../Estudiantes/routes/EstudianteRoutes";
import { RecuperacionEstudiantePage } from "../Estudiantes/pages/RecuperacionEstudiantePage";
import { RestablecerPage } from "../Estudiantes/pages/RestablecerPage";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AuthContext } from "../Estudiantes/chat/auth/AuthContext";
import { useContext, useEffect } from "react";

// import { RestablePassDocentePage } from "../Docentes/pages/RestablePassDocentePage";

export const AppRouter = () => {
  const location = useLocation();

  const shouldRenderNavbar = () => {
    const currentPath = location.pathname;
    return (
      !currentPath.startsWith("/administrador") &&
      !currentPath.startsWith("/docente") &&
      !currentPath.startsWith("/estudiante")
    );
  };

  

  return (
    <>
      {shouldRenderNavbar() && <NavbarGeneral />}
      <Routes>
        {/* rutas publicas */}
        <Route path="landing" element={<LandingPage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/log/admin" element={<LoginAdminPage />} />
        <Route path="/log/docente" element={<LoginDocentePage />} />
        <Route path="/log/estudiante" element={<LoginEstudiantePage />} />
        <Route
          path="/recuperacion/estudiante"
          element={<RecuperacionEstudiantePage />}
        />
        <Route path="/reset-password/:token" element={<RestablecerPage />} />
        {/* <Route path='/docente-reset-password/:token' element={<RestablePassDocentePage />} /> */}

        {/* rutas privadas */}
        <Route path="/administrador/*" element={<AdministradorRautes />} />
        <Route path="/docente/*" element={<DocenteRoutes />} />
        <Route path="/estudiante/*" element={<EstudianteRoutes />} />



        {/* RUTAS DEL CHAT */}
        {/* <Route
          path="/estudiante/auth/*"
          element={<PublicRoute isAuthenticated={auth.logged} />}
        />
        <Route
          path="/estudiante/chat"
          element={<PrivateRoute isAuthenticated={auth.logged} />}
        /> */}

        <Route path="/" element={<Navigate to="/landing" />} />
      </Routes>
    </>
  );
};
