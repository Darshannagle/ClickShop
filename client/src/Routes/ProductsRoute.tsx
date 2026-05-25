import React, { useEffect, useState } from "react";
// import Product from "@/Components/Products/Product";
import { endPoint } from "@/config/siteConfig";
import { getAPIData } from "@/helpers/apiHelper";
import { Alert, Box, Container } from "@mui/material";
import Products from "@/Components/Products/Products";
interface productPropType {
  products?: Array<any>;
  type?: string;
  category?: string;
  categoryId?: string;
  subcategory?: string;
  subcategoryId?: string;
}
const ProductsRoute = ({ products: prods, type }: productPropType) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const fetchProducts = async () => {
    try {
      if (prods && Array.isArray(prods)) {
        setProducts(prods);
        return;
      }

      const url = endPoint.product.list;

      const queryparams: Record<string, any> = {
        page: 0,
        size: 10,
        sortField: "name",
        direction: "asc",
      };

      if (typeof type === "string") {
        queryparams.keyword = type;
      }

      const prodRes = await getAPIData(url, queryparams, "GET");

      if (prodRes?.status) {
        setProducts(prodRes.data?.content ?? []);
      } else {
        setError(prodRes?.message || "Failed to load products");
      }
    } catch (err) {
      console.log("error while fetching users : ", err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  if (error) {
    return (
      <Box sx={{ display: "grid" }}>
        <Alert
          severity="info"
          sx={{ margin: "10px auto", textAlign: "center", width: 200 }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!products) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 2fr" },
      }}
    >
      <Container maxWidth={"sm"} sx={{ border: "1px solid red" }}>
        1
      </Container>
      <Products products={products} />
    </Box>
  );
};

export default ProductsRoute;
