import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const SearchFriend = () => {
  const { auth } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/search?query=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const sendFriendRequest = async (friendEmail) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/users/send-friend-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: auth.email, // Cambia por el correo del usuario actual
            friendEmail: friendEmail,
          }),
        }
      );

      if (response.ok) {
        console.log("Solicitud de amistad enviada");
        window.alert("Solicitud de amistad enviada");
      } else {
        console.error(
          "Error al enviar solicitud de amistad:",
          response.statusText
        );
        window.alert("Ya hay una solucitud creada");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="stylish-input-group mb-3">
              <input
                type="text"
                className="form-control mb-3 btn-w"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col">
            <button className="btn btn-primary " onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div>
        <h5 className="my-4">Resultados de la búsqueda:</h5>
        <div className="row">
          {searchResults.map((user) => (
            <div key={user.uid}>
              <div className="row">
                <div className="col text my-3 mx-4">
                  {user.nombre}
                </div>
                <div className="col my-3">
                  <button
                    name="aceptar "
                    className="btn btn-primary btn-w1 mx-4"
                    onClick={() => sendFriendRequest(user.email)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
