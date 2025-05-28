'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupère la session persistée (user et loggedIn)
    const storedUser = localStorage.getItem('user');
    const loggedIn = localStorage.getItem('loggedIn');
    if (storedUser && loggedIn === 'true') {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    // userData doit contenir {username, ... , role}
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('loggedIn', 'true');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
  };

  // Message personnalisé selon le rôle
  const getWelcomeMessage = () => {
    if (!user) return '';
    if (user.role === 'admin') return `Bienvenue administrateur ${user.username} ! Vous avez un accès complet.`;
    return `Bienvenue ${user.username} ! Vous pouvez accéder au blog et passer commande.`;
  };

  // Historique de commandes selon le rôle
  const getHistory = () => {
    const allOrders = JSON.parse(localStorage.getItem('users') || '[]');
    if (!user) return [];
    if (user.role === 'admin') return allOrders;
    return allOrders.filter(order => order.user === user.username);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin', isUser: user?.role === 'user', getWelcomeMessage, getHistory }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
