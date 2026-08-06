import React from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

interface FilterSidebarProps {
  filters: Record<string, any>;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  isMobile?: boolean;
  categories?: any[];
  subCategories?: any[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  categories,
  subCategories,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 3,
        bgcolor: "background.paper",
        height: "fit-content",
        top: 24,
        flex: 1,
        position: { xs: "static", sm: "sticky" },
        minWidth: 200,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Category Filter */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.categoryId || ""}
          label="Category"
          onChange={(e) => onFilterChange({ categoryId: e.target.value })}
        >
          <MenuItem value="">All Categories</MenuItem>
          {(categories || []).map((category) => (
            <MenuItem key={category?.id} value={category?.id}>
              {category?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Subcategory Filter */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Subcategory</InputLabel>
        <Select
          value={filters.subcategoryId || ""}
          label="Category"
          onChange={(e) => onFilterChange({ subcategoryId: e.target.value })}
        >
          <MenuItem value="">All Subcategories</MenuItem>
          {(subCategories || []).map((subCategory) => (
            <MenuItem key={subCategory?.id} value={subCategory?.id}>
              {subCategory?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range */}
      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
        Price Range
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          label="Min"
          type="number"
          value={filters.minPrice}
          onChange={(e) => onFilterChange({ minPrice: e.target.value })}
        />
        <TextField
          fullWidth
          size="small"
          label="Max"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
        />
      </Box>

      {/* Brand */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Brand</InputLabel>
        <Select
          value={filters.brand || ""}
          label="Brand"
          onChange={(e) => onFilterChange({ brand: e.target.value })}
        >
          <MenuItem value="">All Brands</MenuItem>
          {/* Populate dynamically */}
        </Select>
      </FormControl>

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        color="error"
        sx={{ textTransform: "none" }}
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;
