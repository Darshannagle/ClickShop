import { Box, IconButton, Typography } from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  CameraAlt,
  Computer,
  Headphones,
  PhoneAndroid,
  TabletAndroid,
  Watch,
} from "@mui/icons-material";
import { useRef } from "react";
import Category from "./Category";
// import Category from "../Category";
// List of categories

const categories = [
  {
    icon: <PhoneAndroid />,
    title: "Phones",
    subcategoryId: "b795d9fa-ca40-40cb-9366-e6db707b03eb",
  },
  {
    icon: <TabletAndroid />,
    title: "Tablets",
    subcategoryId: "ef9eb8d6-4523-4488-b343-656431cc2b29",
  },
  {
    icon: <Computer />,
    title: "Computers",
    subcategoryId: "12a74110-708f-4580-b8c9-3e5b3df62383",
  },
  {
    icon: <Watch />,
    title: "Watches",
    subcategoryId: "52db2156-6cdf-4e63-adc2-3a836735681d",
  },
  {
    icon: <Headphones />,
    title: "Headphones",
    subcategoryId: "de25d82d-0dac-4b8a-b40c-131c7b07f2bd",
  },
  {
    icon: <CameraAlt />,
    title: "Cameras",
    subcategoryId: "746b6453-d5f1-470f-b892-07ee8b427079",
  },
];

const Categories = () => {
  const scrollRef = useRef(null);

  const scroll = (offset: number) => {
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
          p: 2,
          overflowX: "scroll",
          scrollBehavior: "smooth",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {(categories || []).map((category, i: number) => (
          // <Box
          //   key={i}
          //   sx={{
          //     width: 125,
          //     border: "none",
          //     bordeRadius: 20,
          //     // width: "max-content",
          //     height: 125,
          //     bgcolor: "primary.main",
          //     color: "#fff",
          //     borderRadius: 2,
          //     display: "flex",
          //     justifyContent: "center",
          //     alignItems: "center",
          //     flexShrink: 0,
          //   }}
          // >
          <Category
            keyIndex={i}
            icon={category?.icon}
            title={category?.title}
            subcategoryId={category?.subcategoryId}
          />
          // </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
