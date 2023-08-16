import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const Searchbox = () => {
    const { auth, logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/search?query=${searchQuery}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const sendFriendRequest = async (friendEmail) => {
        try {
            const response = await fetch('http://localhost:8080/api/users/send-friend-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: auth.email, // Cambia por el correo del usuario actual
                    friendEmail: friendEmail
                })
            });

            if (response.ok) {
                console.log('Solicitud de amistad enviada');
              window.alert('Solicitud de amistad enviada');
            } else {
                console.error('Error al enviar solicitud de amistad:', response.statusText);
                window.alert('Ya hay una solucitud creada');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <div className="headind_srch">
            <div className="recent_heading mt-2">
                <h4>{auth.name}</h4>
            </div>
            <div className="srch_bar">
                <div className="stylish-input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Buscar
                    </button>
                    <button className="btn btn-danger" onClick={logout}>
                        Salir (desconectar)
                    </button>
                </div>
            </div>
            <div>
                <h5>Resultados de la búsqueda:</h5>
                <ul>
                    {searchResults.map(user => (
                        <li key={user.uid}>
                            {user.nombre} <br /> {user.email} <br />
                            <button name="aceptar "className="btn btn-primary" onClick={() => sendFriendRequest(user.email)}>
                                Agregar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
           
        </div>
    );
};
