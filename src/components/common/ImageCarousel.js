import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Paper,
  useTheme,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

function ImageCarousel({ images, autoSlide = true, interval = 3000, showThumbnails = true }) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoSlide) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoSlide, interval, images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Main Image */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          overflow: 'hidden',
          borderRadius: 2,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <Box
          component="img"
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
        {images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
      </Paper>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mt: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(0,0,0,0.2)',
              borderRadius: 3,
            },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                width: 60,
                height: 60,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: currentIndex === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                opacity: currentIndex === index ? 1 : 0.7,
                transition: 'all 0.2s',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <Box
                component="img"
                src={image}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ImageCarousel; 