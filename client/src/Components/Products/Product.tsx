import "../../index.scss";
import {
  Box,
  Card,
  Grid,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContainedButton from "../Button/ContainedButton";
import Constant from "@/config/Constant";

const Product = (props) => {
  const { product } = props;
  const naviate = useNavigate();
  return (
    <Grid
      key={product?.id}
      // m={"10px 5px"}
      height={"max-width"}
      border={"1px solid #ddd"}
      borderRadius={"5px"}
      size={{ xs: 12, sm: 6, md: 12, lg: 6, xl: 6 }}
    >
      <Card
        onClick={() => naviate(`/product/${product?.id}`)}
        sx={{
          borderRadius: "5px",
          height: "100%",
          // width: "100%",
          gap: { md: 1 },
          px: 1,
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "center" },
          justifyContent: { xs: "stretch", md: "space-between" },
        }}
        elevation={1}
      >
        <Box
          component={"img"}
          src={product?.images}
          sx={{
            // border: 1,
            width: {
              xs: "75%",
              sm: "50%",
              md: "25%",
              lg: "10%",
            },
            height: "auto",
          }}
        />
        <CardContent
          sx={{
            // border: 1,
            my: { md: "10px", xs: "5px" },
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "start" },
            justifyContent: { xs: "start", md: "space-between", lg: "start" },
          }}
        >
          <Typography
            variant="body1"
            m={1}
            fontWeight={900}
            fontSize={"15px"}
            width={"100%"}
          >
            {product?.brand}
          </Typography>
          <Typography
            variant="body1"
            m={1}
            fontSize={"12px"}
            fontWeight={100}
            textOverflow={"clip"}
            width={"100%"}
          >
            {product?.name}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            m: "5px auto",
            position: "static",
            bottom: "25px",
            p: 1,
            // border: 1,
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: 1,
            alignItems: { xs: "center", md: "center" },
            justifyContent: { xs: "stretch", md: "space-between" },
          }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            fontSize="18px"
            width={"100%"}
          >
            {Constant.CURRENCY[Constant.PRIAMRY_CURRENCY].SYMBOL}
            {product?.salePrice}
          </Typography>
          {/* <s>${product?.basePrice}</s> */}
          <ContainedButton href={`/product/${product?.id}`} width={"80px"}>
            Buy Now
          </ContainedButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
