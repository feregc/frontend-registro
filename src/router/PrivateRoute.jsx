// import React from 'react'
// import { Redirect, Route } from 'react-router-dom'

// export const PrivateRoute = ({
//    isAuthenticated,
//    component: Component,
//    ...rest
// }) => {
//     return (
//         <Route { ...rest }
//             component={ (props) => (
//                 ( isAuthenticated )
//                     ? <Component { ...props } />
//                     : <Redirect to="/auth" />
//             )} 
//         />
//     )
// }


// import React from 'react';
// import { Route, Navigate, Routes } from 'react-router-dom';

// export const PrivateRoute = ({ isAuthenticated, element: Element, ...rest }) => {
//     return (
//         <Routes>
//         <Route
//             {...rest}
//             element={props => (
//                 isAuthenticated ? <Element {...props} /> : <Navigate to="/auth" replace />
//             )}
//         />
//         </Routes>
//     );
// };

import { Navigate } from "react-router-dom";
import { ChatPage } from "../Estudiantes/pages/ChatPage";

 
export const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <ChatPage /> : <Navigate to="estudiante/auth/loginChat" />;
};



