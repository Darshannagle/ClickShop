import { Card, Typography } from "@mui/material";
import React from "react";

const Category = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
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
      component={"button"}
      elevation={4}
      sx={{ width: "100%", height: "100%" }}
    >
      {icon}
      <Typography variant="body1">{title}</Typography>
    </Card>
    // </Grid>
  );
};

export default Category;
