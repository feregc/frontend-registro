import React, { useContext } from "react";

import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";

import { types } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export const SidebarChatItem = ({ usuario }) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const { chatActivo } = chatState;

  const onClick = async () => {
    dispatch({
      type: types.activarChat,
      payload: usuario.uid,
    });

    // Cargar los mensajes del chat
    const resp = await fetchConToken(`mensajes/${usuario.uid}`);
    dispatch({
      type: types.cargarMensajes,
      payload: resp.mensajes,
    });

    scrollToBottom("mensajes");
  };

  return (
    <div
      className={`chat_list ${usuario.uid === chatActivo && "active_chat"}`}
      onClick={onClick}
    >
      {/* active_chat */}
      <div className="chat_people">
        <div className="chat_img">
        
          
          {/* <img src="https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="sunil" /> */}
        </div>
        {/* <FontAwesomeIcon icon={faUser} size="2xl"/> */}
        <div className="chat_ib">
          <h5> {usuario.nombre} </h5>
          {usuario.online ? (
            <span className="text-success">En línea</span>
          ) : (
            <span className="text-danger">Desconectado</span>
          )}
        </div>
      </div>
    </div>
  );
};
