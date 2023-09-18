import { Navigate, Outlet } from 'react-router-dom';
import type ProtectedRouteType from './types';

const ProtectedRoute = ({ isLoggedIn }: ProtectedRouteType) => {
  return isLoggedIn ? <Outlet /> : <Navigate to='/' replace />;
};

export default ProtectedRoute;
