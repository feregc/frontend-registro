
import { AuthProvider } from './Estudiantes/chat/auth/AuthContext'
import { SocketProvider } from './Estudiantes/chat/context/SocketContext'
import { ChatProvider } from './Estudiantes/chat/context/chat/ChatContext'
import { AppRouter } from './router/AppRouter'

export const RegistroApp = () => {
  return (
    <>
      <ChatProvider>
        <AuthProvider>
          <SocketProvider>
            <AppRouter />
          </SocketProvider>
        </AuthProvider >
      </ChatProvider>
    </>
  )
}

