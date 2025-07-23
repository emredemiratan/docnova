import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

interface ProtectedRouteProps {
   children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   const user = useSelector((state: RootState) => state.user.user);

   if (!user || !user.jwt) {
      return <Navigate to="/login" replace />;
   }

   return children;
};

export default ProtectedRoute;
