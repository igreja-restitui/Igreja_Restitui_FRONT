import axios from "axios";

// Cria uma instância do axios com a URL base
const api = axios.create({
  baseURL: "https://igreja-restitui-api.onrender.com",
});

// Adiciona um interceptor para incluir o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    // Busca o token do localStorage (usando authToken como no seu FormLogin)
    const token = localStorage.getItem("authToken");

    // Se houver um token, adiciona ao cabeçalho de autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber erro 401 (não autorizado), redireciona para o login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
