import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Not Found</h2>
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
        onClick={() => {
          navigate("/home");
        }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
