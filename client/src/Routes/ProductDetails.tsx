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
  IconButton,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import { getAPIData } from "../helper/apiHelper";
import { endPoint } from "../config/siteConfig";
import toast from "react-hot-toast";
import ProductImageGallery from "../Components/ProductImageGallery";
import {
  Add,
  Remove,
  LocalOfferOutlined,
  AddShoppingCart,
} from "@mui/icons-material";

const ProductDetails = ({ isCart = false }) => {
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

      if (res?.code === "0000") {
        setProduct(res.data);
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
        productId: product.id,
        quantity: quantity, // FIX: Used the state variable instead of hardcoded 1
        soldPrice: product.salePrice,
      };

      const cartReponse = await getAPIData(
        endPoint.cartItem.create,
        payload,
        "POST",
      );

      if (cartReponse.code === "0000") {
        toast.success(`${quantity} item(s) added to cart`);
        fetchProduct(); // Refresh product data if needed
      } else {
        toast.error(cartReponse?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  // Helper to calculate discount percentage
  const calculateDiscount = () => {
    if (product?.basePrice > product?.salePrice) {
      const diff = product.basePrice - product.salePrice;
      const percent = Math.round((diff / product.basePrice) * 100);
      return percent;
    }
    return 0;
  };

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Alert severity="warning" variant="filled">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!product) return null;

  const discount = calculateDiscount();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={6}>
        {/* LEFT: Image Gallery */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              // borderRadius: 4,
              overflow: "hidden",
              // border: "1px solid",
              // borderColor: "divider",
            }}
          >
            <ProductImageGallery images={product.images} />
          </Paper>
        </Grid>

        {/* RIGHT: Product Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            {/* Header Section */}
            <Box>
              {discount > 0 && (
                <Chip
                  icon={<LocalOfferOutlined sx={{ fontSize: 16 }} />}
                  label={`${discount}% OFF`}
                  color="error"
                  size="small"
                  sx={{ mb: 1, fontWeight: "bold" }}
                />
              )}
              <Typography
                variant="h5"
                fontWeight={200}
                gutterBottom
                textAlign={"left"}
                sx={{ lineHeight: 1.2 }}
              >
                {product.name}
              </Typography>
            </Box>

            {/* Price Card */}
            <Card
              variant="outlined"
              sx={{
                bgcolor: "grey.50",
                border: "1px dashed",
                borderColor: "primary.light",
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="baseline" spacing={1.5}>
                  <Typography variant="h6" color="textPrimary" fontWeight={500}>
                    ${product.salePrice}
                  </Typography>
                  {product.basePrice > product.salePrice && (
                    <Typography
                      variant="h6"
                      color="text.disabled"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ${product.basePrice}
                    </Typography>
                  )}
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Inclusive of all taxes
                </Typography>
              </CardContent>
            </Card>

            {/* Specifications Table */}
            <Box>
              <Typography variant="subtitle1" fontWeight={700} mb={1.5}>
                Specifications
              </Typography>
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ borderRadius: 2, overflow: "hidden" }}
              >
                <Table size="small">
                  <TableBody>
                    {Object.entries(product.specifications).map(
                      ([key, value], index) => (
                        <TableRow
                          key={key}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            backgroundColor:
                              index % 2 === 0 ? "white" : "action.hover",
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              fontWeight: 600,
                              width: "40%",
                              color: "text.secondary",
                            }}
                          >
                            {key}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>
                            {value as any}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Divider />

            {/* Action Section (Cart Logic) */}
            <Box>
              {isCart ? (
                // View when inside Cart
                <Paper
                  variant="outlined"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    p: 0.5,
                    borderRadius: 2,
                  }}
                >
                  <IconButton
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    size="small"
                  >
                    <Remove />
                  </IconButton>
                  <Typography
                    sx={{ width: 40, textAlign: "center", fontWeight: "bold" }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    onClick={() => setQuantity((prev) => prev + 1)}
                    size="small"
                  >
                    <Add />
                  </IconButton>
                </Paper>
              ) : (
                // Default View: Quantity Selector + Add Button
                <Stack direction="row" spacing={2} alignItems="center">
                  <Paper
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 2,
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      disabled={quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography
                      sx={{
                        width: 40,
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {quantity}
                    </Typography>
                    <IconButton onClick={() => setQuantity((prev) => prev + 1)}>
                      <Add />
                    </IconButton>
                  </Paper>

                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    startIcon={<AddShoppingCart />}
                    onClick={addToCart}
                    sx={{
                      textTransform: "none",
                      // py: 1,
                      backgroundColor: "var(--secondary-color)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      boxShadow: "0 4px 14px rgba(25, 118, 210, 0.3)",
                    }}
                  >
                    Add to Cart
                  </Button>
                </Stack>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* DESCRIPTION SECTION */}
      <Box sx={{ mt: 6 }}>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Description
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.7, whiteSpace: "pre-line" }}
          >
            {product.description}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetails;
