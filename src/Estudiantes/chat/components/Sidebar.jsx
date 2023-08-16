import React, { useContext } from 'react';

import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';

import { SidebarChatItem } from './SidebarChatItem';


export const Sidebar = () => {

    const { chatState } = useContext( ChatContext );
    const { auth} = useContext( AuthContext );
 
    const { uid } = auth;

   
    const amigosDelUsuario = chatState.usuarios.filter(user => 
        user.amigos.includes(uid) && user.uid !== uid
    );

    return (
        <div className="inbox_chat">
            {amigosDelUsuario.map(usuario => (
                <SidebarChatItem 
                    key={usuario.uid}
                    usuario={usuario}
                />
            ))}
            <div className="extra_space">
                {/* Espacio extra para scroll */}
            </div>
        </div>
    );
}