import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { getAPIData } from "../helpers/apiHelper";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  List,
  CardContent,
  Typography,
} from "@mui/material";
import { Email, Menu, More, MoreVert } from "@mui/icons-material";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const data = await getAPIData("/api/user/list");
      setUsers(data);
    } catch (error) {
      console.log("error while fetching users : ", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Container maxWidth={false} sx={{ border: "1px", mt: 1 }}>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        alignContent="stretch"
        wrap="wrap"
      >
        {users?.length &&
          users.map((user) => {
            return (
              <Grid
                key={user?.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}
              >
                <Card key={user?.id}>
                  <CardHeader
                    avatar={<Avatar aria-label="">{user?.fname[0]}</Avatar>}
                    action={
                      <IconButton aria-label="">
                        <MoreVert />
                      </IconButton>
                    }
                    title={user?.fname + " " + user.lname}
                    subheader={user?.location ?? "-"}
                  />
                  <CardContent
                    sx={{
                      mt: 0,
                      width: "90%",
                      // border: "1px solid black",
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="body2">
                      email: {user?.email ?? "-"}
                    </Typography>
                    <Typography variant="body2">
                      phone: {user?.phone ?? "-"}
                    </Typography>
                    <Typography variant="body2">
                      gender: {user?.gender ?? "-"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Dashboard;
