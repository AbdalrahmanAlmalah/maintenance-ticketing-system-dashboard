import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Login from "../Login/login.page";

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3E54AC",
      dark: "#002884",
    },
    secondary: {
      main: "#f44336",
      dark: "#ba000d",
    },
  },
});

const SignInOutContainer = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const paperStyle = { width: 600, margin: "80px auto", padding: "40px" };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          aria-label="disabled tabs example"
          textColor="primary"
          sx={{ padding: "20px", margin: "auto" }}
        >
          <Tab label="Sign In" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login handleChange={handleChange} />
        </TabPanel>
      </Paper>
    </ThemeProvider>
  );
};
export default SignInOutContainer;
