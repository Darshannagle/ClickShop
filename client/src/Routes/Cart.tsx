import {
  Card,
  Grid,
  Typography,
  Avatar,
  Box,
  Button,
  TextField,
  CardContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderContext";
import { getAPIData } from "../helper/apiHelper";
import { endPoint } from "../config/siteConfig";
import toast from "react-hot-toast";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState({ items: [], quantity: [] });
  const [totalDetails, setTotalDetails] = useState({
    subTotal: 0,
    estimatedTax: 0,
    estimatedShipping: 0,
    total: 0,
  });
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      showLoader();
      const res = await getAPIData(endPoint.cartItem.list, {}, "GET");
      if (res?.code === "0000") {
        setCart(res?.data?.records ?? []);
        setTotalDetails({
          subTotal: res?.data?.subTotal ?? 0,
          estimatedTax: res?.data?.estimatedTax ?? 0,
          estimatedShipping: res?.data?.estimatedShipping ?? 0,
          total: res?.data?.total ?? 0,
        });
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      //   setError(err.message);
      toast.error(error.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading((prev) => ({
        ...prev,
        items: [...prev.items, id],
      }));

      const res = await getAPIData(endPoint.cartItem.delete, { id }, "DELETE");

      if (res?.code === "0000") {
        toast.success("Item deleted successfully");
        fetchCart();
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading((prev) => ({
        ...prev,
        items: prev.items.filter((itemId) => itemId !== id),
      }));
    }
  };

  const setQuantity = async (id: string, quantity: number) => {
    try {
      setLoading((prev) => ({
        ...prev,
        quantity: [...prev.quantity, id],
      }));

      const res: any = await getAPIData(
        endPoint.cartItem.setQuantity,
        { id: id, quantity },
        "POST",
      );

      if (res?.code === "0000") {
        fetchCart();
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading((prev) => ({
        ...prev,
        quantity: prev.quantity.filter((qId) => qId !== id),
      }));
    }
  };

  // const handleCheckout = async () => {
  //   try {
  //     showLoader();
  //     const res = await getAPIData(
  //       endPoint.order.create,
  //       { cartItems: cart },
  //       "POST",
  //     );
  //     if (res?.code==="0000") {
  //       toast.success(res?.message);
  //       window.location.href = res?.data?.session?.url;
  //       // setCart(res?.data?.records ?? []);
  //       // setTotalDetails({
  //       //   subTotal: res?.data?.subTotal ?? 0,
  //       //   estimatedTax: res?.data?.estimatedTax ?? 0,
  //       //   estimatedShipping: res?.data?.estimatedShipping ?? 0,
  //       //   total: res?.data?.total ?? 0,
  //       // });
  //     } else {
  //       toast.error(res?.message || "Something went wrong");
  //     }
  //   } catch (error) {
  //     //   setError(err.message);
  //     toast.error(error.message || "Something went wrong");
  //   } finally {
  //     hideLoader();
  //   }
  // };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <Box>
      <Grid
        container
        spacing={1}
        m={2}
        direction="row"
        justifyContent="center"
        alignItems="start"
        alignContent="center"
        wrap="wrap"
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="h5" m={2}>
            Shopping Cart
          </Typography>
          {cart?.length ? (
            <Box display="flex" flexDirection="column" gap={2}>
              {cart?.map((item) => {
                const isDeleting = loading.items.includes(item.id);
                const isUpdatingQty = loading.quantity.includes(item.id);

                return (
                  <Card
                    key={item.id}
                    elevation={0}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "0.2s",
                      "&:hover": {
                        boxShadow: 3,
                      },
                    }}
                  >
                    {/* Product Image */}
                    <Avatar
                      variant="rounded"
                      src={item?.product?.images?.[0]}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        mr: 2,
                      }}
                    />

                    {/* Product Info */}
                    <Box flex={1}>
                      <Typography
                        fontWeight={600}
                        fontSize={16}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          display: "block",
                          pr: 1.5, // ← Gap between text and right edge
                          maxWidth: "100%",
                        }}
                        title={item?.product?.name} // Optional: Full name on hover
                      >
                        {item?.product?.name?.substring(0, 25) + " ..."}
                      </Typography>

                      <Typography color="text.secondary" mt={0.5}>
                        ${item?.soldPrice}
                      </Typography>

                      {/* Quantity Controls */}
                      <Box mt={2} display="flex" alignItems="center" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            setQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          disabled={item.quantity <= 1}
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            py: 0,
                          }}
                        >
                          -
                        </IconButton>

                        <TextField
                          size="small"
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value > 0) setQuantity(item.id, value);
                          }}
                          sx={{
                            width: 60,
                            "& input": { textAlign: "center" },
                          }}
                          InputProps={{
                            endAdornment: isUpdatingQty && (
                              <InputAdornment position="end">
                                <CircularProgress size={16} />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <IconButton
                          size="small"
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            py: 0,
                          }}
                        >
                          +
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Delete Button */}
                    <IconButton
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting}
                      sx={{ ml: 2 }}
                    >
                      {isDeleting ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Delete color="error" />
                      )}
                    </IconButton>
                  </Card>
                );
              })}
            </Box>
          ) : (
            <Box></Box>
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <Typography
              variant="body2"
              sx={{ m: 1, fontWeight: "bold", width: "max-content" }}
            >
              Order Summery
            </Typography>
            <CardContent>
              <Typography variant="body1">Discount Code</Typography>
              <TextField
                id=""
                label=""
                value={""}
                onChange={() => {}}
                size="small"
              />
              <br />
              <br />
              <TableContainer
                component={Paper}
                elevation={0}
                variant="elevation"
              >
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          // backgroundColor: "grey.100",
                          // width: "40%",
                        }}
                      >
                        <Typography variant="body2" fontWeight={900}>
                          {"Sub Total"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={900}>
                          ${totalDetails?.subTotal}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        <Typography variant="body2">
                          {"Estimated Tax"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={900}>
                          ${totalDetails?.estimatedTax}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        <Typography variant="body2">
                          {"Estimated shipping & Handling"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={900}>
                          ${totalDetails?.estimatedShipping}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        <Typography variant="body2" fontWeight={900}>
                          {"Total"}
                        </Typography>{" "}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={900}>
                          ${totalDetails?.total}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                sx={{
                  textTransform: "none",
                  background: "var(--secondary-color)",
                  m: 1,
                  width: "100%",
                }}
                variant="contained"
                disabled={!cart?.length}
                onClick={() => {
                  // handleCheckout();
                  navigate(`/payment`);
                }}
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
