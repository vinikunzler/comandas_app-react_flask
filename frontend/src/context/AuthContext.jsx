import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Criação do contexto
const AuthContext = createContext();
// Provedor do contexto
export const AuthProvider = ({ children }) => {
  // Inicializa o estado com base no valor do sessionStorage
  // sessionStorage é um armazenamento temporário que persiste enquanto a aba estiver aberta
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("loginRealizado") === "true";
  });
  // useNavigate é um hook do React Router que permite programaticamente navegar entre rotas
  const navigate = useNavigate();
  // Função para login
  const login = async (username, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PROXY_BASE_URL}funcionario/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: username, senha: password }),
      });
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        sessionStorage.setItem("loginRealizado", "true");
        // Se precisar salvar token: sessionStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert("Usuário ou senha inválidos!");
      }
    } catch (error) {
      alert("Erro ao conectar à API.");
    }
  };
  // Função para logout
  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("loginRealizado");
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);
