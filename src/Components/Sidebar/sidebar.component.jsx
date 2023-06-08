import "./sidebar.component.scss";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import React, { useContext } from "react";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">System Admin</span>
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
          <Link to="/technicians" style={{ textDecoration: "none" }}>
            <li>
              <EngineeringIcon className="icon" />
              <span>Technicians</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <SupervisorAccountIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/tickets" style={{ textDecoration: "none" }}>
            <li>
              <ConfirmationNumberIcon className="icon" />
              <span>Tickets</span>
            </li>
          </Link>
          <Link to="/history" style={{ textDecoration: "none" }}>
            <li>
              <HistoryIcon className="icon" />

              <span>History</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <li>
            <NotificationsIcon className="icon" />
            <span>Notifications</span>
          </li>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
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
