import React, { useState } from 'react';
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
  useTheme,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import Rating from '@mui/material/Rating';

const categories = {
  'Dresses': ['Summer Dresses', 'Evening Dresses', 'Casual Dresses', 'Formal Dresses'],
  'Accessories': ['Jewelry', 'Bags', 'Shoes', 'Belts', 'Scarves'],
  'Tops': ['Blouses', 'T-Shirts', 'Sweaters', 'Tank Tops'],
  'Bottoms': ['Jeans', 'Skirts', 'Shorts', 'Pants'],
  'Outerwear': ['Jackets', 'Coats', 'Blazers', 'Cardigans'],
};

export const products = [
  // Jane's Products (Fashion Boutique)
  {
    id: 1,
    title: 'Floral Summer Dress',
    price: 89.99 * 83,
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
    description: 'Beautiful floral print summer dress perfect for warm days',
    category: 'Dresses',
    subcategory: 'Summer Dresses',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 2,
    title: 'Elegant Evening Gown',
    price: 199.99 * 83,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=60',
    description: 'Stunning evening gown for special occasions',
    category: 'Dresses',
    subcategory: 'Evening Dresses',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 3,
    title: 'Casual Maxi Dress',
    price: 79.99* 83 ,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60',
    description: 'Comfortable and stylish maxi dress for everyday wear',
    category: 'Dresses',
    subcategory: 'Casual Dresses',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 4,
    title: 'Cocktail Dress',
    price: 129.9* 83,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60',
    description: 'Perfect cocktail dress for parties and special events',
    category: 'Dresses',
    subcategory: 'Formal Dresses',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  // Tim's Products (Luxury Accessories)
  {
    id: 5,
    title: 'Gold Necklace Set',
    price: 49.99 * 83,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60',
    description: 'Elegant gold necklace set with matching earrings',
    category: 'Accessories',
    subcategory: 'Jewelry',
    seller: {
      id: 3,
      name: 'Tim David',
      profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
      rating: 4.9,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 6,
    title: 'Leather Crossbody Bag',
    price: 89.99 * 83,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
    description: 'Classic leather crossbody bag with adjustable strap',
    category: 'Accessories',
    subcategory: 'Bags',
    seller: {
      id: 3,
      name: 'Tim David',
      profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
      rating: 4.9,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 7,
    title: 'Stiletto Heels',
    price: 129.99 * 83,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=60',
    description: 'Elegant black stiletto heels for formal occasions',
    category: 'Accessories',
    subcategory: 'Shoes',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  // Tops
  {
    id: 8,
    title: 'Silk Blouse',
    price: 69.99 * 83,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    description: 'Luxurious silk blouse with delicate floral pattern',
    category: 'Tops',
    subcategory: 'Blouses',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 9,
    title: 'Graphic T-Shirt',
    price: 29.99 * 83,
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&auto=format&fit=crop&q=60',
    description: 'Trendy graphic t-shirt with unique design',
    category: 'Tops',
    subcategory: 'T-Shirts',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  // Bottoms
  {
    id: 10,
    title: 'High-Waist Jeans',
    price: 79.99 * 83,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
    description: 'Classic high-waist jeans with perfect fit',
    category: 'Bottoms',
    subcategory: 'Jeans',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 11,
    title: 'A-Line Skirt',
    price: 59.99 * 83,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=60',
    description: 'Flattering A-line skirt in versatile black',
    category: 'Bottoms',
    subcategory: 'Skirts',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  // Outerwear
  {
    id: 12,
    title: 'Leather Jacket',
    price: 199.99 * 83,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
    description: 'Classic leather jacket with modern fit',
    category: 'Outerwear',
    subcategory: 'Jackets',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 13,
    title: 'Wool Coat',
    price: 249.99* 83 ,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    description: 'Warm and stylish wool coat for winter',
    category: 'Outerwear',
    subcategory: 'Coats',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  // More Dresses
  {
    id: 14,
    title: 'Wrap Dress',
    price: 89.99 * 83,
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop&q=60',
    description: 'Flattering wrap dress with adjustable fit',
    category: 'Dresses',
    subcategory: 'Casual Dresses',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  // More Accessories
  {
    id: 15,
    title: 'Diamond Earrings',
    price: 299.99 * 83,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60',
    description: 'Classic diamond stud earrings',
    category: 'Accessories',
    subcategory: 'Jewelry',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 16,
    title: 'Designer Handbag',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
    description: 'Luxury designer handbag with gold hardware',
    category: 'Accessories',
    subcategory: 'Bags',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  // More Tops
  {
    id: 17,
    title: 'Cashmere Sweater',
    price: 159.99 * 83,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    description: 'Soft and warm cashmere sweater',
    category: 'Tops',
    subcategory: 'Sweaters',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  // More Bottoms
  {
    id: 18,
    title: 'Linen Pants',
    price: 89.99 * 83,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
    description: 'Comfortable linen pants for summer',
    category: 'Bottoms',
    subcategory: 'Pants',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  // More Outerwear
  {
    id: 19,
    title: 'Blazer',
    price: 129.99 * 83,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
    description: 'Classic blazer for business casual',
    category: 'Outerwear',
    subcategory: 'Blazers',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
  {
    id: 20,
    title: 'Cardigan',
    price: 79.99 * 83 ,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
    description: 'Cozy cardigan for everyday wear',
    category: 'Outerwear',
    subcategory: 'Cardigans',
    seller: {
      id: 2,
      name: 'Jane Seller',
      profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
      rating: 4.8,
      verified: true,
      businessDetails: {
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
        shipping: 'Pan India Delivery'
      }
    },
  },
];

function Products() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
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

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleSellerClick = (e, sellerId) => {
    e.stopPropagation();
    navigate(`/seller/${sellerId}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbar({
      open: true,
      message: `${product.title} added to cart`,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 4 }}>
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

      <Grid container spacing={3}>
        {paginatedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                border: '1px solid transparent',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                  border: '1px solid #000',
                },
              }}
              onClick={() => handleProductClick(product.id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={(e) => handleSellerClick(e, product.seller.id)}
                >
                  <Avatar
                    src={product.seller.profilePhoto}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {product.seller.name}
                      </Typography>
                      {product.seller.verified && (
                        <VerifiedIcon sx={{ fontSize: 16, color: '#000' }} />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Rating value={product.seller.rating} readOnly size="small" precision={0.1} />
                      <Typography variant="caption" color="text.secondary">
                        ({product.seller.rating})
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {product.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {product.category} • {product.subcategory}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: '#000',
                  }}
                  gutterBottom
                >
                  ₹{product.price.toLocaleString('en-IN')}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    sx={{
                      color: '#000',
                      '&:hover': {
                        background: 'rgba(0,0,0,0.05)',
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
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
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Products; 