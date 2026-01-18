import { styled } from "@mui/material/styles";
import Button, { type ButtonOwnProps } from "@mui/material/Button";
import type React from "react";
interface OutlinedButtonProps extends ButtonOwnProps {
  colorType?: string;
  scaleOnHover?: boolean;
  width?: string | number;
  fontSize?: string | number;
  m?: string | number;
  visibility?: string;
  onClick?: () => void;
  // add any other custom props you destructure/use
}
const OutlinedButton: React.FC<OutlinedButtonProps> = styled(Button)(
  ({
    // theme,
    colorType = "secondary",
    scaleOnHover = true,
    width = "100%",
    fontSize = "12px",
    m = 0,
    onClick = () => {},
    visibility = "visible",
  }) => ({
    visibility: visibility,
    onClick: onClick,
    backgroundColor: "transparent",
    textTransform: "none",
    fontWeight: 500,
    borderRadius: "5px",
    padding: "5px 7px",
    width: width,
    fontsize: fontSize,
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
      m: m,
    },
  }),
);

export default OutlinedButton;
