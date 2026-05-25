import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

/* Custom props ONLY */
interface ContainedButtonProps {
  colorType?: "primary" | "secondary";
  scaleOnHover?: boolean;
  width?: string | number;
  fontSize?: string | number;
  m?: string | number;
  visibility?: "visible" | "hidden";
}

const ContainedButton = styled(Button, {
  shouldForwardProp: (prop) =>
    ![
      "colorType",
      "scaleOnHover",
      "width",
      "fontSize",
      "m",
      "visibility",
    ].includes(prop as string),
})<ContainedButtonProps>(
  ({
    colorType = "secondary",
    scaleOnHover = true,
    width = "100%",
    fontSize = "12px",
    m = 0,
    visibility = "visible",
  }) => ({
    visibility,
    textTransform: "none",
    fontWeight: 500,
    borderRadius: "5px",
    padding: "5px 7px",
    width,
    fontSize,
    margin: m,

    color:
      colorType === "primary"
        ? "var(--secondary-color)"
        : "var(--primary-color)",

    backgroundColor:
      colorType === "primary"
        ? "var(--primary-color)"
        : "var(--secondary-color)",

    transition: "transform 0.2s ease, box-shadow 0.2s ease",

    /* ❌ Disable hover when disabled */
    "&:hover": {
      transform: scaleOnHover ? "scale(1.1)" : "none",
      boxShadow: scaleOnHover ? "0 0 8px 6px var(--primary-color)" : "none",
    },

    /* ✅ Proper disabled styling */
    "&.Mui-disabled": {
      opacity: 0.5,
      pointerEvents: "none",
      transform: "none",
      boxShadow: "none",
    },
  })
);

export default ContainedButton;
