import { Box, Grid, Typography, Button, styled } from "@mui/material";
import IphoneImage from "../../assets/Images/IphoneImage.png";
import MacbookAir14 from "../../assets/Images/MacbookAir14.png";
import PlayStation from "../../assets/Images/PlayStation.png";
import AppleAirpodsMax from "../../assets/Images/AppleAirpodsMax.png";
import AppleVisionPro from "../../assets/Images/AppleVisionPro.png";
import "../../index.scss";

const CustomButton = styled(Button)(() => ({
  textTransform: "none",
}));

const Banner = () => {
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
            <Typography variant="body1" sx={{ color: "gray" }}>
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

            <CustomButton
              variant="outlined"
              sx={{
                mt: 2,
                color: "var(--primary-color)",
                borderColor: "var(--primary-color)",
              }}
            >
              Shop Now
            </CustomButton>
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
                <Typography variant="body1" sx={{ color: "gray" }}>
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
                      display: "block",
                      marginLeft: 0,
                      p: 0,
                      // border: "1px solid red",
                      height: "auto",
                      width: "40%",
                    }}
                  />

                  <Box sx={{ width: "60%" }}>
                    <Typography variant="body1" sx={{ fontWeight: 300 }}>
                      Apple Vision Pro{" "}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "gray" }}>
                      An immersive way to experience entertainment{" "}
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  size={{ xs: 12, sm: 6 }}
                  sx={{
                    // border: "1px solid black",
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
                      height: "auto",
                      width: "40%",
                    }}
                  />

                  <Box sx={{ width: "60%" }}>
                    <Typography variant="body1" sx={{ fontWeight: 300 }}>
                      Apple AirPods Max
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#909090" }}>
                      Computational audio. Listen, it's powerful
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
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: { xs: "center", md: "space-around" },
            alignItems: { xs: "center", md: "space-around" },
            p: 0,
          }}
        >
          <Box
            sx={{
              width: "60%",
              // display: "flex",
              textAlign: "center",
              // flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                fontWeight: 600,
                // border: "1px solid",
              }}
            >
              Macbook
            </Typography>
            <Typography variant="body1" sx={{ letterSpacing: "1px" }}>
              Air
            </Typography>

            <Typography variant="body1" sx={{ color: "gray" }}>
              The new 15-inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </Typography>

            <CustomButton
              variant="outlined"
              sx={{
                mt: 2,
                width: { sm: "100%", md: 100 },
                color: "var(--secondary-color)",
                borderColor: "var(--secondary-color)",
              }}
            >
              Shop Now
            </CustomButton>
          </Box>

          <Box
            component="img"
            src={MacbookAir14}
            sx={{
              display: "block",
              marginBottom: { xs: 10, md: 0 },
              m: 0,
              p: 0,
              width: "30%",
            }}
          />
        </Grid>
      </Grid>
    </Box>
    // </Box>
  );
};

export default Banner;
