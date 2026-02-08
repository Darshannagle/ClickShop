import { Box, IconButton, Typography } from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  CameraAlt,
  Computer,
  Games,
  Headphones,
  PhoneAndroid,
  Watch,
} from "@mui/icons-material";
import { useRef } from "react";
import Category from "./Category";
// import Category from "../Category";
// List of categories
const categories = [
  { icon: <PhoneAndroid />, title: "Phones" },
  { icon: <Computer />, title: "Computers" },
  { icon: <Watch />, title: "Watches" },
  { icon: <Headphones />, title: "Headphones" },
  { icon: <CameraAlt />, title: "Cameras" },
  { icon: <Games />, title: "Games" },
];

const Categories = () => {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box width="100%" p={1} bgcolor={"whitesmoke"}>
      {/* HEADER */}
      <Box
        m={2}
        mt={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Browse By Category
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => scroll(-250)}
            sx={{
              width: 32,
              height: 32,
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <ArrowLeft fontSize="small" />
          </IconButton>

          <IconButton
            onClick={() => scroll(250)}
            sx={{
              width: 32,
              height: 32,
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <ArrowRight fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* SCROLLING LIST */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 2,
          mt: 2,
          overflowX: "auto",
          scrollBehavior: "smooth",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {(categories || []).map((category, i: number) => (
          <Box
            key={i}
            sx={{
              width: 125,
              border: "none",
              bordeRadius: 20,
              // width: "max-content",
              height: 125,
              bgcolor: "primary.main",
              color: "#fff",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Category icon={category.icon} title={category.title} />
          </Box>
        ))}

        {/* <Category icon={<PhoneAndroid />} title={"Phones"} />
        <Category icon={<Watch />} title={"Smart Watches"} />
        <Category icon={<CameraAlt />} title={"Cameras"} />
        <Category icon={<Headphones />} title={"Headphones"} />
        <Category icon={<Computer />} title={"Computers"} />
        <Category icon={<Games />} title={"Gaming"} /> */}
      </Box>
    </Box>
  );
};

export default Categories;
