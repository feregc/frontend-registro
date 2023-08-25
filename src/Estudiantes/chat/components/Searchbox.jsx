import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { FriendRequestsScreen } from "./FriendRequestsScreen ";
import { SearchFriend } from "./SearchFriend";

export const Searchbox = () => {
  const { auth, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("buscar");

  const handleShow = () => {
    setActiveTab("solicitudes");
  };

  const renderContent = () => {
    if (activeTab === "buscar") {
      return (
        <div>
          <SearchFriend />
        </div>
      );
    } else if (activeTab === "solicitudes") {
      return <FriendRequestsScreen />;
    }
  };
  const regresar = () => {
    window.history.back();
  };

  return (
    <>
      <div className="headind_srch">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="my-2 w-100">
                <h5>{auth.name}</h5>
              </div>
            </div>
            <div className="col">
              {/* Cambiar al color azul de todas las pantallas */}
              <button className="btn btn-success mt-4" onClick={regresar}>
                Atras
              </button>
              {/* <button className="btn btn-danger mx-1" onClick={logout}>
                Atras
              </button> */}
            </div>
          </div>
        </div>

        <div className="my-3">
          <ul className="nav nav-underline">
            <li className="nav-item">
              <h5
                className={`nav-link ${activeTab === "buscar" ? "active" : ""}`}
                aria-current="page"
                href="#"
                onClick={() => setActiveTab("buscar")}
              >
                Buscar
              </h5>
            </li>
            <li className="nav-item">
              <h5
                className={`nav-link ${activeTab === "solicitudes" ? "active" : ""
                  }`}
                onClick={handleShow}
              >
                Solicitudes
              </h5>
            </li>
          </ul>
        </div>

        {renderContent()}
      </div>
    </>
  );
};
