import React, { useContext } from 'react';

import { ChatSelect } from '../chat/components/ChatSelect';
import { Messages } from '../chat/components/Messages';
import { InboxPeople } from '../chat/components/InboxPeople';
import { ChatContext } from '../chat/context/chat/ChatContext';

import '../chat/css/chat.css';

export const ChatPage = () => {

    const { chatState } = useContext( ChatContext );

    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />

                {
                    ( chatState.chatActivo )
                        ? <Messages />
                        : <ChatSelect />
                }
                

            </div>


        </div>
    )
}
