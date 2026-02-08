import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
  Typography,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Modal,
  FormControl,
  FormLabel,
  Button,
  ListItemButton,
  IconButton,
  Checkbox,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { getAPIData } from "../helpers/apiHelper";
import { endPoint } from "../config/siteConfig";
import toast from "react-hot-toast";
import OutlinedButton from "../Components/Button/OutlinedButton";
import { useLoader } from "../context/LoaderContext";
import { Delete, Mode } from "@mui/icons-material";

export default function MyAccount() {
  // check whether it is desktop :
  const isDesktop = useMediaQuery(useTheme().breakpoints.up("md"));

  const [tab, setTab] = useState(0);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "MALE",
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoader();
  const fetchProfile = async () => {
    try {
      const res = await getAPIData(endPoint.user.profile, {}, "GET");
      if (res?.status) {
        // toast.success(res?.message);
        return res?.data;
      } else {
        setError(res?.message);
        toast.error(res?.message || "Something went wrong");
        return null;
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      return null;
    }
  };

  const getOrders = async () => {
    try {
      const res = await getAPIData(endPoint.order.list, {}, "GET");
      if (res?.status) {
        // toast.success(res?.message);
        return res?.data;
      } else {
        setError(res?.message);
        toast.error(res?.message || "Something went wrong");
        return [];
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      return [];
    }
  };

  const updateProfile = async () => {
    try {
      const res = await getAPIData(endPoint.user.update, profile, "PUT");
      if (res?.status) {
        showLoader();
        toast.success(res?.message);
        setProfile(res?.data);
        // return res?.data;
      } else {
        // setError(res?.message);
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        setLoading(true);

        const [profileData, ordersData] = await Promise.all([
          fetchProfile(),
          getOrders(),
        ]);

        setProfile(profileData);
        setOrders(ordersData);
      } catch (error) {
        setError(error.message);
        toast.error(error.message || "Please login to view your account");
      } finally {
        setLoading(false);
      }
    };

    loadAccountData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box maxWidth={500} mx="auto" mt={6}>
        <Alert severity="warning">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box maxWidth="lg" mx="auto" mt={4}>
      <Grid container spacing={3}>
        {/* LEFT SIDEBAR */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              {/* <Avatar sx={{ width: 64, height: 64, mx: "auto", mb: 1 }}>
                {profile?.fullName?.toUpperCase().at(0)}
              </Avatar> */}
              <Typography variant="h6">{profile?.email}</Typography>
              <Typography variant="body2" color="text.secondary">
                Customer
              </Typography>
            </CardContent>
            <Divider />
            <Tabs
              value={tab}
              // textColor="primary"
              onChange={(_, v) => setTab(v)}
              orientation={isDesktop ? "vertical" : "horizontal"}
              variant={isDesktop ? "standard" : "fullWidth"}
              sx={{
                color: "black",
                width: "100%",
                height: isDesktop ? "100%" : "auto",
                "& .MuiTabs-indicator": {
                  // display: "none",
                  backgroundColor: "black",
                },
                "& .MuiTab-root": {
                  color: "#6e6e6e", // inactive tab color
                },
                "& .MuiTab-root.Mui-selected": {
                  border: "1px solid black",
                  // backgroundColor: "black",
                  color: "#000", // 🔥 active tab text/icon color
                  fontWeight: 600,
                },
                "& .MuiTabs-flexContainer": {
                  height: "100%",
                  justifyContent: "stretch",
                },
              }}
            >
              <Tab
                icon={<PersonIcon />}
                label="Profile"
                sx={{
                  textTransform: "none",
                  fontSize: "10px",
                  flex: 1,
                  minHeight: 56,
                }}
              />
              <Tab
                icon={<LocationOnIcon />}
                label="Addresses"
                sx={{
                  textTransform: "none",
                  fontSize: "10px",
                  flex: 1,
                  minHeight: 56,
                }}
              />
              <Tab
                icon={<ShoppingBagIcon />}
                label="Orders"
                sx={{
                  textTransform: "none",
                  fontSize: "10px",
                  flex: 1,
                  minHeight: 56,
                }}
              />
            </Tabs>
          </Card>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid size={{ xs: 12, md: 8 }}>
          {tab === 0 && <ProfileTab profile={profile} />}
          {tab === 1 && <AddressTab />}
          {tab === 2 && <OrdersTab orders={orders} />}
        </Grid>
      </Grid>
    </Box>
  );

  /* ---------------- TAB COMPONENTS ---------------- */

  function ProfileTab({ profile }) {
    return (
      <Card sx={{ m: 1 }}>
        <CardContent
          sx={{
            m: 1,
            p: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: { xs: "stretch" },
            // border: "1px solid red",
          }}
        >
          <Typography variant="h6">Account Details</Typography>
          <Divider sx={{ my: 2 }} />
          {/* Full Name{" "} */}
          <TextField
            margin="normal"
            size="small"
            id="fullName"
            label="Full Name"
            value={profile?.fullName || ""}
            onChange={(e) => {
              setProfile((prev: any) => ({
                ...prev,
                fullName: e?.target?.value,
              }));
            }}
          />
          {/* <FormControl> */}
          {/* <FormLabel>Gender</FormLabel> */}
          <RadioGroup
            row
            sx={{ m: 0 }}
            value={profile?.gender}
            onChange={(_e, value) => {
              setProfile((prev: any) => ({
                ...prev,
                gender: value,
              }));
            }}
          >
            <FormControlLabel value="MALE" control={<Radio />} label="Male" />
            <FormControlLabel
              value="FEMALE"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              value="OTHERS"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>

          {/* </FormControl> */}
          {/* Email Address */}
          <TextField
            margin="normal"
            size="small"
            id="Email"
            label="Email"
            value={profile?.email}
            onChange={() => {}}
            disabled
          />
          {/* Mobile Number */}
          <TextField
            margin="normal"
            size="small"
            id="phone"
            label="Mobile Number"
            value={profile.phone || ""}
            onChange={(e) => {
              setProfile((prev: any) => ({
                ...prev,
                phone: e.target.value,
              }));
            }}
          />
          <OutlinedButton
            // flex={"1 1 20%"}
            // width={"10%"}
            // m={"20px auto"}
            onClick={updateProfile}
          >
            Save
          </OutlinedButton>
        </CardContent>
      </Card>
    );
  }

  function AddressTab() {
    const [addresses, setAddresses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
      id: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      addressType: "HOME",
      default: false,
    });
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

    const deleteAddress = async (addressId) => {
      try {
        const res = await getAPIData(
          endPoint.address.delete + "?id=" + addressId,
          {},
          "DELETE",
        );
        if (res?.status) {
          toast.success(res?.message);
          fetchAddresses();
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    };
    const updateAddress = async () => {
      try {
        setIsOpen(false);
        const res = await getAPIData(
          endPoint.address.update,
          selectedAddress,
          "PUT",
        );
        if (res?.status) {
          fetchAddresses();
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    };

    const addAddress = async () => {
      try {
        setIsOpen(false);
        const res = await getAPIData(
          endPoint.address.create,
          selectedAddress,
          "POST",
        );
        if (res?.status) {
          setAddresses(res?.data);
          fetchAddresses();
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    };

    useEffect(() => {
      fetchAddresses();
    }, []);

    const showModal = (address: any, isUpdate = false) => {
      setSelectedAddress(address);
      setIsUpdate(isUpdate);
      setIsOpen(true);
    };

    // if (!addresses?.length) {
    //   return <Alert severity="info">No saved addresses</Alert>;
    // }

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Saved Addresses</Typography>
          <Divider sx={{ my: 2 }} />

          <Modal
            title={isUpdate ? "Update Address" : "Add Address"}
            open={isOpen}
            onClose={() => {
              setSelectedAddress({} as any);
              setIsOpen(false);
            }}
          >
            <Box
              sx={{
                position: "absolute",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
                gap: 1,
                // flexDirection: "column",
                // alignItems: "center",
                // justifyContent: "normal",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "80%", md: "75%" },
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 3,
              }}
            >
              <TextField
                id=""
                margin="dense"
                size="small"
                label="Address Line 1"
                value={selectedAddress?.addressLine1}
                onChange={(e) =>
                  setSelectedAddress((prev: any) => {
                    return {
                      ...prev,
                      addressLine1: e?.target?.value,
                    };
                  })
                }
              />
              <TextField
                id=""
                margin="dense"
                size="small"
                label="Address Line 2"
                value={selectedAddress?.addressLine2}
                onChange={(e) =>
                  setSelectedAddress((prev: any) => {
                    return {
                      ...prev,
                      addressLine2: e?.target?.value,
                    };
                  })
                }
              />
              <TextField
                id=""
                margin="dense"
                size="small"
                label="City"
                value={selectedAddress?.city}
                onChange={(e) =>
                  setSelectedAddress((prev: any) => {
                    return {
                      ...prev,
                      city: e?.target?.value,
                    };
                  })
                }
              />
              <TextField
                id=""
                margin="dense"
                size="small"
                label="state"
                value={selectedAddress?.state}
                onChange={(e) =>
                  setSelectedAddress((prev: any) => {
                    return {
                      ...prev,
                      state: e?.target?.value,
                    };
                  })
                }
              />
              <TextField
                id=""
                margin="dense"
                size="small"
                label="Country"
                value={selectedAddress?.country}
                onChange={(e) =>
                  setSelectedAddress((prev: any) => {
                    return {
                      ...prev,
                      country: e?.target?.value,
                    };
                  })
                }
              />
              <TextField
                id=""
                margin="dense"
                size="small"
                label="PIN Code"
                value={selectedAddress?.pinCode}
                onChange={(e) =>
                  setSelectedAddress((prev: any) => {
                    return {
                      ...prev,
                      pinCode: e?.target?.value,
                    };
                  })
                }
              />
              <FormControl>
                <FormLabel component="legend">Address Type</FormLabel>
                <RadioGroup
                  row
                  value={selectedAddress?.addressType ?? "HOME"}
                  onChange={(e) =>
                    setSelectedAddress((prev: any) => ({
                      ...prev,
                      addressType: e?.target?.value,
                    }))
                  }
                >
                  <FormControlLabel
                    value="HOME"
                    control={<Radio size="small" />}
                    label="Home"
                  />
                  <FormControlLabel
                    value="OFFICE"
                    control={<Radio size="small" />}
                    label="Office"
                  />
                </RadioGroup>
              </FormControl>
              <FormControlLabel
                label="Set as Default"
                control={
                  <Checkbox
                    size="small"
                    onChange={(e) =>
                      setSelectedAddress((prev: any) => {
                        return {
                          ...prev,
                          default: e?.target.checked,
                        };
                      })
                    }
                    title="Set as Default"
                    aria-label="Set as Default"
                    checked={Boolean(selectedAddress?.default)}
                  ></Checkbox>
                }
              />

              <Button
                variant="contained"
                color="inherit"
                sx={{ textTransform: "none" }}
                onClick={isUpdate ? updateAddress : addAddress}
              >
                {isUpdate ? "Update" : "Add"}
              </Button>
            </Box>
          </Modal>
          <List>
            {(Array.isArray(addresses) ? addresses : []).map((addr) => (
              <ListItem
                key={addr.id}
                sx={{
                  height: "max-content",
                  border:
                    // addr?.default ?
                    // "1px solid black",
                    "1px solid #ddd",
                  borderRadius: 2,
                  my: 1,
                  // px: 2,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  flexWrap: "wrap",
                }}
                secondaryAction={
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {addr?.default ? (
                      <Typography
                        sx={{
                          borderRadius: "5px",
                          // backgroundColor: "black",
                          // color: "whitesmoke",
                          verticalAlign: "middle",
                          p: 1,
                        }}
                        color="textPrimary"
                        textAlign={"center"}
                        variant="body2"
                        fontSize={"10px"}
                      >
                        Default{" "}
                      </Typography>
                    ) : (
                      <></>
                    )}
                    <Typography
                      sx={{
                        borderRadius: "5px",
                        backgroundColor: "black",
                        color: "whitesmoke",
                        verticalAlign: "middle",
                        p: 1,
                      }}
                      color="textPrimary"
                      textAlign={"center"}
                      variant="body2"
                      fontSize={"10px"}
                    >
                      {addr?.addressType}
                    </Typography>
                    <IconButton
                      sx={{ m: 0, p: 0 }}
                      onClick={() => showModal(addr, true)}
                    >
                      <Mode color="warning" />
                    </IconButton>
                    <IconButton
                      sx={{ m: 0, p: 0 }}
                      onClick={() => {
                        deleteAddress(addr.id);
                      }}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </Box>
                }
              >
                {/* Address Content */}
                <ListItemText
                  sx={{
                    flex: "1 1 100%",
                    wordBreak: "break-word",
                  }}
                  primary={
                    <Typography fontWeight={500}>
                      {addr.addressLine1}, {addr.addressLine2}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {addr.city}, {addr.state} - {addr.pinCode}
                    </Typography>
                  }
                />
                {/* {addr.default && (
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 1,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      bgcolor: "success.light",
                      color: "success.dark",
                      fontWeight: 500,
                    }}
                  >
                    Default
                  </Typography>
                )} */}
              </ListItem>
            ))}
            <ListItem
              key={addresses?.length}
              sx={{
                border: "1px solid black",
                borderRadius: 2,
                my: 1.5,
                px: 2,
                // display: "flex",
                // alignItems: "flex-start",
                gap: 2,
              }}
            >
              <ListItemButton
                alignItems="center"
                sx={{ justifyContent: "center" }}
                onClick={() => {
                  showModal(selectedAddress, false);
                }}
              >
                <Typography variant="h5">+</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }

  function OrdersTab({ orders }) {
    if (!orders?.length) {
      return <Alert severity="info">No orders yet</Alert>;
    }

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">My Orders</Typography>
          <Divider sx={{ my: 2 }} />
          <List>
            {orders.map((order) => (
              <ListItem
                component={Card}
                elevation={0.1}
                sx={{ my: 1 }}
                key={order.id}
              >
                <ListItemText
                  primary={`Order #${order.id}`}
                  secondary={`$${order.totalAmount} • ${order.orderStatus}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}
