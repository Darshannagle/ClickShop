import { useEffect, useState } from "react";
import {
  Avatar,
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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { getAPIData } from "../helpers/apiHelper";
import { endPoint } from "../config/siteConfig";
import toast from "react-hot-toast";

export default function MyAccount() {
  const [tab, setTab] = useState(0);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await getAPIData(endPoint.user.profile, {}, "GET");
      console.log("res: ", res);
      if (res?.status) {
        toast.success("Registration Successful");
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
      const res = await getAPIData(endPoint.user.profile, {}, "GET");
      if (res?.status) {
        toast.success("Registration Successful");
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
  useEffect(() => {
    const loadAccountData = async () => {
      try {
        setLoading(true);

        const [profileData, ordersData] = await Promise.all([
          fetchProfile(),
          getOrders(),
        ]);
        console.log("🚀 ~ loadAccountData ~ ordersData:", ordersData);
        console.log("profileData: ", profileData);

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
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar sx={{ width: 64, height: 64, mx: "auto", mb: 1 }}>
                {profile.email[0].toUpperCase()}
              </Avatar>
              <Typography variant="h6">{profile.email}</Typography>
              <Typography variant="body2" color="text.secondary">
                Customer
              </Typography>
            </CardContent>
            <Divider />
            <Tabs
              orientation={window.innerWidth < 1200 ? "horizontal" : "vertical"}
              value={tab}
              onChange={(_, v) => setTab(v)}
            >
              <Tab
                icon={<PersonIcon />}
                label="Profile"
                sx={{ textTransform: "none" }}
              />
              <Tab
                icon={<LocationOnIcon />}
                label="Addresses"
                sx={{ textTransform: "none" }}
              />
              <Tab
                icon={<ShoppingBagIcon />}
                label="Orders"
                sx={{ textTransform: "none" }}
              />
            </Tabs>
          </Card>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid size={{ xs: 12, md: 9 }}>
          {tab === 0 && <ProfileTab profile={profile} />}
          {tab === 1 && <AddressTab addresses={profile.addresses} />}
          {tab === 2 && <OrdersTab orders={orders} />}
        </Grid>
      </Grid>
    </Box>
  );

  /* ---------------- TAB COMPONENTS ---------------- */

  function ProfileTab({ profile }) {
    return (
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h6">Account Details</Typography>
          <Divider sx={{ my: 2 }} />
          Full Name{" "}
          <TextField
            id="fullName"
            label="Full Name"
            value={profile.fullName}
            onChange={() => (e) => {
              setProfile((prev: any) => {
                return { ...prev, gender: e?.target?.value };
              });
            }}
          />
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              value={profile.gender}
              onChange={(e) => {
                setProfile((prev: any) => {
                  return { ...prev, gender: e?.target?.value };
                });
              }}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          Email Address
          <TextField
            id="Email"
            label="Email"
            value={profile.email}
            onChange={() => {}}
            disabled
          />
          Mobile Number
          <TextField
            id="phone"
            label="Mobile Number"
            value={profile.phone}
            onChange={() => (e) => {
              setProfile((prev: any) => {
                return { ...prev, phone: e?.target?.value };
              });
            }}
          />
        </CardContent>
      </Card>
    );
  }

  function AddressTab({ addresses = [] }) {
    if (!addresses.length) {
      return <Alert severity="info">No saved addresses</Alert>;
    }

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Saved Addresses</Typography>
          <Divider sx={{ my: 2 }} />
          <List>
            {addresses.map((addr, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={`${addr.street}, ${addr.city}`}
                  secondary={`${addr.state} - ${addr.pincode}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }

  function OrdersTab({ orders }) {
    if (!orders.length) {
      return <Alert severity="info">No orders yet</Alert>;
    }

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">My Orders</Typography>
          <Divider sx={{ my: 2 }} />
          <List>
            {orders.map((order) => (
              <ListItem key={order.id}>
                <ListItemText
                  primary={`Order #${order.id}`}
                  secondary={`₹${order.totalAmount} • ${order.status}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}
