import { Alert, Box, Grid } from "@mui/material";
// import React from "react";
import Product from "./Product";

const Products = ({ products = [] }) => {
  return (
    <Box display={"grid"}>
      <Grid
        container
        padding={"10px"}
        width={"100%"}
        spacing={{ xs: 1, sm: 2, md: 1, lg: 5, xl: 1 }}
      >
        {Array.isArray(products) && products?.length > 0 ? (
          products.map((product: any) => {
            return <Product key={product?.id} product={product} />;
          })
        ) : (
          <Grid size={12}>
            <Alert
              severity="info"
              sx={{ margin: " 10px auto", textAlign: "center", width: 200 }}
            >
              No products found
            </Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Products;
