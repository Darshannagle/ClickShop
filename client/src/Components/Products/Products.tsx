import { Alert, Grid } from "@mui/material";
// import React from "react";
import Product from "./Product";

const Products = ({ products = [] }) => {
  return (
    // <Box
    //   width={"100%"}
    //   margin={0}
    //   p={0}
    //   display={"flex"}
    //   flexDirection={{ xs: "column", sm: "row" }}
    //   flexWrap={"wrap"}
    // >
    <Grid
      container
      width={"100%"}
      marginY={1}
      spacing={3}

      // spacing={{ xs: 1, sm: 0, md: 1, lg: 0, xl: 1 }}
      // columns={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
    >
      {Array.isArray(products) && products?.length > 0 ? (
        products.map((product: any) => {
          return <Product key={product?.id} product={product} />;
        })
      ) : (
        <Grid size={12}>
          <Alert
            variant="filled"
            severity="warning"
            sx={{ margin: " 10px auto", textAlign: "center", width: 200 }}
          >
            No products found
          </Alert>
        </Grid>
      )}
    </Grid>
    // </Box>
  );
};

export default Products;
