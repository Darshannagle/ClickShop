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
  Chip,
  Stack,
  InputAdornment,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { getAPIData } from "../helpers/apiHelper";
import { endPoint } from "../config/siteConfig";
import toast from "react-hot-toast";
import { useLoader } from "../context/LoaderContext";
import {
  AccessTime,
  AccountCircle,
  BadgeOutlined,
  ChevronRight,
  Delete,
  Email,
  Mode,
  Phone,
  ReceiptLongOutlined,
  SaveOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

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

  // const { tabId } = useParams();
  // setTab(parseInt(tabId) || 0);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({
    profile: false,
    address: false,
  });
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
        setLoading((prev) => ({ ...prev, profile: true }));

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
        setLoading((prev) => ({ ...prev, profile: false }));
      }
    };

    loadAccountData();
  }, []);

  if (loading?.profile) {
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
    // Helper for consistent input styling
    const inputSx = {
      backgroundColor: "#fff",
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
      },
    };

    return (
      <Card
        sx={{
          overflow: "visible",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            p: 3,
            background: "var(--secondary-color)",
            // `linear-gradient(to right, ${theme.palette.grey[700]}, ${theme.palette.common.black})`,
            color: "white",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <BadgeOutlined sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Account Details
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Manage your personal information
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Grid container spacing={3}>
            {/* Full Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Full Name"
                value={profile?.fullName || ""}
                onChange={(e) => {
                  setProfile((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }));
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle
                        htmlColor="var(--secondary-color)"
                        fontSize="small"
                      />
                    </InputAdornment>
                  ),
                }}
                sx={inputSx}
              />
            </Grid>

            {/* Gender Selection */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl
                component="fieldset"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormLabel
                  component="legend"
                  sx={{ mb: 1, fontSize: "0.8rem", color: "text.secondary" }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  value={profile?.gender || ""}
                  onChange={(_e, value) => {
                    setProfile((prev) => ({
                      ...prev,
                      gender: value,
                    }));
                  }}
                >
                  <FormControlLabel
                    value="MALE"
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "var(--secondary-color)", // unchecked
                          "&.Mui-checked": {
                            color: "black", // checked
                          },
                        }}
                      />
                    }
                    label="Male"
                    sx={{ mr: 2 }}
                  />
                  <FormControlLabel
                    value="FEMALE"
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "var(--secondary-color)", // unchecked
                          "&.Mui-checked": {
                            color: "black", // checked
                          },
                        }}
                      />
                    }
                    label="Female"
                    sx={{ mr: 2 }}
                  />
                  <FormControlLabel
                    value="OTHERS"
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "var(--secondary-color)", // unchecked
                          "&.Mui-checked": {
                            color: "black", // checked
                          },
                        }}
                      />
                    }
                    label="Others"
                    sx={{
                      color: "var(--secondary-color)", // unchecked
                      "&.Mui-checked": {
                        color: "black", // checked
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Email Address (Read Only) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Email Address"
                value={profile?.email || ""}
                disabled
                helperText="Email cannot be changed"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email
                        htmlColor="var(--secondary-color)"
                        fontSize="small"
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  ...inputSx,
                  // Styling for disabled state to look cleaner
                  "& .MuiOutlinedInput-root.Mui-disabled": {
                    backgroundColor: "action.hover",
                  },
                }}
              />
            </Grid>

            {/* Mobile Number */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Mobile Number"
                value={profile?.phone || ""}
                onChange={(e) => {
                  setProfile((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }));
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone
                        htmlColor="var(--secondary-color)"
                        fontSize="small"
                      />
                    </InputAdornment>
                  ),
                }}
                sx={inputSx}
              />
            </Grid>
          </Grid>

          {/* Action Button Area */}
          <Box sx={{ mt: 4, textAlign: "right" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveOutlined />}
              onClick={updateProfile}
              sx={{
                backgroundColor: "var(--secondary-color)",
                px: 2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
              }}
            >
              Save  
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  interface Address {
    id: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    addressType: "HOME" | "OFFICE";
    default: boolean;
  }

  function AddressTab() {
    const initialAddress: Address = {
      id: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      addressType: "HOME",
      default: false,
    };

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedAddress, setSelectedAddress] =
      useState<Address>(initialAddress);
    const [loading, setLoading] = useState({
      address: false,
    });

    /* ----------------------------- API CALLS ----------------------------- */

    const fetchAddresses = async () => {
      setLoading((prev) => ({ ...prev, address: true }));
      try {
        const res = await getAPIData(endPoint.address.list, {}, "GET");
        if (res?.status) {
          setAddresses(res?.data ?? []);
        } else {
          toast.error(res?.message || "Failed to fetch addresses");
        }
      } catch (error: any) {
        toast.error(error?.message || "Failed to fetch addresses");
      } finally {
        setLoading((prev) => ({ ...prev, address: false }));
      }
    };

    const deleteAddress = async (addressId: string) => {
      try {
        const res = await getAPIData(
          `${endPoint.address.delete}?id=${addressId}`,
          {},
          "DELETE",
        );

        if (res?.status) {
          toast.success(res?.message);
          fetchAddresses();
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
      }
    };

    const addAddress = async () => {
      try {
        const res = await getAPIData(
          endPoint.address.create,
          selectedAddress,
          "POST",
        );

        if (res?.status) {
          fetchAddresses();
          closeModal();
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
      }
    };

    const updateAddress = async () => {
      try {
        const res = await getAPIData(
          endPoint.address.update,
          selectedAddress,
          "PUT",
        );

        if (res?.status) {
          fetchAddresses();
          closeModal();
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      } catch (error: any) {
        toast.error(error?.message || "Something went wrong");
      }
    };

    /* --------------------------- HELPER METHODS --------------------------- */

    const handleChange = (field: keyof Address, value: any) => {
      setSelectedAddress((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const showModal = (address: Address = initialAddress, update = false) => {
      setSelectedAddress({ ...address }); // clone
      setIsUpdate(update);
      setIsOpen(true);
    };

    const closeModal = () => {
      setSelectedAddress(initialAddress);
      setIsOpen(false);
      setIsUpdate(false);
    };

    /* ------------------------------- EFFECT ------------------------------- */

    useEffect(() => {
      fetchAddresses();
    }, []);

    if (loading.address) {
      return (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Saved Addresses</Typography>
          <Divider sx={{ my: 2 }} />

          {/* ------------------------------ MODAL ----------------------------- */}

          <Modal open={isOpen} onClose={closeModal}>
            <Box
              sx={{
                position: "absolute",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
                gap: 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", md: "70%" },
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 3,
              }}
            >
              <TextField
                size="small"
                label="Address Line 1"
                value={selectedAddress.addressLine1}
                onChange={(e) => handleChange("addressLine1", e.target.value)}
              />

              <TextField
                size="small"
                label="Address Line 2"
                value={selectedAddress.addressLine2}
                onChange={(e) => handleChange("addressLine2", e.target.value)}
              />

              <TextField
                size="small"
                label="City"
                value={selectedAddress.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />

              <TextField
                size="small"
                label="State"
                value={selectedAddress.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />

              <TextField
                size="small"
                label="Country"
                value={selectedAddress.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />

              <TextField
                size="small"
                label="PIN Code"
                value={selectedAddress.pinCode}
                onChange={(e) => handleChange("pinCode", e.target.value)}
              />

              <FormControl>
                <FormLabel>Address Type</FormLabel>
                <RadioGroup
                  row
                  value={selectedAddress.addressType}
                  onChange={(e) => handleChange("addressType", e.target.value)}
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
                    checked={selectedAddress.default}
                    onChange={(e) => handleChange("default", e.target.checked)}
                  />
                }
              />

              <Button
                variant="contained"
                onClick={isUpdate ? updateAddress : addAddress}
                sx={{ gridColumn: "1 / -1", textTransform: "none" }}
              >
                {isUpdate ? "Update Address" : "Add Address"}
              </Button>
            </Box>
          </Modal>

          {/* ---------------------------- ADDRESS LIST ---------------------------- */}

          <List>
            {addresses.map((addr) => (
              <ListItem
                key={addr.id}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  my: 1,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1,
                }}
              >
                {/* Address Text */}
                <Box sx={{ flex: 1, width: "100%" }}>
                  <Typography fontWeight={500}>
                    {addr.addressLine1}, {addr.addressLine2}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {addr.city}, {addr.state} - {addr.pinCode}
                  </Typography>
                </Box>

                {/* Actions */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    justifyContent: { xs: "flex-start", sm: "flex-end" },
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  {addr.default && (
                    <Typography fontSize="10px">Default</Typography>
                  )}

                  <Typography
                    fontSize="10px"
                    sx={{
                      height: "max-content",
                      backgroundColor: "black",
                      color: "white",
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    {addr.addressType}
                  </Typography>

                  <IconButton onClick={() => showModal(addr, true)}>
                    <Mode color="warning" />
                  </IconButton>

                  <IconButton onClick={() => deleteAddress(addr.id)}>
                    <Delete color="error" />
                  </IconButton>
                </Box>
              </ListItem>
            ))}

            {/* Add New */}
            <ListItem
              sx={{
                border: "1px solid black",
                borderRadius: 2,
                my: 1.5,
              }}
            >
              <ListItemButton
                sx={{ justifyContent: "center" }}
                onClick={() => showModal()}
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
    const getStatusProps = (status) => {
      switch (status?.toLowerCase()) {
        case "delivered":
        case "completed":
          return { color: "success", label: "Delivered" };
        case "processing":
        case "preparing":
          return { color: "primary", label: "Processing" };
        case "shipped":
          return { color: "info", label: "Shipped" };
        case "cancelled":
          return { color: "error", label: "Cancelled" };
        case "pending":
          return { color: "warning", label: "Pending" };
        default:
          return { color: "default", label: status };
      }
    };

    if (!orders?.length) {
      return (
        <Card
          sx={{
            textAlign: "center",
            py: 8,
            px: 4,
            border: "1px dashed",
            borderColor: "divider",
            backgroundColor: "grey.50",
          }}
        >
          <ShoppingBagOutlined
            sx={{ fontSize: 64, color: "text.disabled", mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            No Orders Yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your order history is empty. Start shopping to see your orders here!
          </Typography>
        </Card>
      );
    }

    return (
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" fontWeight="bold">
              My Orders
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {orders.length} orders found
            </Typography>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            {orders.map((order) => {
              const statusProps = getStatusProps(order.orderStatus);

              return (
                <Box
                  key={order.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "#fff",
                    transition: "all 0.2s ease-in-out",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {/* Left Side: Icon & Details */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        backgroundColor: "grey.100",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ReceiptLongOutlined color="action" />
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        color="text.primary"
                      >
                        Order #{order.id}
                      </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        mt={0.5}
                      >
                        <AccessTime
                          sx={{ fontSize: 14, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {order.date || "Recently placed"}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>

                  {/* Right Side: Price, Status & Action */}
                  <Box
                    sx={{
                      textAlign: "right",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        ${order.totalAmount}
                      </Typography>
                      <Chip
                        label={statusProps.label}
                        size="small"
                        // color={statusProps.color}
                        sx={{ mt: 0.5, fontWeight: 500 }}
                      />
                    </Box>

                    <IconButton size="small" sx={{ ml: 1 }}>
                      <ChevronRight fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </Card>
    );
  }
}
