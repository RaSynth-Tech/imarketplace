import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ZoomIn as ZoomInIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../../App';

function ImageCarousel({ images, autoSlide = true, interval = 3000, showThumbnails = true, sx }) {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!autoSlide || isHovering) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoSlide, interval, images.length, isHovering]);

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      ...sx
    }}>
      {/* Main Image */}
      <Box
        className="carousel-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        sx={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 2,
          bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: isDarkMode 
              ? '0 8px 16px rgba(0,0,0,0.3)' 
              : '0 8px 16px rgba(0,0,0,0.1)',
          }
        }}
      >
        <Box
          className="carousel-slide"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Box
            component="img"
            className="carousel-image"
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.3s ease',
            }}
          />
          
          {/* Image counter */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
              color: isDarkMode ? '#fff' : '#000',
              px: 1.5,
              py: 0.5,
              borderRadius: 10,
              fontSize: '0.75rem',
              fontWeight: 500,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 3,
              opacity: isHovering ? 1 : 0.7,
              transition: 'opacity 0.2s ease',
            }}
          >
            <Typography variant="caption" fontWeight={600}>
              {currentIndex + 1}/{images.length}
            </Typography>
          </Box>
          
          {/* Zoom icon */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
              color: isDarkMode ? '#fff' : '#000',
              width: 36,
              height: 36,
              zIndex: 3,
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              '&:hover': {
                bgcolor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                transform: 'scale(1.1)',
              }
            }}
          >
            <ZoomInIcon fontSize="small" />
          </IconButton>
        </Box>

        {images.length > 1 && (
          <Box className="carousel-controls">
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
                color: isDarkMode ? '#fff' : '#000',
                width: 40,
                height: 40,
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                opacity: isHovering ? 1 : 0.5,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  bgcolor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-50%) scale(1.1)',
                  opacity: 1,
                },
                zIndex: 2,
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
                color: isDarkMode ? '#fff' : '#000',
                width: 40,
                height: 40,
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                opacity: isHovering ? 1 : 0.5,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  bgcolor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-50%) scale(1.1)',
                  opacity: 1,
                },
                zIndex: 2,
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <Box
          className="carousel-thumbnails"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              borderRadius: 3,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              borderRadius: 3,
              '&:hover': {
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
              }
            },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                width: 70,
                height: 70,
                flexShrink: 0,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: currentIndex === index 
                  ? `2px solid ${isDarkMode ? '#fff' : '#000'}` 
                  : `2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                opacity: currentIndex === index ? 1 : 0.7,
                transition: 'all 0.2s ease',
                '&:hover': {
                  opacity: 1,
                  transform: 'translateY(-2px)',
                  boxShadow: isDarkMode 
                    ? '0 4px 8px rgba(0,0,0,0.3)' 
                    : '0 4px 8px rgba(0,0,0,0.1)',
                },
                '&.active': {
                  borderColor: isDarkMode ? '#fff' : '#000',
                }
              }}
              className={currentIndex === index ? 'active' : ''}
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