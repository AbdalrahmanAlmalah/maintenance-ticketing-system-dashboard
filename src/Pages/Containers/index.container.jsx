import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Login from "../Login/login.page";
import SignUp from "../Signup/signup.page";
const SignInOutContainer = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const paperStyle = { width: 900, margin: "20px auto" };
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
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        aria-label="disabled tabs example"
        textColor="primary" 
        sx={{padding:"20px",margin :"auto"}}
      >
        <Tab label="Sign In" />
<Tab label="Sign Up"/>
  
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp handleChange={handleChange} />
      </TabPanel>

    </Paper>
  );
};
export default SignInOutContainer;
