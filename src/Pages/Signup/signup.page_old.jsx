import axios from "../../api/axios"
import { useRef, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";

/* material ui styling */
const paperStyle = { padding: 20, width: 500, margin: "0 auto" };
const headerStyle = { margin: 0 };
const AvatarStyle = { backgroundColor: "#3E54AC" };
const btnStyle = { margin: "8px 0" };
const TxtFiled = { margin: "8px 0" };

const SignUp = ({ handleChange }) => {
  const navigate = useNavigate();
  const [name, setUser] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [matchpassword, setMatchPassword] = useState("");
  const [region, setRegion] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [flat, setFlat] = useState("");

  const [validMatch, setValidMatch] = useState(false);
  const [regions, setRegions] = useState([]);
  const [err, setErr] = useState("");
  const errRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/signup", 
      { name, phone, password, region, street, building, floor, flat }
      );
      if (response?.data?.roles) {
        const token = JSON.stringify(response?.data);
        localStorage.setItem("token", token);
        navigate("/");
        window.location.reload();
      } else {
        setErr(response?.data);
      }
    } catch (err) {
      setErr(err.message);
    }
  };

  useEffect(() => {
    const match = password === matchpassword;
    setValidMatch(match);
  }, [password, matchpassword]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/regions");
        setRegions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item>
          <Paper style={paperStyle}>
            <Grid align="center">
              <Avatar style={AvatarStyle}>
                <AddCircleOutlineOutlinedIcon />
              </Avatar>
              <h2 style={headerStyle}>Sign Up</h2>
              <Typography variant="caption" gutterBottom sx={{font:"20px"}}>
                Please fill this form to create an account
              </Typography>
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    placeholder="Enter Name"
                    fullWidth
                    style={TxtFiled}
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={TxtFiled}
                    label="Phone Number"
                    placeholder="Enter phone number"
                    type="number"
                    fullWidth
                    required
                    autoComplete="off"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={TxtFiled}
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={TxtFiled}
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    fullWidth
                    required
                    value={matchpassword}
                    onChange={(e) => setMatchPassword(e.target.value)}
                    error={!validMatch}
                    helperText={!validMatch && "Passwords do not match"}
                    aria-invalid={!validMatch}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    fullWidth
                    style={TxtFiled}
                    required
                  >
                    {regions.map((regionItem, index) => (
                      <MenuItem key={index} value={regionItem.name}>
                        {regionItem.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Street"
                    placeholder="Enter street"
                    fullWidth
                    style={TxtFiled}
                    autoComplete="off"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Building"
                    placeholder="Enter building"
                    fullWidth
                    style={TxtFiled}
                    autoComplete="off"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Floor"
                    placeholder="Enter floor"
                    fullWidth
                    style={TxtFiled}
                    autoComplete="off"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Flat"
                    placeholder="Enter flat"
                    fullWidth
                    style={TxtFiled}
                    autoComplete="off"
                    value={flat}
                    onChange={(e) => setFlat(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    color="primary"
                    fullWidth
                    variant="contained"
                    style={btnStyle}
                    disabled={!validMatch}
                  > Sign Up </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;