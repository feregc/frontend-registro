import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

export const FriendRequestsScreen = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const { auth } = useContext(AuthContext);
  const { chatState, dispatch } = useContext(ChatContext);

  useEffect(() => {
    loadFriendRequests();
  }, []);

  const loadFriendRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/friend-requests-received?userEmail=${auth.email}`
      );
      const data = await response.json();
      setFriendRequests(data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const acceptFriendRequest = async (solicitudId) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/users/accept-friend-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            solicitudId: solicitudId,
          }),
        }
      );

      if (response.ok) {
        // Actualiza la lista de solicitudes después de aceptar
        loadFriendRequests();
        console.log("Solicitud de amistad aceptada");
      } else {
        console.error("Error al aceptar la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
    }
  };

  const rejectFriendRequest = async (solicitudId) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/users/reject-friend-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            solicitudId: solicitudId,
          }),
        }
      );

      if (response.ok) {
        console.log("Solicitud de amistad rechazada");
        // Puedes realizar actualizaciones en la interfaz aquí si es necesario
      } else {
        console.error(
          "Error al rechazar solicitud de amistad:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <>
      <div id="friendRequests">
        <div className="headind_srch">
          <h5 className="my-3">Solicitudes de Amistad Recibidas</h5>
          <div className="container">
            {friendRequests.map((request) => (
              <div key={request._id} className="row">
                <div className="col-8 text">{request.remitente.nombre}</div>
                <div className="col-2">
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => acceptFriendRequest(request._id)}
                  >
                    Aceptar
                  </button>
                </div>
                <div className="col-2">
                  <button
                    onClick={() => rejectFriendRequest(request._id)}
                    className="btn btn-danger mx-1"
                  >
                    Rechazar
                  </button>
                </div>
                <label> </label> <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
