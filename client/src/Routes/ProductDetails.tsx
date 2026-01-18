import {
  Alert,
  Box,
  Grid,
  Container,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  Stack,
  Divider,
  Button,
  ButtonGroup,
  TextField,
  // ButtonGroup,
  // Button,
  // TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { getAPIData } from "../helpers/apiHelper";
import { endPoint } from "../config/siteConfig";
import toast from "react-hot-toast";
import ProductImageGallery from "../Components/ProductImageGallery";
import OutlinedButton from "../Components/Button/OutlinedButton";

const ProductDetails = ({ isCart = false }: any) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { showLoader, hideLoader } = useLoader();
  const { productId } = useParams();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      showLoader();
      const res = await getAPIData(
        endPoint.product.details,
        { id: productId },
        "GET",
      );

      if (res?.status) {
        console.log("res.data: ", res.data);
        setProduct(
          // {...
          res.data,
          // specifications: JSON.parse(res.data.specifications),
          // }
        );
      } else {
        throw new Error(res?.message);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  const addToCart = async () => {
    try {
      const payload = {
        product_id: product.id,
        quantity: 1,
        soldPrice: product.salePrice,
      };
      const cartReponse = await getAPIData(
        endPoint.cartItem.create,
        payload,
        "POST",
      );
      if (cartReponse.status) {
        toast.success("Product added to cart successfully");
        // setQuantity(1);
        fetchProduct();
      } else {
        toast.error(cartReponse?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  if (error) {
    return (
      <Box maxWidth={500} mx="auto" mt={6}>
        <Alert severity="warning">{error}</Alert>
      </Box>
    );
  }

  if (!product) return null;

  return (
    <Box maxWidth="xl" mx="auto" mt={4}>
      <Grid container spacing={4}>
        {/* LEFT */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductImageGallery images={product.images} />
        </Grid>

        {/* RIGHT */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Container maxWidth={false}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              {product.name}
            </Typography>

            {/* PRICE */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h5" color="primary" fontWeight={600}>
                ${product.salePrice}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ${product.basePrice}
              </Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* SPECIFICATIONS */}
            <Typography variant="h6" mb={1}>
              Specifications
            </Typography>

            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableBody>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <TableRow key={key}>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            // backgroundColor: "grey.100",
                            // width: "40%",
                          }}
                        >
                          {key}
                        </TableCell>
                        <TableCell>{value as string}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 3 }} />
          </Container>{" "}
          {isCart ? (
            <ButtonGroup
              variant="outlined"
              color="inherit"
              aria-label=""
              sx={{ visibility: isCart ? "visible" : "none" }}
            >
              <Button
                onClick={() => {
                  setQuantity((prev) => {
                    prev = prev > 1 ? --prev : 1;
                    return prev;
                  });
                }}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <TextField
                id=""
                label=""
                value={quantity > 0 ? quantity : 1}
                size="small"
                type="number"
                sx={{ width: "50px" }}
                onChange={(e: any) =>
                  setQuantity(Number(e.target.value ?? quantity))
                }
              />
              <Button
                onClick={() => {
                  setQuantity((prev) => ++prev);
                }}
              >
                +
              </Button>
            </ButtonGroup>
          ) : (
            <OutlinedButton
              width={"80%"}
              m={5}
              fontSize={"25px"}
              onClick={addToCart}
              visibility={isCart ? "hidden" : "visible"}
            >
              Add to Cart
            </OutlinedButton>
          )}
        </Grid>
      </Grid>
      {/* DESCRIPTION */}
      <Container maxWidth="xl">
        <Typography variant="h6" gutterBottom sx={{ my: 2 }}>
          Description
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign={"justify"}
        >
          {product.description}
        </Typography>
      </Container>
    </Box>
  );
};

export default ProductDetails;
