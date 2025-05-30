import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
      setIsAdmin(false);
      return mockUserData;
    } else if (email === 'jane@gmail.com' || email === 'david@gmail.com') {
      const mockUserData = {
        id: email === 'jane@gmail.com' ? 2 : 3,
        name: email === 'jane@gmail.com' ? 'Jane Seller' : 'Tim David',
        email: email,
        role: 'seller',
        profilePhoto: email === 'jane@gmail.com' 
          ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
        businessDetails: email === 'jane@gmail.com' 
          ? {
              name: 'Fashion Boutique',
              description: 'Premium Indian fashion and accessories. We specialize in traditional and contemporary designs, offering the best quality products at competitive prices. Our collection includes ethnic wear, fusion wear, and designer accessories.',
              address: 'Shop No. 45, Phoenix Market City, Kurla West, Mumbai - 400070',
              phone: '+91 98765 43210',
              established: '2020',
              totalSales: 1500000,
              totalProducts: 45,
              rating: 4.8,
              businessHours: '10:00 AM - 9:00 PM',
              specialties: ['Ethnic Wear', 'Fusion Fashion', 'Designer Accessories'],
              paymentMethods: ['UPI', 'Cards', 'Cash'],
              shipping: 'Pan India Delivery',
            }
          : {
              name: 'Luxury Accessories',
              description: 'Exclusive collection of premium accessories and jewelry. We bring you the finest quality products from around the world, with a special focus on traditional Indian designs and modern luxury.',
              address: 'Shop No. 12, DLF Mall of India, Sector 18, Noida - 201301',
              phone: '+91 98765 43211',
              established: '2019',
              totalSales: 1200000,
              totalProducts: 35,
              rating: 4.9,
              businessHours: '11:00 AM - 10:00 PM',
              specialties: ['Luxury Jewelry', 'Designer Bags', 'Premium Accessories'],
              paymentMethods: ['UPI', 'Cards', 'Cash'],
              shipping: 'Pan India Delivery',
            },
      };
      setUser(mockUserData);
      setIsAuthenticated(true);
      setIsSeller(true);
      setIsAdmin(false);
      return mockUserData;
    } else if (email === 'admin@gmail.com') {
      const mockUserData = {
        id: 4,
        name: 'Admin User',
        email: email,
        role: 'admin',
        profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60',
      };
      setUser(mockUserData);
      setIsAuthenticated(true);
      setIsSeller(false);
      setIsAdmin(true);
      return mockUserData;
    }
    throw new Error('Invalid credentials');
  };

  const register = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsSeller(userData.role === 'seller');
    setIsAdmin(userData.role === 'admin');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsSeller(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isSeller,
        isAdmin,
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