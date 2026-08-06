import { useCallback, useEffect, useState } from "react";
import { endPoint } from "@/config/siteConfig";
import { getAPIData } from "@/helper/apiHelper";
import {
  Alert,
  Box,
  Container,
  Typography,
  // useMediaQuery,
  // useTheme,
} from "@mui/material";
import Products from "@/Components/Products/Products";
import FilterSidebar from "@/Components/FilterSidebar";
import { useSearchParams } from "react-router-dom";

interface productPropType {
  products?: Array<any>;
  searchTerm?: string; // Changed from 'type' for clarity
  // categoryId?: string;
  // subcategoryId?: string;
}

const ProductsRoute = ({
  products: prods,
  searchTerm = "",
  // categoryId,
  // subcategoryId,
}: productPropType) => {
  const allSearchParams = useSearchParams();
  const searchParams = new URLSearchParams(allSearchParams[0]);
  console.log("searchParams: ", searchParams);
  const urlSearchTerm = searchParams.get("search") || "";
  console.log("urlSearchTerm: ", urlSearchTerm);
  const categoryId = searchParams.get("categoryId") || "";
  const subcategoryId = searchParams.get("subcategoryId") || "";
  const [categories, setCategories] = useState<any[] | null>(null);
  const [subCategories, setSubCategories] = useState<any[] | null>(null);
  const [products, setProducts] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Record<string, any>>({
    search: urlSearchTerm || "",
    categoryId: categoryId || "",
    subcategoryId: subcategoryId || "",
    minPrice: "",
    maxPrice: "",
    brand: "",
    sortBy: "name",
    sortOrder: "asc",
  });

  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchProducts = useCallback(
    async (currentFilters: Record<string, any>) => {
      try {
        setLoading(true);

        if (prods && Array.isArray(prods)) {
          setProducts(prods);
          return;
        }

        const url = endPoint.product.list;

        const queryparams: Record<string, any> = {
          page: 0,
          size: 10,
          filters: currentFilters,
        };

        // Remove empty values
        Object.keys(queryparams).forEach((key) => {
          if (
            queryparams[key] === "" ||
            queryparams[key] === null ||
            queryparams[key] === undefined
          ) {
            delete queryparams[key];
          }
        });

        const prodRes = await getAPIData(url, queryparams, "POST");

        if (prodRes?.code === "0000") {
          setProducts(prodRes?.data?.records || []);
        } else {
          setError(prodRes?.message || "Failed to load products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Something went wrong while loading products");
      } finally {
        setLoading(false);
      }
    },
    [prods],
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAPIData(endPoint.category.list, {}, "GET");
      if (response?.code === "0000") {
        setCategories(response?.data);
      } else {
        console.error("Error fetching categories:", response?.message);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  const fetchSubCategories = useCallback(async () => {
    try {
      const response = await getAPIData(
        endPoint.subcategory.listByCategory,
        { id: categoryId },
        "GET",
      );
      if (response?.code === "0000") {
        setSubCategories(response?.data);
      } else {
        console.error("Error fetching subcategories:", response?.message);
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  }, [categoryId]);

  // Refetch when searchTerm from App Bar changes or filters change
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  }, [searchTerm]);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, [fetchCategories, fetchSubCategories]);

  useEffect(() => {
    if (prods) {
      setProducts(prods);
    } else {
      fetchProducts(filters);
    }
  }, [filters, prods, fetchProducts]);

  const handleFilterChange = (newFilters: Partial<Record<string, any>>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      search: searchTerm,
      categoryId: categoryId || "",
      minPrice: "",
      maxPrice: "",
      brand: "",
      sortField: "name",
      direction: "asc",
    });
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="info"
          variant="outlined"
          sx={{ maxWidth: 500, mx: "auto" }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          // display: "grid",
          // gridTemplateColumns: {
          //   xs: "1fr",
          //   sm: "320px 1fr",
          //   lg: "360px 1fr",
          // },
          // gap: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        {/* Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
          categories={categories}
          subCategories={subCategories}

          // searchTerm={searchTerm}
        />

        {/* Main Products Area */}
        <Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // mb: 3,
              // flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              {searchTerm ? `Results for "${searchTerm}"` : "All Products"}
              {products && ` (${products.length})`}
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ textAlign: "center", py: 10 }}>Loading products...</Box>
          ) : products && products.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No products found
              </Typography>
            </Box>
          ) : (
            <Products products={products || []} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductsRoute;
