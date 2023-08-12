// import React from 'react'
// import { Redirect, Route } from 'react-router-dom'

// export const PublicRoute = ({
//    isAuthenticated,
//    component: Component,
//    ...rest
// }) => {
//     return (
//         <Route { ...rest }
//             component={ (props) => (
//                 ( !isAuthenticated )
//                     ? <Component { ...props } />
//                     : <Redirect to="/" />
//             )} 
//         />
//     )
// }


// import React from 'react';
// import { Route, Navigate, Routes } from 'react-router-dom';

// export const PublicRoute = ({ isAuthenticated, element: Element, ...rest }) => {
//     return (
//         <Routes>
//         <Route
//             {...rest}
//             element={props => (
//                 !isAuthenticated ? <Element {...props} /> : <Navigate to="/" replace />
//             )}
//         />
//         </Routes>
//     );
// };

import { Navigate } from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { ChatPage } from "../Estudiantes/pages/ChatPage";

 
export const PublicRoute = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  // return !isAuthenticated ? <AuthRouter /> : <Navigate to="chat" />;
  
  return !isAuthenticated ? <AuthRouter /> : <ChatPage /> ;
};

