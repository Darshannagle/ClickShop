import ContainedButton from "@/Components/Button/ContainedButton";
import OutlinedButton from "@/Components/Button/OutlinedButton";
import { endPoint } from "@/config/siteConfig";
import { useLoader } from "@/context/LoaderContext";
import { getAPIData } from "@/helpers/apiHelper";
import { toString } from "@/models/Address.interface";
import { AttachMoney, CreditCard } from "@mui/icons-material";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  // IconButton,
  // Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardHeader,
  Container,
  Grid,
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
// import { FcLeft, FcRight } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const steps = ["Address", "Shipping", "Payment"];
  const [selectedShipping, setSelectedShipping] = useState("");
  const shippingMethods = [
    { name: "FREE", title: "Free", tag: "", price: 0 },
    { name: "FAST", title: "Fast", tag: "Recommended", price: 20 },
  ];
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [order, setOrder] = useState<any>({
    cartItems: [],
    address_id: null,
    paymentMethod: null,
    totalAmount: 0,
    subTotal: 0,
    estimatedTax: 0,
    estimatedShipping: 0,
  });
  const navigate = useNavigate();
  // const { orderId } = useParams();
  const { showLoader, hideLoader } = useLoader();

  const fetchAddresses = async () => {
    try {
      const res = await getAPIData(endPoint.address.list, {}, "GET");
      if (res?.status) {
        setAddresses(res?.data);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const fetchCart = async () => {
    try {
      showLoader();
      const res = await getAPIData(endPoint.cartItem.list, {}, "GET");

      if (res?.status) {
        setOrder((prev: any) => ({
          ...prev,
          subTotal: res?.data?.subTotal ?? 0,
          estimatedTax: res?.data?.estimatedTax ?? 0,
          estimatedShipping: res?.data?.estimatedShipping ?? 0,
          totalAmount: res?.data?.total,
          cartItems: res?.data?.records ?? [],
        }));
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
    fetchAddresses();
  }, []);

  const SelectAddress = () => {
    return (
      <Box sx={{ display: "block" }}>
        <Typography variant="h6" gutterBottom>
          Select Address
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            // key={address}
            sx={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <RadioGroup
              sx={{ width: { xs: "90%", sm: "70%" }, mx: "auto" }}
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(_e, value) => {
                setSelectedAddress(value);
              }}
              // onChange={(e, value) => setSelectedAddress(value)}
            >
              {addresses.map((address) => (
                <Card
                  key={address?.id}
                  onClick={() => {
                    setSelectedAddress(address);
                  }}
                  sx={{
                    m: 1,
                    borderRadius: 2,
                    transition: "0.3s",
                    border: () =>
                      String(selectedAddress?.id) === String(address?.id)
                        ? `2px solid var(--secondary-color)`
                        : "1px solid #ddd",
                    "&:hover": {
                      boxShadow: 4,
                      borderColor: "var(--secondary-color)",
                    },
                  }}
                  elevation={
                    String(selectedAddress?.id) === String(address?.id) ? 2 : 1
                  }
                >
                  <FormControlLabel
                    value={address?.id}
                    checked={
                      String(selectedAddress?.id) === String(address?.id)
                    }
                    control={<Radio />}
                    onSelect={() => {
                      setSelectedAddress(address?.id);
                    }}
                    sx={{ width: "100%", m: 1 }}
                    label={
                      <CardHeader
                        // avatar={
                        //   <Avatar sx={{ bgcolor: "primary.main" }}>🏠</Avatar>
                        // }
                        title={
                          <Typography fontWeight={600}>
                            {address?.addressLine1}, {address?.addressLine2}
                          </Typography>
                        }
                        subheader={
                          <Typography variant="body2" color="text.secondary">
                            {address?.city}, {address?.state},{" "}
                            {address?.country} - {address?.pinCode}
                          </Typography>
                        }
                      />
                    }
                  />
                </Card>
              ))}
            </RadioGroup>{" "}
          </Box>
        </Box>
      </Box>
    );
  };

  const Shipping = () => {
    return (
      <>
        <Box
          // key={address}
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <RadioGroup
            sx={{ width: { xs: "90%", sm: "70%" }, mx: "auto" }}
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(_e, value) => {
              setSelectedAddress(value);
            }}
            // onChange={(e, value) => setSelectedAddress(value)}
          >
            {shippingMethods.map((shipping) => (
              <Card
                key={shipping?.name}
                onClick={() => {
                  setSelectedShipping(shipping?.name);
                }}
                sx={{
                  m: 1,
                  borderRadius: 2,
                  transition: "0.3s",
                  border: () =>
                    String(selectedShipping) === String(shipping?.name)
                      ? `2px solid var(--secondary-color)`
                      : "1px solid #ddd",
                  "&:hover": {
                    boxShadow: 4,
                    borderColor: "var(--secondary-color)",
                  },
                }}
                // elevation={
                //   String(selectedAddress?.id) === String(address?.id) ? 2 : 1
                // }
              >
                <FormControlLabel
                  value={shipping?.name}
                  checked={String(selectedShipping) === String(shipping?.name)}
                  control={<Radio />}
                  onSelect={() => {
                    setSelectedShipping(shipping?.name);
                  }}
                  sx={{ width: "100%", m: 1 }}
                  label={
                    <CardHeader
                      // avatar={
                      //   <Avatar sx={{ bgcolor: "primary.main" }}>🏠</Avatar>
                      // }
                      title={
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          sx={{ flexGrow: 1 }}
                        >
                          <Typography m={1} fontWeight={600}>
                            {shipping?.title}
                          </Typography>
                        </Box>
                      }
                      subheader={
                        <Typography variant="body2" color="text.secondary">
                          ${shipping?.price}
                        </Typography>
                      }
                      // action={
                      //   <Badge
                      //     color="primary"
                      //     badgeContent={shipping?.tag}
                      //     overlap="circular"
                      //   ></Badge>
                      // }
                    />
                  }
                />
              </Card>
            ))}
          </RadioGroup>{" "}
        </Box>{" "}
      </>
    );
  };

  const PaymentForm = () => {
    return (
      <Container
        maxWidth={"md"}
        sx={{ margin: "10ox auto", border: "0px solid red" }}
      >
        <Grid container gap={1}>
          <Grid size={{ xs: 12, sm: 12 }} component={Card} elevation={2}>
            <Typography m={1} variant="h6" textAlign={"left"}>
              Summery
            </Typography>
            {order?.cartItems?.map((item: any) => (
              <CardHeader
                key={item?.id}
                sx={{
                  m: 2,
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                avatar={
                  <Avatar
                    sx={{
                      width: { xs: "50px", sm: "75px" },
                      height: { xs: "50px", sm: "75px" },
                    }}
                    variant="square"
                    src={item?.product?.images[0]}
                    aria-label=""
                  />
                }
                action={<IconButton aria-label=""></IconButton>}
                title={item?.product?.name}
                subheader={`$ ${item?.soldPrice}`}
              />
            ))}
            <Box sx={{ p: 1, gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ wordBreak: "break-word" }}
                textAlign={"left"}
                m={1}
              >
                <b>Address : </b>
                <br />
                {toString(selectedAddress)}
                <br />
                <br />
              </Typography>
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
                          ${order?.subTotal}
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
                          ${order?.estimatedTax}
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
                          ${order?.estimatedShipping}
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
                          ${order?.totalAmount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }} component={Card} elevation={1}>
            <FormControl
              component="fieldset"
              variant="outlined"
              size="small"
              sx={{ color: "black" }}
            >
              <FormLabel component="legend">Payment</FormLabel>
              <RadioGroup
                aria-label=""
                name=""
                value={order?.paymentMethod}
                onChange={(_e, v) => {
                  setOrder((prev: any) => ({ ...prev, paymentMethod: v }));
                }}
              >
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      // color: "black",
                      fontWeight: 500,
                    },
                  }}
                  value={"CASH"}
                  control={
                    <Radio
                      sx={{
                        color: "var(--secondary-color)", // unchecked
                        "&.Mui-checked": {
                          color: "black", // checked
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <AttachMoney fontSize="small" />
                      Cash on Delivery
                    </Typography>
                  }
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                    },
                  }}
                  value={"ONLINE"}
                  control={
                    <Radio
                      sx={{
                        color: "var(--secondary-color)", // unchecked
                        "&.Mui-checked": {
                          color: "black", // checked
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <CreditCard fontSize="small" />
                      UPI / Debit / Credit Card
                    </Typography>
                  }
                />
              </RadioGroup>
              {/* <FormHelperText></FormHelperText> */}
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    );
  };

  const getStepContent: { [key: string]: ReactNode } = {
    Address: <SelectAddress />,
    Shipping: <Shipping />,
    Payment: <PaymentForm />,
  };

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (step: number): boolean => {
    return [].includes(step);
  };
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep == 0) {
      if (!selectedAddress) {
        toast.error("Please select an address");
        return;
      }
    }
    if (activeStep == 2) {
      if (!order?.paymentMethod) {
        toast.error("Please select a payment method");
        return;
      }
      const reqData = {
        ...order,
        address_id: selectedAddress?.id,
      };
      const res: any = await getAPIData(
        endPoint?.order?.create,
        reqData,
        "POST",
      );
      if (res?.status) {
        toast.success(res?.message);
        if (order?.paymentMethod == "ONLINE") {
          if (res?.data?.checkoutUrl) {
            window.location.href = res?.data?.checkoutUrl;
          } else {
            console.log("error while creating order: ", res?.errors[1]);
            toast.error("Something went wrong");
          }
        } else {
          navigate("/order/" + res?.data?.id);
        }
      }
    }
    setActiveStep((prev) => prev + 1);
    if (activeStep === steps.length) {
      // setActiveStep(0);
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (!isStepOptional(activeStep)) {
      if (activeStep == 0) {
        navigate(-1);
      }
      setActiveStep((prev) => prev - 1);
    }
  };

  const allowNext = (): boolean => {
    if (activeStep === 0 && !selectedAddress) {
      return false;
    }

    if (activeStep === 2 && !order?.paymentMethod) {
      return false;
    }

    return true; // ✅ THIS WAS MISSING
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // throw error if skipping not allowed
  //     return;
  //   }
  //   setActiveStep((prev) => prev + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => setActiveStep(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%", lg: "60%", xl: "60%" },
          m: "20px auto",
          "& .MuiStepIcon-root": {
            color: "grey", // default
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: "black",
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: "black",
          },
        }}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {
        <>
          {getStepContent[steps[activeStep]]}
          {/* <IconButton onClick={handleBack}>
            <FcLeft />
          </IconButton>
          <IconButton onClick={handleNext}>
            <FcRight />
          </IconButton> */}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2, m: 1 }}>
            {/* Spacer pushes buttons to the right */}
            <Box
              sx={{
                flexGrow: { xs: 0.5, sm: 0.95, md: 0.9, lg: 0.75, xl: 0.75 },
              }}
            />

            {activeStep !== steps.length && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <OutlinedButton
                  variant="outlined"
                  onClick={handleBack}
                  visiblity={activeStep == 0 ? "hidden" : "visible"}
                >
                  Back
                </OutlinedButton>
                <ContainedButton
                  disabled={!allowNext()}
                  variant="contained"
                  onClick={handleNext}
                >
                  {activeStep == 2 ? "Pay" : "Next"}
                </ContainedButton>
              </Box>
            )}
          </Box>
        </>
      }
    </Box>
  );
};

export default Payment;
