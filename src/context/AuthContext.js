import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const login = (email) => {
    // For demo purposes, specific emails will have specific roles
    console.log("email", email);
    if (email === 'abc@gmail.com') {
      const mockUserData = {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'customer',
        profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60',
      };
      setUser(mockUserData);
      setIsAuthenticated(true);
      setIsSeller(false);
      return mockUserData;
    } else if (email === 'cde@gmail.com') {
      const mockUserData = {
        id: 2,
        name: 'Jane Seller',
        email: email,
        role: 'seller',
        profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
        businessDetails: {
          name: 'Fashion Boutique',
          description: 'Premium Indian fashion and accessories',
          address: '123 Fashion Street, Mumbai',
          phone: '+91 98765 43210',
          established: '2020',
          totalSales: 1500000,
          totalProducts: 45,
          rating: 4.8,
        },
      };
      setUser(mockUserData);
      setIsAuthenticated(true);
      setIsSeller(true);
      return mockUserData;
    }
    throw new Error('Invalid credentials');
  };

  const register = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsSeller(userData.role === 'seller');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsSeller(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isSeller,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 