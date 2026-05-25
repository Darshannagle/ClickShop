// src/components/GlobalLoader.tsx
import { Box } from "@mui/material";
import LottiePlayerLight from "react-lottie-player"; // Light version = no eval
import loaderAnimation from "../../assets/Animation - 1721705624958.json";

const GlobalLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        bgcolor: "rgba(255,255,255,0.7)",
        zIndex: 1500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: 160, height: 160 }}>
        <LottiePlayerLight
          animationData={loaderAnimation}
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </Box>
  );
};

export default GlobalLoader;
