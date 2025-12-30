import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import reactLogo from "../../assets/react.svg";
const TopTrends = () => {
  return (
    <Container maxWidth={false}>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        alignContent="stretch"
        wrap="wrap"
      >
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3, xl: 3 }}>
          {/* <Card> */}
          <img src={reactLogo} alt="" />
          {/*  */}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3, xl: 3 }}>
          <img
            srcSet={`${reactLogo}?w=100&h=100&auto=format&fit=crop`}
            src={`${reactLogo}?w=100&h=100`}
            alt=""
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3, xl: 3 }}>
          <img src={reactLogo} alt="" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3, xl: 3 }}>
          <img
            // width={{ xs: 12, sm: 6, md: 3, lg: 3, xl: 3 }}
            src={reactLogo}
            alt=""
            // style={{ border: "2px solid", borderRadius: "5px" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TopTrends;
