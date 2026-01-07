import { EmailOutlined } from "@mui/icons-material";
import {
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState, type ReactNode } from "react";

const ForgotPassword = () => {
  const [path, setPath] = useState("reset-password");
  const [registrationData, setRegistrationData] = useState({} as any);
  const handleDataChange = (field: string, value: string) => {
    console.log("field: ", field);

    const { field: f, ...rest } = registrationData;
    setRegistrationData({ [f]: value, ...rest });
  };
  return (
    <Container className="mainContainer" component={"main"} maxWidth="xs">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          boxShadow: "0px 0px 2px",
          // p: 5,
        }}
      >
        <Typography
          paddingTop={3}
          fontSize={20}
          color="var(--text-color)"
          className="title"
          fontWeight={"bold"}
        >
          Forgot Password
        </Typography>
        <p style={{ fontSize: "70%" }}>
          please enter your details to create account
        </p>
        <Container>
          <TextField
            name="email"
            sx={{ marginY: "20px" }}
            type="text"
            inputMode="text"
            className="TextInput"
            size="small"
            color="primary"
            label="Email Address"
            value={registrationData?.email}
            onChange={(e) => handleDataChange(e.target.name, e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <br />
          <br />
          <button className="registerButton">Login</button>
        </Container>
        <br />
        <br />
      </Paper>
    </Container>
  );
};

// const EmailInput = () => {
//   const [registrationData, setRegistrationData] = useState({});
//   const handleDataChange = (field: string, value: string) => {
//     console.log("value: ", value);

//     const { field: f, ...rest } = registrationData;
//     setRegistrationData({ [f]: value, ...rest });
//   };
//   return (
//     <Container className="mainContainer" component={"main"} maxWidth="xs">
//       <Paper
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "start",
//           alignItems: "center",
//           boxShadow: "0px 0px 2px",
//           // p: 5,
//         }}
//       >
//         <Typography
//           paddingTop={3}
//           fontSize={20}
//           color="var(--text-color)"
//           className="title"
//           fontWeight={"bold"}
//         >
//           Forgot Password
//         </Typography>
//         <p style={{ fontSize: "70%" }}>
//           please enter your details to create account
//         </p>
//         <Container>
//           <TextField
//             name="email"
//             sx={{ marginY: "20px" }}
//             type="text"
//             inputMode="text"
//             className="TextInput"
//             size="small"
//             color="primary"
//             label="Email Address"
//             value={registrationData?.email}
//             onChange={(e) => handleDataChange(e.target.name, e.target.value)}
//             slotProps={{
//               input: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailOutlined fontSize="small" />
//                   </InputAdornment>
//                 ),
//               },
//             }}
//           />
//           <br />
//           <br />
//           <button className="registerButton" onClick={(e) => {}}>
//             Login
//           </button>
//         </Container>
//         <br />
//         <br />
//       </Paper>
//     </Container>
//   );
// };
// const EmailSent = () => {
//   const [registrationData, setRegistrationData] = useState({} as any);

//   const handleDataChange = (field: string, value: string) => {
//     console.log("value: ", value);

//     const { field: f, ...rest } = registrationData;
//     setRegistrationData({ [f]: value, ...rest });
//   };
//   return (
//     <Container className="mainContainer" component={"main"} maxWidth="xs">
//       <Paper
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "start",
//           alignItems: "center",
//           boxShadow: "0px 0px 2px",
//           // p: 5,
//         }}
//       >
//         <Typography
//           paddingTop={3}
//           fontSize={20}
//           color="var(--text-color)"
//           className="title"
//           fontWeight={"bold"}
//         >
//           Forgot Password
//         </Typography>
//         <p style={{ fontSize: "70%" }}>
//           please enter your details to create account
//         </p>
//         <Container>
//           <TextField
//             name="email"
//             sx={{ marginY: "20px" }}
//             type="text"
//             inputMode="text"
//             className="TextInput"
//             size="small"
//             color="primary"
//             label="Email Address"
//             value={registrationData?.email}
//             onChange={(e) => handleDataChange(e.target.name, e.target.value)}
//             slotProps={{
//               input: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailOutlined fontSize="small" />
//                   </InputAdornment>
//                 ),
//               },
//             }}
//           />
//           <br />
//           <br />
//           <button className="registerButton">Login</button>
//         </Container>
//         <br />
//         <br />
//       </Paper>
//     </Container>
//   );
// };

const paths: Record<string, ReactNode> = {
  // email: EmailInput(),
  // "email-sent": EmailSent(),
};
export default ForgotPassword;
