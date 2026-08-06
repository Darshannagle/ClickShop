import { Box, Grid, Typography } from "@mui/material";
import IphoneImage from "../../assets/Images/IphoneImage.png";
import MacbookAir14 from "../../assets/Images/MacbookAir14.png";
import PlayStation from "../../assets/Images/PlayStation.png";
import AppleAirpodsMax from "../../assets/Images/AppleAirpodsMax.png";
import AppleVisionPro from "../../assets/Images/AppleVisionPro.png";
import "../../index.scss";
import { useNavigate } from "react-router-dom";
import OutlinedButton from "../Button/OutlinedButton";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        p: 0,
        m: 0,
      }}
    >
      {/* ▬▬▬ MAIN BANNER ▬▬▬ */}
      <Box
        sx={{
          width: "100%",
          mx: 0,
          overflowX: "hidden",
          height: "100%",
          // minHeight: { xs: 500, sm: 600, md: 700 },
          background: "#211C24",
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
            "--Grid-padding": 0,
            p: 0,
            m: 0,
          }}
        >
          {/* LEFT */}
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              justifyContent: "center",
              alignItems: { xs: "center", sm: "flex-start" },
              textAlign: { xs: "center", sm: "left" },
              px: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "gray" }}
            >
              Pro. Beyond.
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 100,
                color: "white",
                fontSize: { xs: 40, md: 60 },
              }}
            >
              iPhone 14 <b>Pro</b>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "lighter",
                color: "#ccc",
                maxWidth: 400,
              }}
            >
              Created to change everything for the better. For everyone.
            </Typography>

            <OutlinedButton
              width={{ xs: "70%", md: "25%" }}
              variant="outlined"
              sx={{
                height: "40px",
                mx: "5px",
                mt: 2,
                color: "var(--primary-color)",
                borderColor: "var(--primary-color)",
              }}
              onClick={() => {
                const queryString = new URLSearchParams({
                  category: "iPhone 14 Pro",
                }).toString();
                navigate(`/products?${queryString}`);
              }}
            >
              Shop Now
            </OutlinedButton>
          </Grid>

          {/* RIGHT IMAGE */}
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 2,
            }}
          >
            <Box
              component="img"
              src={IphoneImage}
              alt="iPhone"
              sx={{
                width: { xs: "70%" },
                height: "auto",
                objectFit: "contain",
                marginBottom: 0,
                // border:"1px solid white"
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* ▬▬▬ SECONDARY BANNER ▬▬▬ */}
      {/* <Box
        sx={{
          border: "1px solid green",
          marginTop: 0,
          height: "auto",
          padding: 0,
          width: "100%",
          py: { xs: 2, sm: 4 },
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "end",
        }}
      > */}
      <Grid
        container
        width="100%"
        spacing={0}
        sx={{
          m: 0,
          p: 0,
          // border: "1px solid red",
          "--Grid-padding": 0, // ⭐ REMOVE ALL INTERNAL GRID PADDING
        }}
      >
        {/* LEFT SIDE */}
        <Grid
          container
          size={{ xs: 12, sm: 6 }}
          sx={{
            // border: "1px solid black",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "start",
          }}
        >
          <Grid container width="100%" spacing={0} sx={{ "--Grid-padding": 0 }}>
            {/* LEFT IMAGE + TEXT */}
            <Grid
              container
              size={{ xs: 12 }}
              sx={{
                borderRight: "1px solid #ccc",
                // border: "1px solid black",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={PlayStation}
                sx={{
                  display: "block",
                  p: 1,
                  height: "auto",
                  width: "40%",
                }}
              />
              <Box sx={{ width: "55%" }}>
                <Typography variant="body1" sx={{ fontWeight: 300 }}>
                  Playstation 5
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "10px", color: "gray" }}
                >
                  Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                  will redefine your PlayStation experience.
                </Typography>
              </Box>
            </Grid>

            {/* RIGHT SMALL GRID */}
            <Grid
              size={{ xs: 12 }}
              sx={{
                // border: "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                container
                width="100%"
                spacing={0}
                display={"flex"}
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent={"center"}
                sx={{ "--Grid-padding": 0 }}
              >
                <Grid
                  size={{ xs: 12, sm: 6 }}
                  sx={{
                    flexDirection: { xs: "column", md: "row" },
                    // border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={AppleAirpodsMax}
                    sx={{
                      transform: { md: "translateX(-50%)" },

                      display: "block",
                      marginLeft: 0,
                      p: 0,
                      // border: "1px solid red",
                      height: { xs: "auto", sm: "80%" },
                      width: "40%",
                    }}
                  />

                  <Box
                    sx={{
                      width: "60%",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 300 }}>
                      Apple AirPods Max
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "10px", color: "gray" }}
                    >
                      Computational audio. Listen, it's powerful
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  size={{ xs: 12, sm: 6 }}
                  sx={{
                    display: "flex",
                    color: "white",
                    backgroundColor: "#353535",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={AppleVisionPro}
                    sx={{
                      display: "block",
                      marginLeft: 0,
                      p: 0,
                      // border: "1px solid red",
                      // height: { xs: "auto", sm: "80%" },
                      transform: { md: "translateX(-20%)" },
                      height: "auto",
                      // width: { xs: "40%", md: "80%" },
                      width: { xs: "40%", md: "30%" },
                    }}
                  />

                  <Box sx={{ width: "60%" }}>
                    <Typography variant="body1" sx={{ fontWeight: 300 }}>
                      Apple Vision Pro
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "10px", color: "gray" }}
                    >
                      An immersive way to experience entertainment
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid
          container
          size={{ xs: 12, sm: 6 }}
          sx={{
            // m: 1,
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: { xs: "center", md: "space-around" },
            alignItems: { xs: "center", md: "space-around" },
            p: 1,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              my: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Macbook
            </Typography>
            <Typography variant="body1" sx={{ letterSpacing: "1px" }}>
              Air
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: "10px", color: "gray" }}
            >
              The new 15-inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </Typography>

            <OutlinedButton
              variant="outlined"
              width={"40%"}
              sx={{
                mt: 2,
                color: "var(--secondary-color)",
                borderColor: "var(--secondary-color)",
              }}
            >
              Shop Now
            </OutlinedButton>
          </Box>

          <Box
            component="img"
            src={MacbookAir14}
            sx={{
              height: { xs: "auto", sm: "80%" },
              transform: { md: "translateX(60%)" },

              display: "flex",
              marginBottom: { xs: 0, md: 0 },
              m: 0,
              p: 0,
              width: { xs: "60%", sm: "50%" },
            }}
          />
        </Grid>
      </Grid>
    </Box>
    // </Box>
  );
};

export default Banner;
