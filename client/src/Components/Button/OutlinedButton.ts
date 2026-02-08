import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

/* 1️⃣ Define ONLY custom props */
interface OutlinedButtonProps {
  colorType?: "primary" | "secondary";
  scaleOnHover?: boolean;
  width?: string | number;
  fontSize?: string | number;
  m?: string | number;
  visibility?: "visible" | "hidden";
}

/* 2️⃣ Prevent custom props from reaching DOM */
const OutlinedButton = styled(Button, {
  shouldForwardProp: (prop) =>
    ![
      "colorType",
      "scaleOnHover",
      "width",
      "fontSize",
      "m",
      "visibility",
    ].includes(prop as string),
})<OutlinedButtonProps>(
  ({
    colorType = "secondary",
    scaleOnHover = true,
    width = "100%",
    fontSize = "12px",
    m = 0,
    visibility = "visible",
    display = "flex",
  }) => ({
    visibility,
    backgroundColor: "transparent",
    textTransform: "none",
    fontWeight: 500,
    borderRadius: "5px",
    padding: "5px 7px",
    width,
    fontSize,
    margin: m,
    display,
    color:
      colorType === "primary"
        ? "var(--primary-color)"
        : "var(--secondary-color)",

    border: `1px solid ${
      colorType === "primary"
        ? "var(--primary-color)"
        : "var(--secondary-color)"
    }`,

    transition: "transform 0.2s ease, box-shadow 0.2s ease",

    "&:hover": {
      backgroundColor:
        colorType === "primary"
          ? "var(--primary-color)"
          : "var(--secondary-color)",

      color: "var(--primary-color)",
      borderColor: "var(--primary-color)",

      transform: scaleOnHover ? "scale(1.1)" : "none",
      boxShadow: scaleOnHover ? "0 0 8px 6px var(--primary-color)" : "none",
    },
  }),
);

export default OutlinedButton;
