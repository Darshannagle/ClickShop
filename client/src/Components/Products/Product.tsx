import "../../index.scss";
import {
  Box,
  Card,
  Grid,
  Typography,
  CardMedia,
  Button,
  CardActions,
} from "@mui/material";
import React from "react";
import OutlinedButton from "../Button/OutlinedButton";

const Product = (props) => {
  const { product } = props;
  console.log("product: ", product);

  return (
    <Grid
      // border={"1px solid red"}
      key={product?.id}
      p={1}
      size={{ xs: 12, sm: 3, md: 3, lg: 2, xl: 2 }}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Card sx={{ width: "100%", p: 1 }} elevation={3}>
        <CardMedia
          title={product?.name}
          image={product?.images && product?.images[0]}
        />
        <Box
          component={"img"}
          src={product?.images}
          sx={{ width: "50%", height: "auto" }}
        ></Box>
        <Typography variant="body1" fontWeight={900}>
          {product?.name}
        </Typography>
        <Typography variant="body2" fontWeight={700}>
          ${product?.salePrice}
        </Typography>
        {/* <s>${product?.basePrice}</s> */}
        <CardActions>
          <OutlinedButton fullWidth>Buy Now</OutlinedButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
