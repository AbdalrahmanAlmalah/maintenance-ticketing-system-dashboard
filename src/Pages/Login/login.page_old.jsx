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
import axios from "../../api/axios";
import UseAuth from "../../useAuth/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const AvatarStyle = { backgroundColor: "#3E54AC" };
const btnStyle = { margin: "8px 0", backgroundColor: "#3E54AC" };
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
  const [err, seterr] = useState("");
  const LOGIN_URL = "/login";
  /***** hooks ****/
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []); // Only access focus when userRef is defined
  useEffect(() => {
    seterr("");
  }, [phone, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(user, pwd);
    try {
      const response = await axios.post(
        LOGIN_URL,
        { phone: phone, password: password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response?.data?.roles) {
        const accessToken = response?.data?.token;
        //   console.log(response)
        const roles = [response?.data?.roles];
        const refreshToken = response?.data?.token;

        setAuth({ phone, password, roles, accessToken });
        navigate(from, { replace: true });
      } else {
        seterr(response?.data);
        console.log(response?.data);
      }
    } catch (err) {
      if (!err?.response) {
        seterr("No Server Response");
        console.log(err.message);
      } else {
        seterr("Login Failed");
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
            style={{ color: "#e91e63" }}
            ref={errRef}
            className={err ? "err" : "offscreen"}
            aria-live="assertive"
          >
            {err}
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
          <Button type="submit" fullWidth variant="contained" style={btnStyle}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default Login;
