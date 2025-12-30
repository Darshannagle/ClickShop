import { Box, Grid } from "@mui/material";
// import React from "react";
import Product from "./Product";

const Products = ({ products = [] }) => {
  return (
    <Box>
      <Grid container margin={"1vw"} width={"100%"} spacing={{ xs: 1, sm: 1, md:1,}}>
        {(products || []).map((product: any) => {
          return <Product product={product} />;
        })}
      </Grid>
    </Box>
  );
};

export default Products;
