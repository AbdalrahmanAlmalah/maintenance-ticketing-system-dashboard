import "./navbar.component.scss";

import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";
import { DarkModeContext } from "../../context/darkModeContext";
import React, { useContext, useState } from "react";
const Navbar = () => {
  const [counter, setCounter] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(true);
    setCounter(0);
  };
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="icon">
          <ConstructionIcon style={{ color: "#7451f8" }}></ConstructionIcon>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon
              className="icon"
              onClick={toggleFullscreen}
            />
          </div>
          <div className="item" onClick={handleClick}>
            <NotificationsNoneOutlinedIcon className="icon" />
            {showDropdown && <div style={{ marginTop: "5.5px" }}>Welcome!</div>}
            <div className="counter">{counter}</div>
          </div>
          <div className="item"></div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
