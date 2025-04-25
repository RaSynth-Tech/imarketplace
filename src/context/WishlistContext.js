import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  // Initialize wishlists from localStorage or with default empty list
  const [wishlists, setWishlists] = useState(() => {
    const savedWishlists = localStorage.getItem('wishlists');
    return savedWishlists 
      ? JSON.parse(savedWishlists) 
      : [{ id: 'default', name: 'My Wishlist', items: [] }];
  });

  // Save wishlists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wishlists', JSON.stringify(wishlists));
  }, [wishlists]);

  // Add a new empty wishlist with given name
  const createWishlist = (name) => {
    const newWishlist = {
      id: `wishlist-${Date.now()}`,
      name: name || `Wishlist ${wishlists.length + 1}`,
      items: []
    };
    setWishlists([...wishlists, newWishlist]);
    return newWishlist.id;
  };

  // Delete a wishlist by id
  const deleteWishlist = (wishlistId) => {
    setWishlists(wishlists.filter(list => list.id !== wishlistId));
  };

  // Rename a wishlist
  const renameWishlist = (wishlistId, newName) => {
    setWishlists(wishlists.map(list => 
      list.id === wishlistId ? { ...list, name: newName } : list
    ));
  };

  // Add product to a specific wishlist
  const addToWishlist = (wishlistId, product) => {
    setWishlists(wishlists.map(list => {
      if (list.id === wishlistId) {
        // Check if product already exists in this wishlist
        const exists = list.items.some(item => item.id === product.id);
        if (!exists) {
          return { ...list, items: [...list.items, product] };
        }
      }
      return list;
    }));
  };

  // Remove product from a specific wishlist
  const removeFromWishlist = (wishlistId, productId) => {
    setWishlists(wishlists.map(list => {
      if (list.id === wishlistId) {
        return { 
          ...list, 
          items: list.items.filter(item => item.id !== productId) 
        };
      }
      return list;
    }));
  };

  // Check if a product is in any wishlist
  const isInAnyWishlist = (productId) => {
    return wishlists.some(list => 
      list.items.some(item => item.id === productId)
    );
  };

  // Check if a product is in a specific wishlist
  const isInWishlist = (wishlistId, productId) => {
    const wishlist = wishlists.find(list => list.id === wishlistId);
    return wishlist ? wishlist.items.some(item => item.id === productId) : false;
  };

  // Get all wishlist names and ids
  const getWishlistsInfo = () => {
    return wishlists.map(list => ({ id: list.id, name: list.name }));
  };

  // Get a specific wishlist by id with items
  const getWishlist = (wishlistId) => {
    return wishlists.find(list => list.id === wishlistId);
  };

  // Get default wishlist
  const getDefaultWishlist = () => {
    return wishlists[0];
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        createWishlist,
        deleteWishlist,
        renameWishlist,
        addToWishlist,
        removeFromWishlist,
        isInAnyWishlist,
        isInWishlist,
        getWishlistsInfo,
        getWishlist,
        getDefaultWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext; 