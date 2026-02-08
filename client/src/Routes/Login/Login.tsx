import "../../assets/CSS/Register.scss";
import {
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Checkbox,
  Divider,
} from "@mui/material";
import { Facebook, Google, Apple, Email, Lock } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useLoader } from "../../context/LoaderContext";
import { getAPIData } from "../../helpers/apiHelper";
import { endPoint } from "../../config/siteConfig";
import toast from "react-hot-toast";
import { setToken } from "../../store/authSlice";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showLoader, hideLoader } = useLoader();

  const { token, authState } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    const toastId = toast.loading("Submitting data...");

    try {
      showLoader();
      const response = await getAPIData(endPoint.logIn, payload, "POST");
      console.log("response: ", response);

      if (response?.status) {
        toast.success(response?.data?.message || response?.message, {
          id: toastId,
        });
        localStorage.setItem("token", response?.data);
        navigate("/home");
      } else {
        toast.error(response?.message || "An error occurred", { id: toastId });
      }

      if (response?.token) {
        dispatch(setToken(response.token));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      hideLoader();
    }
  };

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
        <Typography
          paddingTop={2}
          fontSize={20}
          color="var(--text-color)"
          fontWeight="bold"
        >
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Please enter your details to login.
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", marginTop: "1rem" }}
        >
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                size="small"
                label="Email Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="password"
                margin="normal"
                size="small"
                label="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          {/* Remember + Forgot */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="90%"
            margin="auto"
            mt={1}
          >
            <Checkbox size="small" />
            <NavLink to="/forgot-password" style={{ fontSize: "0.8rem" }}>
              Forgot Password?
            </NavLink>
          </Box>

          {/* Submit Button */}
          <button className="registerButton">Login</button>
        </form>
        <Divider sx={{ color: "black", my: 1 }}>
          <Typography sx={{ color: "text.primary" }}>OR</Typography>
        </Divider>

        {/* Social Login */}
        <Box display="flex" width="80%" justifyContent="space-around" mt={1}>
          <Facebook />
          <Google />
          <Apple />
        </Box>

        <Typography mt={2} fontSize="0.85rem">
          Don't have an account yet? <NavLink to="/register">Register</NavLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
