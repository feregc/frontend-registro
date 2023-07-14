import { Link, NavLink } from "react-router-dom";
import "../../Assets/styles/styles-landing/Navbar-styles.css";

export const NavbarGeneral = () => {
  return (
    <>
      <header className="navbar navbar-expand-lg bd-navbar sticky-top">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2 fixed-top">
          <Link className="navbar-brand" to="/">
            <img
              src="../../src/Assets/img/logo-unah-blanco.png"
              alt="UNAH"
              className="logo-unah"
            />
          </Link>

          <div className="navbar-collapse">
            <div className="navbar-nav">
              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
                to="/"
              >
                <button className="btn btn-primary">Inicio</button>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `nav-item nav-link ${isActive ? "active" : ""}`
                }
                to="/sobre"
              >
                <button className="btn btn-primary">Sobre</button>
              </NavLink>
            </div>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
            <ul className="navbar-nav ml-auto">
              <NavLink
                // className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                className="nav-item nav-link"
                to="/log/admin"
              >
                <button className="btn btn-primary">Administrador</button>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/log/docente">
                <button className="btn btn-primary">Docente</button>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/log/estudiante">
                <button className="btn btn-primary">Estudiante</button>
              </NavLink>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};
