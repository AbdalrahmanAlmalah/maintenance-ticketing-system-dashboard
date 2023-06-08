import { useRef, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import axios from "axios";
import UseAuth from "../../useAuth/useAuth";
import {  useNavigate, useLocation } from "react-router-dom";
//const LOGIN_URL = "/auth";

const AvatarStyle = { backgroundColor: "#3E54AC" };
const btnStyle = { margin: "8px 0" };
const TxtFiled = { margin: "8px 0" };
const paperStyle = {
  padding: 20,
  height: "73vh",
  width: 300,
  margin: "0 auto",
};
const Login = ({ handleChange }) => {
  const { setAuth } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  /* app ref and state */
  const userRef = useRef(null); // Initialize with null
  const errRef = useRef();

  const [phone, setPhone] = useState("");
  const [password, setPwd] = useState("");
  /* success  & fail  */
  const [errMsg, setErrMsg] = useState("");

  /***** hooks ****/
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []); // Only access focus when userRef is defined
  useEffect(() => {
    setErrMsg("");
  }, [phone, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(user, pwd);
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { phone: phone, password: password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      console.log(JSON.stringify(response?.data));
      console.log(response?.data?.roles || "Role is undefined");

      const accessToken = response?.data?.accessToken;
      const roles = [response?.data?.roles];
     
      setAuth({ phone, password, roles, accessToken });
      navigate(from, { replace: true });
      setPwd("");
      setPhone("");
      console.log(errMsg);
    } catch (err) {
      if (!err?.response) {
         setErrMsg("No Server Response");
        console.log(err.message);
      } else if (err.response?.status === 400) {
        setErrMsg("Missing phone or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={AvatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2> Sign In </h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <TextField
            label="phone"
            placeholder="Enter phone"
            fullWidth
            style={TxtFiled}
            autoComplete="off"
            ref={userRef}
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />
          <TextField
            style={TxtFiled}
            label="Password"
            placeholder="Enter Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPwd(e.target.value)}
          />
          <FormControlLabel
            label="Remember me"
            control={<Checkbox name="CheckedB" color="primary" />}
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            style={btnStyle}
          >
            Sign In
          </Button>
        </form>
        
      </Paper>
    </Grid>
  );
};
export default Login;
