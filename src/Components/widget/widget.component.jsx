import "./widget.component.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "../../api/axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Widget = ({ type }) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);

  const fetchData = async () => {
    if (document.cookie) {
      try {
        const response = await axios.get(`/users`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const techsNumber = response?.data.filter(
          (tech) => tech.role === "Technician"
        ).length;
        // console.log(techsnus);
        const userNumber = response?.data.length;
        //console.log(userNumber);
        const response3 = await axios.get(`/tickets`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const ticketsNumber = response3?.data.length;
        const newTicketsNumber = response3?.data;
        const newTicketsCount = newTicketsNumber.filter(
          (ticket) => ticket.status === "New"
        ).length;

        //   console.log(newTicketsNumber);
        const formatted = {
          users: userNumber || "Not counted",
          techs: techsNumber || "Not counted",
          tickets: ticketsNumber,
          newTickets: newTicketsCount,
        };

        setInfo([formatted]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(info);
  }, [info]);

  let data = {};
  switch (type) {
    case "user":
      data = {
        title: "Users",
        count: info[0]?.users || "Not counted",
        link: "See all users",
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "technician":
      data = {
        title: "Technician",
        count: info[0]?.techs || "Not counted",
        link: "See all Technician",
        icon: (
          <EngineeringIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;

    case "All":
      data = {
        title: "All Tickets",
        count: info[0]?.tickets || "Not counted",
        link: "See All Tickets",
        icon: (
          <ConfirmationNumberIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    case "new":
      data = {
        title: "New Tickets",
        count: info[0]?.newTickets || "Not counted",
        link: "See all New Tickets",
        icon: (
          <AddCircleIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.count / 100 + "%"}
        </div>
        {data.icon}
      </div>
    </div>
  );
};
export default Widget;
