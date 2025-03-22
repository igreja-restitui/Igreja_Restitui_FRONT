import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Verifica se o usuário está autenticado (usando authToken como no seu FormLogin)
  const isAuthenticated = !!localStorage.getItem("authToken");

  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o componente filho
  return <Outlet />;
};

export default ProtectedRoute;
