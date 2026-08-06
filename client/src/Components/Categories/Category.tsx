import { buildQueryString } from "@/helper/apiHelper";
import { Card, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Category = ({
  keyIndex,
  icon,
  title,
  subcategoryId,
}: {
  keyIndex: number;
  icon: React.ReactNode;
  title: string;
  subcategoryId?: string;
}) => {
  const navigate = useNavigate();
  return (
    // <Grid
    //   component={"button"}
    //   onClick={() => {}}
    //   p={0}
    //   flexShrink={0}
    //   display={"flex"}
    //   color={"black"}
    //   bgcolor={"whitesmoke"}
    //   border={"none"}
    //   size={{ xs: 12, sm: 6, md: 1, lg: 2, xl: 2 }}
    // >
    <Card
      key={keyIndex}
      component={"button"}
      elevation={1}
      sx={{
        flexShrink: 0,
        width: "120px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        //  backgroundColor: "transperent"
      }}
      onClick={() => {
        if (!subcategoryId) return;
        console.log("subcategoryId: ", subcategoryId);

        const queryString = buildQueryString({ subcategoryId: subcategoryId });
        console.log("queryString: ", queryString);
        navigate(`/products${queryString}`);
      }}
    >
      {icon}
      <Typography variant="body1" fontSize={"15px"}>
        {title}
      </Typography>
    </Card>
    // </Grid>
  );
};

export default Category;
