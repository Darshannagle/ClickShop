import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const OutlinedButton = styled(Button)({
  backgroundColor: "var(--secondary-color)",
  textDecoration: "none",
  textTransform: "none",
  color: "var(--primary-color)",
  fontWeight: 100,
  fontSize: "12px",
  border: "1px solid var(--primary-color)",
  borderRadius: "5px",
  padding: "5px 7px",

  // width: { xs: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" },
  // boxShadow: "0 0 5px 5px var(--primary-color)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",

  "&:hover": {
    backgroundColor: "var(--secondary-color)",
    color: "var(--primary-color)",
    borderColor: "var(--primary-color)",
    transform: "scale(1.1)",
    boxShadow: "0 0 8px 6px var(--primary-color)",
  },
});

export default OutlinedButton;
