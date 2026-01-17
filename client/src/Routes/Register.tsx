import { useState } from "react";
import "../assets/CSS/Register.scss";
import {
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AccountCircle,
  Email,
  Lock,
  Phone,
  LocationPin,
  Pin,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useLoader } from "../context/LoaderContext";
import { useGoogleLogin } from "@react-oauth/google";
import { getAPIData } from "../helpers/apiHelper";
import { endPoint } from "../config/siteConfig";

const Register = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    location: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!registrationData?.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!registrationData?.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(String(registrationData.email))) {
      newErrors.email = "Invalid email format";
    }

    if (!registrationData?.password) {
      newErrors.password = "Password is required";
    } else if (String(registrationData.password).length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!registrationData?.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (
      registrationData?.confirmPassword !== registrationData?.password
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // if (!registrationData?.profileImage) {
    //   newErrors.profileImage = "Profile image is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true = valid
  };

  const handleDataChange = (field: string, value: string | File) => {
    setRegistrationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      showLoader();
      const body = {
        fullName: registrationData?.fullName,
        email: registrationData?.email,
        password: registrationData?.password,
        confirmPassword: registrationData?.confirmPassword,
        phone: registrationData?.phone,
        gender: registrationData?.gender,
        location: registrationData?.location,
        pinCode: registrationData?.pinCode,
      };
      console.log("body: ", body);
      const res = await getAPIData(endPoint.signUp, body, "POST");
      console.log("res: ", res);

      if (res?.status) {
        toast.success(res?.message);
        navigate("/login");
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      hideLoader();
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const response = await fetch(
          `/api/auth/google?code=${authResult["code"]}`
        );
        const data = await response.json();
        console.log(data);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <Container className="mainContainer" component="main" maxWidth="xs">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 0px 2px",
          p: 3,
        }}
      >
        <Typography fontSize={20} fontWeight="bold" color="var(--text-color)">
          Register
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Please enter your details to create an account
        </Typography>

        <Container sx={{ mt: 2 }}>
          <TextField
            name="fullName"
            label="Full Name"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={registrationData.fullName}
            onChange={(e) => handleDataChange("fullName", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle fontSize="small" />
                </InputAdornment>
              ),
            }}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Gender</InputLabel>
            <FormLabel></FormLabel>
            <Select
              size="small"
              value={registrationData?.gender}
              onChange={(e) => handleDataChange("gender", e.target.value)}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHERS">Others</MenuItem>
            </Select>
            <FormHelperText></FormHelperText>
          </FormControl>
          <TextField
            name="email"
            label="Email Address"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={registrationData.email}
            onChange={(e) => handleDataChange("email", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email fontSize="small" />
                </InputAdornment>
              ),
            }}
            error={!!errors?.email}
            helperText={errors?.email}
          />

          <TextField
            name="phone"
            type="tel"
            label="Phone Number"
            size="small"
            inputMode="tel"
            fullWidth
            sx={{ mb: 2 }}
            value={registrationData.phone}
            onChange={(e) => handleDataChange("phone", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone fontSize="small" />
                </InputAdornment>
              ),
            }}
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <TextField
            name="location"
            label="Location"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={registrationData.location}
            onChange={(e) => handleDataChange("location", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationPin fontSize="small" />
                </InputAdornment>
              ),
            }}
            error={!!errors.location}
            helperText={errors.location}
          />

          <TextField
            name="pinCode"
            label="Pin Code"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={registrationData.pinCode}
            onChange={(e) => handleDataChange("pinCode", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Pin fontSize="small" />
                </InputAdornment>
              ),
            }}
            error={!!errors.pinCode}
            helperText={errors.pinCode}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={registrationData.password}
            onChange={(e) => handleDataChange("password", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
            error={!!errors?.password}
            helperText={errors?.password}
          />

          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={registrationData.confirmPassword}
            onChange={(e) =>
              handleDataChange("confirmPassword", e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
            error={!!errors?.confirmPassword}
            helperText={errors?.confirmPassword}
          />
          <button className="registerButton" onClick={handleRegister}>
            Register
          </button>
        </Container>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Box display="flex" justifyContent="space-around" width="80%">
          <FaFacebook size={30} />
          <FcGoogle size={30} onClick={googleLogin} />
          <FaApple size={30} />
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <NavLink to="/login" style={{ color: "var(--secondary-color)" }}>
            Login
          </NavLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
