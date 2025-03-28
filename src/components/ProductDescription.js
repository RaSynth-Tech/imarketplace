import React from 'react';
import { Typography, Box } from '@mui/material';

function ProductDescription({ description }) {
  // Split the description into paragraphs
  const paragraphs = description.split('\n\n');

  return (
    <Box>
      {paragraphs.map((paragraph, index) => {
        // Check if the paragraph is a list
        if (paragraph.startsWith('-')) {
          const items = paragraph.split('\n');
          return (
            <Box key={index} sx={{ mb: 2 }}>
              {items.map((item, itemIndex) => (
                <Typography
                  key={itemIndex}
                  variant="body1"
                  component="div"
                  sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}
                >
                  <Typography
                    component="span"
                    sx={{ mr: 1, color: 'primary.main' }}
                  >
                    •
                  </Typography>
                  {item.replace('-', '').trim()}
                </Typography>
              ))}
            </Box>
          );
        }

        return (
          <Typography key={index} variant="body1" paragraph>
            {paragraph}
          </Typography>
        );
      })}
    </Box>
  );
}

export default ProductDescription; 