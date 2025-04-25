import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
  Snackbar,
  Alert,
  IconButton,
  Chip,
  Avatar,
  Rating,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedIcon from '@mui/icons-material/Verified';
import FloatingHomeButton from '../components/common/FloatingHomeButton';
import AddToCartButton from '../components/common/AddToCartButton';
import { sellers } from '../data/sellers';
import { ThemeContext } from '../App';

const categories = {
  'Dresses': ['Summer Dresses', 'Evening Dresses', 'Casual Dresses', 'Formal Dresses'],
  'Accessories': ['Jewelry', 'Bags', 'Shoes', 'Belts', 'Scarves'],
  'Tops': ['Blouses', 'T-Shirts', 'Sweaters', 'Tank Tops'],
  'Bottoms': ['Jeans', 'Skirts', 'Shorts', 'Pants'],
  'Outerwear': ['Jackets', 'Coats', 'Blazers', 'Cardigans'],
};

// Helper function to get seller by ID with fallback
const getSellerById = (sellerId) => {
  const seller = sellers.find(seller => seller.id === sellerId);
  return seller || {
    id: sellerId,
    name: 'Unknown Seller',
    profilePhoto: '',
    rating: 0,
    verified: false,
    businessDetails: {
      name: 'Unknown Business',
      address: 'Not Available',
      phone: 'Not Available',
      email: 'Not Available',
    }
  };
};

export const products = [
  // Jane's Products (Fashion Boutique)
  {
    id: 1,
    title: 'Classic White Shirt',
    subcategory: 'Casual Shirts',
    category: 'Shirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'A timeless classic white shirt made from premium cotton, perfect for both formal and casual occasions. Features a classic point collar and button cuffs.',
    price: 1999,
    cost: 1200,
    sale: 1599,
    discount: 20,
    stock: 25,
    sellerId: 1,
    seller: getSellerById(1),
    colors: ['#000000', '#FFFFFF', '#4169E1'],
    sizes: ['S', 'M', 'L', 'XL'],
    specifications: {
      'Material': '100% Cotton',
      'Care Instructions': 'Machine wash cold',
      'Fit': 'Regular Fit',
      'Collar': 'Classic Point Collar',
      'Cuff': 'Button Cuff'
    },
    reviews: [
      {
        id: 1,
        author: 'Sarah Johnson',
        rating: 4.5,
        comment: 'Beautiful dress, perfect for summer!',
        date: '2024-02-15',
        verified: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Elegant Evening Gown',
    subcategory: 'Evening Dresses',
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'A stunning floor-length evening gown made from luxurious silk blend fabric. Features an A-line silhouette with a hidden zipper closure, perfect for formal events and special occasions.',
    price: 19999,
    cost: 12000,
    sale: 16599,
    discount: 17,
    stock: 15,
    sellerId: 1,
    seller: getSellerById(1),
    colors: ['#000000', '#800020', '#4B0082'],
    sizes: ['XS', 'S', 'M', 'L'],
    specifications: {
      'Material': 'Silk Blend',
      'Care Instructions': 'Dry clean only',
      'Length': 'Floor Length',
      'Style': 'A-Line',
      'Closure': 'Hidden Zipper'
    },
    reviews: [
      {
        id: 1,
        author: 'Maria Garcia',
        rating: 4.8,
        comment: 'Perfect for formal events!',
        date: '2024-02-12',
        verified: true,
      },
    ],
  },
  {
    id: 3,
    title: 'Casual Maxi Dress',
    subcategory: 'Summer Dresses',
    category: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60',
    description: 'A beautiful floral print maxi dress made from comfortable cotton blend fabric. Perfect for summer days and casual outings, featuring a relaxed fit and flowing silhouette.',
    price: 7999,
    cost: 4000,
    sale: 6639,
    discount: 17,
    stock: 30,
    sellerId: 1,
    seller: getSellerById(1),
    colors: ['#FFC0CB', '#FFFFFF', '#FF69B4'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    specifications: {
      'Material': 'Cotton Blend',
      'Care Instructions': 'Machine wash cold',
      'Length': 'Maxi',
      'Style': 'Floral Print',
      'Pattern': 'Floral'
    },
    reviews: [
      {
        id: 1,
        author: 'Emma Wilson',
        rating: 4.5,
        comment: 'Very comfortable and stylish!',
        date: '2024-02-08',
        verified: true,
      },
    ],
  },
  {
    id: 4,
    title: 'Cocktail Dress',
    price: 129.9 * 83,
    images: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
    description: 'An elegant cocktail dress perfect for parties and special events. Features a flattering silhouette with a fitted bodice and flowing skirt, made from high-quality fabric.',
    category: 'Dresses',
    subcategory: 'Formal Dresses',
    stock: 12,
    sellerId: 1,
    seller: getSellerById(1),
  },
  // Tim's Products (Luxury Accessories)
  {
    id: 5,
    title: 'Classic Gold Necklace',
    price: 3999,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'An elegant gold necklace with a delicate chain, perfect for adding a touch of sophistication to any outfit. Made from 18K gold with a classic design that never goes out of style.',
    category: 'Accessories',
    subcategory: 'Jewelry',
    stock: 15,
    sellerId: 2,
    seller: getSellerById(2),
    colors: ['#FFD700', '#C0C0C0', '#B87333'],
    specifications: {
      'Material': 'Gold',
      'Length': '18 inches',
      'Care Instructions': 'Store in jewelry box',
      'Purity': '18K',
    },
    reviews: [
      {
        id: 1,
        author: 'Emily Brown',
        rating: 5,
        comment: 'Stunning necklace, great quality!',
        date: '2024-02-10',
        verified: true,
      },
    ],
  },
  {
    id: 6,
    title: 'Leather Crossbody Bag',
    price: 4999,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'A stylish leather crossbody bag with an adjustable strap, perfect for everyday use. Made from genuine leather with a zipper closure and multiple compartments for organization.',
    category: 'Accessories',
    subcategory: 'Bags',
    stock: 8,
    sellerId: 2,
    seller: getSellerById(2),
    colors: ['#8B4513', '#000000', '#A0522D'],
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '8" x 6" x 2"',
      'Care Instructions': 'Use leather conditioner',
      'Closure': 'Zipper',
    },
    reviews: [
      {
        id: 1,
        author: 'Lisa Chen',
        rating: 4,
        comment: 'Great quality leather, perfect size!',
        date: '2024-02-05',
        verified: true,
      },
    ],
  },
  {
    id: 7,
    title: 'Stiletto Heels',
    subcategory: 'High Heels',
    category: 'Shoes',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Elegant stiletto heels made from genuine leather with a cushioned insole for comfort. Features a classic 4-inch heel height and a timeless design that pairs well with any outfit.',
    price: 12999,
    cost: 7000,
    sale: 10789,
    discount: 17,
    stock: 20,
    sellerId: 2,
    seller: getSellerById(2),
    colors: ['#000000', '#800020', '#4B0082'],
    sizes: ['36', '38', '40', '42', '44'],
    specifications: {
      'Material': 'Genuine Leather',
      'Care Instructions': 'Wipe with damp cloth',
      'Heel Height': '4 inches',
      'Style': 'Classic Stiletto',
      'Insole': 'Cushioned'
    },
    reviews: [
      {
        id: 1,
        author: 'Jessica Brown',
        rating: 4.7,
        comment: 'Beautiful and comfortable!',
        date: '2024-02-03',
        verified: true,
      },
    ],
  },
  // Tops
  {
    id: 8,
    title: 'Silk Blouse',
    price: 69.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    description: 'A luxurious silk blouse with a delicate floral pattern, perfect for both professional and casual settings. Features a classic fit with a button-down front and elegant detailing.',
    category: 'Tops',
    subcategory: 'Blouses',
    stock: 10,
    sellerId: 2,
    seller: getSellerById(2),
  },
  {
    id: 9,
    title: 'Graphic T-Shirt',
    price: 29.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=60',
    description: 'A trendy graphic t-shirt featuring a unique design, made from soft and comfortable cotton. Perfect for casual wear and expressing your personal style.',
    category: 'Tops',
    subcategory: 'T-Shirts',
    stock: 15,
    sellerId: 2,
    seller: getSellerById(2),
  },
  // Bottoms
  {
    id: 10,
    title: 'High-Waist Jeans',
    price: 79.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
    description: 'Classic high-waist jeans with a perfect fit, made from premium denim. Features a flattering silhouette and comfortable stretch for all-day wear.',
    category: 'Bottoms',
    subcategory: 'Jeans',
    stock: 10,
    sellerId: 2,
    seller: getSellerById(2),
  },
  {
    id: 11,
    title: 'A-Line Skirt',
    price: 59.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=60',
    description: 'A flattering A-line skirt in versatile black, perfect for both casual and formal occasions. Features a comfortable fit and a classic silhouette that never goes out of style.',
    category: 'Bottoms',
    subcategory: 'Skirts',
    stock: 10,
    sellerId: 2,
    seller: getSellerById(2),
  },
  // Outerwear
  {
    id: 12,
    title: 'Leather Jacket',
    price: 199.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
    description: 'A classic leather jacket with a modern fit, made from genuine leather. Features a timeless design with a comfortable lining and multiple pockets for functionality.',
    category: 'Outerwear',
    subcategory: 'Jackets',
    stock: 10,
    sellerId: 2,
    seller: getSellerById(2),
  },
  {
    id: 13,
    title: 'Wool Coat',
    price: 249.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    description: 'A warm and stylish wool coat perfect for winter. Features a classic design with a comfortable lining and multiple pockets for functionality.',
    category: 'Outerwear',
    subcategory: 'Coats',
    stock: 10,
    sellerId: 2,
    seller: getSellerById(2),
  },
  // More Dresses
  {
    id: 14,
    title: 'Wrap Dress',
    price: 89.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
    description: 'A flattering wrap dress with an adjustable fit, perfect for both casual and formal occasions. Features a comfortable silhouette and elegant detailing.',
    category: 'Dresses',
    subcategory: 'Casual Dresses',
    stock: 15,
    sellerId: 2,
    seller: getSellerById(2),
  },
  // More Accessories
  {
    id: 15,
    title: 'Silk Scarf',
    price: 1999,
    images: [
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    ],
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'An elegant silk scarf with a beautiful floral pattern, perfect for adding a touch of sophistication to any outfit. Made from pure silk with a soft and luxurious feel.',
    category: 'Accessories',
    subcategory: 'Scarves',
    stock: 20,
    sellerId: 1,
    seller: getSellerById(1),
    colors: ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'],
    specifications: {
      'Material': 'Pure Silk',
      'Dimensions': '180cm x 45cm',
      'Care Instructions': 'Dry clean only',
      'Pattern': 'Floral',
    },
    reviews: [
      {
        id: 1,
        author: 'Sophie Anderson',
        rating: 5,
        comment: 'Beautiful scarf, excellent quality!',
        date: '2024-01-28',
        verified: true,
      },
    ],
  },
  {
    id: 16,
    title: 'Designer Handbag',
    price: 399.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
    description: 'A luxury designer handbag with gold hardware, made from premium materials. Features multiple compartments for organization and a timeless design that never goes out of style.',
    category: 'Accessories',
    subcategory: 'Bags',
    stock: 12,
    sellerId: 2,
    seller: getSellerById(2),
  },
  // More Tops
  {
    id: 17,
    title: 'Cashmere Sweater',
    price: 159.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    description: 'A soft and warm cashmere sweater, perfect for cold weather. Features a comfortable fit and a classic design that pairs well with any outfit.',
    category: 'Tops',
    subcategory: 'Sweaters',
    stock: 15,
    sellerId: 2,
    seller: getSellerById(2),
  },
  // More Bottoms
  {
    id: 18,
    title: 'Linen Pants',
    price: 89.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
    description: 'Comfortable linen pants perfect for summer, featuring a relaxed fit and breathable fabric. Ideal for casual outings and warm weather.',
    category: 'Bottoms',
    subcategory: 'Pants',
    stock: 10,
    sellerId: 2,
    seller: getSellerById(2),
  },
  // More Outerwear
  {
    id: 19,
    title: 'Blazer',
    price: 129.99 * 83,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
    description: 'A classic blazer perfect for business casual settings, featuring a tailored fit and premium materials. Versatile enough to pair with both formal and casual outfits.',
    category: 'Outerwear',
    subcategory: 'Blazers',
    stock: 10,
    sellerId: 2,
    seller: getSellerById(2),
  },
  {
    id: 20,
    title: 'Cardigan',
    subcategory: 'Sweaters',
    category: 'Knitwear',
    images: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ],
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'A comfortable wool blend cardigan with a button-up front, perfect for layering. Features a relaxed fit and solid pattern, ideal for casual wear.',
    price: 7999,
    cost: 4000,
    sale: 6639,
    discount: 17,
    stock: 25,
    sellerId: 2,
    seller: getSellerById(2),
    colors: ['#A52A2A', '#808080', '#8B4513'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    specifications: {
      'Material': 'Wool Blend',
      'Care Instructions': 'Dry clean recommended',
      'Style': 'Button-up',
      'Fit': 'Relaxed',
      'Pattern': 'Solid'
    },
    reviews: [
      {
        id: 1,
        author: 'David Lee',
        rating: 4.6,
        comment: 'Perfect for chilly days!',
        date: '2024-01-25',
        verified: true,
      },
    ],
  },
];

const ProductCard = ({ product, onAddToCart }) => {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleProductClick = () => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isDarkMode 
            ? '0 8px 24px rgba(0,0,0,0.3)' 
            : '0 8px 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: '100%',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        onClick={handleProductClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {product.discount && (
          <Chip
            label={`${product.discount}% OFF`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 600,
              bgcolor: 'rgba(255,0,0,0.85)',
              color: '#fff',
              backdropFilter: 'blur(4px)',
              '& .MuiChip-label': {
                padding: '0 8px',
              }
            }}
          />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              letterSpacing: 0.2,
              lineHeight: 1.3,
            }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.4,
            }}
          >
            {product.description}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Rating
            value={product.rating || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              '& .MuiRating-iconFilled': {
                color: isDarkMode ? '#FFD700' : '#FFB400',
              }
            }}
          />
          <Typography variant="body2" color="text.secondary">
            ({product.reviews?.length || 0})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: isDarkMode ? '#fff' : '#000',
              letterSpacing: 0.3,
            }}
          >
            ₹{product.price.toLocaleString('en-IN')}
          </Typography>
          {product.sale && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </Typography>
          )}
          {product.discount && (
            <Typography
              variant="body2"
              sx={{ 
                color: isDarkMode ? '#FF6B6B' : '#D32F2F',
                fontWeight: 600,
                ml: 'auto'
              }}
            >
              Save {product.discount}%
            </Typography>
          )}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          mb: 2,
          p: 1,
          borderRadius: 1,
          bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
        }}>
          <Avatar
            src={product.seller?.profilePhoto}
            sx={{ width: 24, height: 24 }}
          />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {product.seller?.name || 'Unknown Seller'}
          </Typography>
          {product.seller?.verified && (
            <VerifiedIcon 
              sx={{ 
                fontSize: 16, 
                color: isDarkMode ? '#4FC3F7' : '#2196F3',
                ml: 0.5
              }} 
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {product.colors?.map((color, index) => (
            <Box
              key={index}
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: color,
                border: '1px solid rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }
              }}
            />
          ))}
          {product.sizes?.map((size, index) => (
            <Chip
              key={index}
              label={size}
              size="small"
              sx={{
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                color: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                fontWeight: 500,
                '&:hover': {
                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                },
              }}
            />
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          <AddToCartButton
            product={product}
            onAddToCart={onAddToCart}
            sx={{
              width: '100%',
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              letterSpacing: 0.5,
              boxShadow: 'none',
              background: isDarkMode 
                ? 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.15) 100%)' 
                : 'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.08) 100%)',
              color: isDarkMode ? '#fff' : '#000',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
                background: isDarkMode 
                ? 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.2) 100%)' 
                : 'linear-gradient(90deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 100%)',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const { cart, addToCart, decrementQuantity, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const itemsPerPage = 12;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleProductClick = (product) => {
    const seller = getSellerById(product.sellerId);
    const completeProduct = {
      ...product,
      seller: seller,
      images: product.images || [product.image],
    };
    navigate(`/products/${product.id}`, { state: { product: completeProduct } });
  };

  const handleSellerClick = (e, sellerId) => {
    e.stopPropagation();
    navigate(`/seller/${sellerId}`);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    setSnackbar({ open: true, message: 'Item added to cart', severity: 'success' });
  };

  const handleDecrementQuantity = (productId) => {
    decrementQuantity(productId);
    setSnackbar({ open: true, message: 'Item quantity updated', severity: 'success' });
  };

  const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity);
    setSnackbar({ open: true, message: 'Item quantity updated', severity: 'success' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <FloatingHomeButton />
      
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Search products"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory('');
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {Object.keys(categories).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedCategory && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={selectedSubcategory}
              label="Subcategory"
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <MenuItem value="">All Subcategories</MenuItem>
              {categories[selectedCategory].map((subcategory) => (
                <MenuItem key={subcategory} value={subcategory}>
                  {subcategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      <Grid container spacing={4}>
        {paginatedProducts.map((product) => {
          const seller = getSellerById(product.sellerId);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
              />
            </Grid>
          );
        })}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size="large"
            />
          </Stack>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Products; 