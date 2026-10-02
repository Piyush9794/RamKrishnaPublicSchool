import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/roles';
import Loader from '../components/common/Loader';

const ParentRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <Loader fullScreen size="lg" text="Loading..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== ROLES.PARENT) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ParentRoute;
