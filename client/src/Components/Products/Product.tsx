import "../../index.scss";
import {
  Box,
  Card,
  Grid,
  Typography,
  CardMedia,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContainedButton from "../Button/ContainedButton";

const Product = (props) => {
  const { product } = props;
  const naviate = useNavigate();
  return (
    <Grid
      // border={"1px solid red"}
      key={product?.id}
      p={2}
      // border={"1px solid red"}
      height={"max-width"}
      size={{ xs: 6, sm: 4, md: 4, lg: 3, xl: 2 }}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Card
        onClick={() => naviate(`/product/${product?.id}`)}
        sx={{
          width: "100%",
          height: "100%",
          p: 1,
          cursor: "pointer",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
        elevation={3}
      >
        <CardMedia
          title={product?.name}
          image={product?.images && product?.images[0]}
        />
        <Box
          component={"img"}
          src={product?.images}
          sx={{ width: "50%", height: "auto" }}
        ></Box>
        <Typography variant="body1" fontWeight={100} textOverflow={"clip"}>
          {product?.name}
        </Typography>
        <Typography variant="body2" fontWeight={700}>
          ${product?.salePrice}
        </Typography>
        {/* <s>${product?.basePrice}</s> */}
        <CardActions>
          <ContainedButton href={`/product/${product?.id}`} fullWidth>
            Buy Now
          </ContainedButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
