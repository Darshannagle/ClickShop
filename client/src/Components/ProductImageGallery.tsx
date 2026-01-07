import { Box } from "@mui/material";
import { useState } from "react";

const ProductImageGallery = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  if (!images.length) return null;

  return (
    <Box
      display="flex"
      gap={2}
      flexDirection={{ xs: "column-reverse", sm: "row" }}
    >
      {/* Thumbnails */}
      <Box display="flex" flexDirection={{ xs: "row", sm: "column" }} gap={1}>
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt="thumbnail"
            onMouseEnter={() => setActiveImage(img)}
            onClick={() => setActiveImage(img)}
            sx={{
              width: 60,
              height: 60,
              objectFit: "cover",
              border:
                activeImage === img ? "2px solid #f08804" : "1px solid #ddd",
              cursor: "pointer",
              borderRadius: 1,
            }}
          />
        ))}
      </Box>

      {/* Main Image */}
      <Box
        component="img"
        src={activeImage}
        alt="product"
        sx={{
          width: "100%",
          maxWidth: 420,
          height: 420,
          objectFit: "contain",
          border: "1px solid #eee",
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default ProductImageGallery;
