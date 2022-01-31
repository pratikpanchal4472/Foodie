import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';


export function RequireAuth({ children }) {
    const user = useSelector(state => state.user.value);
    const location = useLocation();

    return user.id !== null
        ? children
        : <Navigate
            to="/login"
            replace
            state={{ path: location.pathname }}
        />;
}
