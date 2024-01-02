import "./sidebar.component.scss";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [userRole, setUserRole] = useState("");
  const [ok, setOk] = useState(false);
  const [ok2,setOk2]=useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    if(document.cookie){
    try {
      await axios.get("/logout", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });
    
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  }
  const handleManagersClick = async () => {
    try {
      const response = await axios.get("/user", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });

      console.log(response?.data.roles);
      setUserRole(response?.data.role);

      if (userRole === "Admin") {
        setOk(true);
      }
      if (userRole === "Manager"){
        setOk2(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    handleManagersClick();
  });

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">System Manager</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
          <p className="title">LISTS</p>
          {(ok || ok2) && (
            <Link to="/techs" style={{ textDecoration: "none" }}>
              <li>
                <EngineeringIcon className="icon" />
                <span>Technicians</span>
              </li>
            </Link>
          )}
          {ok && (
            <Link to="/managers" style={{ textDecoration: "none" }}>
              <li>
                <SupervisorAccountIcon className="icon" />
                <span>Managers</span>
              </li>
            </Link>
          )}
          <Link to="/tickets" style={{ textDecoration: "none" }}>
            <li>
              <ConfirmationNumberIcon className="icon" />
              <span>Tickets</span>
            </li>
          </Link>
          {(!ok &&
          <Link to="/history" style={{ textDecoration: "none" }}>
            <li>
              <HistoryIcon className="icon" />
              <span>History</span>
            </li>
          </Link>
          )}
        
          {(!ok &&
          <Link to="/r&q" style={{ textDecoration: "none" }}>
            <li>
            <DashboardIcon className="icon"/>  
              <span>Q&R</span>
            </li>
          </Link>
          )}
         
          <p className="title">USER</p>
          {ok ?(
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          ) : (
            <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          )}
          <form onSubmit={handleLogout}>
            <li>
              <LogoutIcon className="icon" />
              <span></span>
              <button className="button-like-span" type="submit">
                Logout
              </button>
            </li>
          </form>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
