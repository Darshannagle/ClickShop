import {
  Card,
  Grid,
  Typography,
  CardHeader,
  Avatar,
  CardActions,
  Box,
  Button,
  ButtonGroup,
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
import { getAPIData } from "../helpers/apiHelper";
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
      if (res?.status) {
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

      if (res?.status) {
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
        { cart_id: id, quantity },
        "POST",
      );

      if (res?.status) {
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

  const handleCheckout = async () => {
    try {
      showLoader();
      const res = await getAPIData(
        endPoint.order.create,
        { cartItems: cart },
        "POST",
      );
      if (res?.status) {
        toast.success(res?.message);
        window.location.href = res?.data?.session?.url;
        // setCart(res?.data?.records ?? []);
        // setTotalDetails({
        //   subTotal: res?.data?.subTotal ?? 0,
        //   estimatedTax: res?.data?.estimatedTax ?? 0,
        //   estimatedShipping: res?.data?.estimatedShipping ?? 0,
        //   total: res?.data?.total ?? 0,
        // });
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
            <Box>
              {cart?.map((item, index) => {
                return (
                  <Card key={index} elevation={3} sx={{}}>
                    <CardHeader
                      sx={{ m: 0 }}
                      titleTypographyProps={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                      subheaderTypographyProps={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                      avatar={
                        <Avatar
                          variant="square"
                          sx={{
                            width: "auto",
                            height: "20vh",
                          }}
                          src={item?.product?.images[0]}
                        />
                      }
                      title={item?.product?.name}
                      subheader={"$ " + item?.soldPrice}
                      action={
                        <CardActions disableSpacing sx={{ p: 0 }}>
                          <IconButton
                            sx={{ m: 0 }}
                            size="small"
                            onClick={() => handleDelete(item?.id)}
                            disabled={loading.items.includes(item.id)}
                          >
                            {loading.items.includes(item.id) ? (
                              <CircularProgress size={16} color="error" />
                            ) : (
                              <Delete htmlColor="darkred" />
                            )}
                          </IconButton>
                        </CardActions>
                      }
                    />
                    <CardContent sx={{ m: 0, p: 0 }}>
                      <ButtonGroup
                        variant="outlined"
                        color="inherit"
                        size="small"
                        sx={{ m: 0, p: 0 }}
                      >
                        <Button
                          sx={{ height: 32, width: "1%" }}
                          onClick={(e: any) => {
                            setQuantity(item?.id, Number(e?.target?.value));
                            //   setQuantity((prev) => {
                            // prev = prev > 1 ? --prev : 1;
                            // return prev;
                            //   });
                          }}
                          disabled={item?.quantity <= 1}
                        >
                          -
                        </Button>
                        <TextField
                          sx={{
                            fontSize: "1%",
                            width: 50,
                            height: 1,
                            "& .MuiInputBase-root": {
                              borderRadius: 0,
                              height: 32,
                            },
                          }}
                          InputProps={{
                            endAdornment: loading.quantity.includes(
                              item?.id,
                            ) && (
                              <InputAdornment
                                position="start"
                                variant="standard"
                              >
                                <CircularProgress size={20} />
                              </InputAdornment>
                            ),
                          }}
                          value={item?.quantity > 0 ? item?.quantity : 1}
                          size="small"
                          type="number"
                          onInput={
                            (e: any) => {
                              if (e.target.value > 0) {
                                setQuantity(item?.id, Number(e.target.value));
                              }
                            }
                            //   setQuantity(Number(e.target.value ?? quantity))
                          }
                        />
                        <Button
                          sx={{ height: 32, width: "1%" }}
                          onClick={() => {
                            setQuantity(item?.id, item?.quantity + 1);
                          }}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </CardContent>
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
