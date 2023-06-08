//import axios from "../../api/axios";
import { useRef, useEffect, useState } from "react";
//import AddressForm from "../popUpForm/adressForm.component";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
  Select,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

/* material ui styling */
const paperStyle = { padding: 20, width: 800, margin: "0 auto" };
const headerStyle = { margin: 0 };
const marginTop = { marginTop: 5 };
const AvatarStyle = { backgroundColor: "#3E54AC" };
const btnStyle = { margin: "8px 0" };
const TxtFiled = { margin: "8px 0" };
/* REGEX */
const USERNAME_REGEX =
  /^[a-zA-Z0-9_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]{4,16}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const PHONE_NUMBER_REGEX = /^09[3-9]\d{7}$/;
const regions = ["babtoma", "hamra", "baghdad"];

const SignUp = ({ handleChange }) => {
  /* App ref and state */
  const userRef = useRef();
  const errRef = useRef();
  const [name, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setpassword] = useState("");
  const [validpassword, setValidpassword] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);

  const [matchpassword, setMatchpassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [phone, setphone] = useState("");
  const [validphone, setValidphone] = useState(false);
  const [phoneFocus, setphoneFocus] = useState(false);

  const [region, setRegion] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [flat, setFlat] = useState("");

  /* success and fail */
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const SIGN_UP_URL = "/signup";

  /***** hooks ****/
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USERNAME_REGEX.test(name);
    const v2 = PASSWORD_REGEX.test(password);
    const v3 = PHONE_NUMBER_REGEX.test(phone);

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      /* const response = await axios.post(
        SIGN_UP_URL,
        JSON.stringify({ name, password, phone ,region,building,flat,floor}),
        {
          headers: { "content-type": "application/json" },
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      // Clear input fields
      setUser("");
      setpassword("");
      setMatchpassword("");
      setphone("");
      setRegion("");
      setBuilding("");
      setFloor("");
      setFlat(""); */
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    const result = USERNAME_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidpassword(result);
    const match = password === matchpassword;
    setValidMatch(match);
  }, [password, matchpassword]);

  useEffect(() => {
    setErrMsg("");
  }, [name, password, matchpassword]);

  useEffect(() => {
    const result = PHONE_NUMBER_REGEX.test(phone);
    setValidphone(result);
  }, [phone]);

  /* Front */

  return (
    <>
      {success ? (
        <Typography variant="caption" gutterBottom>
          Success!
          <Link href="#" onClick={() => handleChange("event", 0)}>
            Sign In
          </Link>
        </Typography>
      ) : (
        <Grid container justifyContent="center">
          <Grid item>
            <Paper style={paperStyle}>
              <Grid align="center">
                <Avatar style={AvatarStyle}>
                  <AddCircleOutlineOutlinedIcon />
                </Avatar>
                <h2 style={headerStyle}>Sign Up</h2>
                <Typography variant="caption" gutterBottom>
                  Please fill this form to create an account
                </Typography>
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
                  label="Username"
                  id="Username"
                  placeholder="Enter Username"
                  fullWidth
                  style={TxtFiled}
                  autoComplete="off"
                  ref={userRef}
                  value={name}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />

                <TextField
                  style={TxtFiled}
                  label="Phone Number"
                  id="phone"
                  placeholder="Enter phone number"
                  type="number"
                  fullWidth
                  required
                  autoComplete="off"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  aria-invalid={validphone ? "false" : "true"}
                  aria-describedby="phonenote"
                  onFocus={() => setphoneFocus(true)}
                  onBlur={() => setphoneFocus(false)}
                />

                <TextField
                  id="Password"
                  style={TxtFiled}
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  aria-invalid={validpassword ? "false" : "true"}
                  aria-describedby="passwordnote"
                  onFocus={() => setpasswordFocus(true)}
                  onBlur={() => setpasswordFocus(false)}
                />

                <TextField
                  style={TxtFiled}
                  id="confirm_password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  fullWidth
                  required
                  value={matchpassword}
                  onChange={(e) => setMatchpassword(e.target.value)}
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />

                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      select
                      label="Region"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      fullWidth
                      required
                    >
                      {regions.map((region) => (
                        <MenuItem key={region} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Building"
                      id="Building"
                      placeholder="Enter building"
                      fullWidth
                      style={TxtFiled}
                      autoComplete="off"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Floor"
                      id="Floor"
                      placeholder="Enter floor"
                      fullWidth
                      style={TxtFiled}
                      autoComplete="off"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Flat"
                      id="Flat"
                      placeholder="Enter flat"
                      fullWidth
                      style={TxtFiled}
                      autoComplete="off"
                      value={flat}
                      onChange={(e) => setFlat(e.target.value)}
                      required
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  style={btnStyle}
                  disabled={!validName || !validMatch}
                >
                  Sign Up
                </Button>
                <Typography>
                  Do you have an account?{" "}
                  <Link href="#" onClick={() => handleChange("event", 0)}>
                    Sign In
                  </Link>
                </Typography>
              </form>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SignUp;
