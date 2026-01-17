import "../index.scss";
import Banner from "../Components/Banners/Banner";
import Categories from "../Components/Categories/Categories";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import CustomTabPanel from "../Components/CustomTabPanel";
import Products from "../Components/Products/Products";
import { endPoint } from "../config/siteConfig";
import { getAPIData } from "../helpers/apiHelper";
const Home = () => {
  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const url = endPoint.product.list;
    const queryparams = {
      page: 0,
      size: 10,
      sortField: "name",
      direction: "asc",
    };
    const prodRes = await getAPIData(url, queryparams, "GET");
    if (prodRes?.status) {
      console.log("prodRes?.data: ", prodRes?.data);
      setProducts(prodRes?.data?.content);
    } else {
      console.log(prodRes);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [tab]);
  const changeTab = (event, tab) => {
    console.log(event);
    setTab(tab);
  };
  return (
    <>
      <Banner />
      {/* <Box>
        <Box
          mt={1}
          display={"flex"}
          // border={"1px solid red"}
          alignItems={"end"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" width={"40%"}>
            Browse By Category
          </Typography>
          <Box>
            <IconButton
              aria-label=""
              sx={{ p: 0, my: 0, borderRadius: "0px" }}
              onClick={() => {}}
            >
              <ArrowLeft />
            </IconButton>
            <IconButton
              aria-label=""
              sx={{ p: 0, my: 0, borderRadius: "0px" }}
              onClick={() => {}}
            >
              <ArrowRight />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ pb: 1 }}>
          <Grid
            container
            columns={{ sm: 16, xl: 2 }}
            display={"flex"}
            justifyContent={"center"}
            spacing={{ xs: 1, sm: 2, md: 3 }}
            wrap="wrap"
            paddingTop={5}
          >
            <Category icon={<PhoneAndroid />} title={"Phones"} />
            <Category icon={<Watch />} title={"Smart Watches"} />
            <Category icon={<CameraAlt />} title={"Cameras"} />
            <Category icon={<Headphones />} title={"Headphones"} />
            <Category icon={<Computer />} title={"Computers"} />
            <Category icon={<Games />} title={"Gaming"} />
          </Grid>
        </Box>
      </Box> */}
      <Categories />
      <Box>
        {/* <TabContext value={tab}></TabContext> */}
        <Tabs
          value={tab}
          onChange={changeTab}
          aria-label=""
          variant="standard"
          TabIndicatorProps={{ style: { backgroundColor: "black" } }}

          // textColor="var(--secondary-color)"
          // indicatorColor="var(--secondary-color)"
        >
          <Tab
            className="tab"
            label={"New Arrival"}
            sx={{
              textTransform: "none",
              color: tab === 0 ? "black" : "silver",
              "&.Mui-selected": { color: "black", fontWeight: "bold" },
            }}
          ></Tab>
          <Tab
            className="tab"
            label={"Best Sellers"}
            sx={{
              textTransform: "none",
              color: tab === 1 ? "black" : "silver",
              "&.Mui-selected": { color: "black", fontWeight: "bold" },
            }}
          ></Tab>
          <Tab
            className="tab"
            label={"Featured Products"}
            sx={{
              textTransform: "none",
              color: tab === 2 ? "black" : "silver",
              "&.Mui-selected": { color: "black", fontWeight: "bold" },
            }}
          ></Tab>
        </Tabs>
        <CustomTabPanel value={tab} index={0}>
          <Products products={products} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          1
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          1
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Home;
