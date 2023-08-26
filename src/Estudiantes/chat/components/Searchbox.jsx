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
              <div className="my-2">
                <h4>{auth.name}</h4>
              </div>
            </div>
            <div className="col d-flex justify-content-end">
              <div className="my-2">
                <button className="btn btn-success" onClick={regresar}>
                  Atrás
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-3">
          <ul className="nav nav-underline">
            <li className="nav-item">
              <h3
                className={`nav-link ${activeTab === "buscar" ? "active" : ""}`}
                aria-current="page"
                href="#"
                onClick={() => setActiveTab("buscar")}
              >
                Buscar
              </h3>
            </li>
            <li className="nav-item">
              <h3
                className={`nav-link ${
                  activeTab === "solicitudes" ? "active" : ""
                }`}
                onClick={handleShow}
              >
                Solicitudes
              </h3>
            </li>
          </ul>
        </div>
        {renderContent()}
      </div>
    </>
  );
};
