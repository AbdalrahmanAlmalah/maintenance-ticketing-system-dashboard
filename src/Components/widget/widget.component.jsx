import "./widget.component.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const Widget = ({ type }) => {
  let data;
  switch (type) {
    case "user":
      data = {
        title: "Users",
        iscount: false,
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
        iscount: false,
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

    case "Approved":
      data = {
        title: "Approved Tickets",
        iscount: false,
        link: "See all Approved Tickets",
        icon: (
          <ConfirmationNumberIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    case "done":
      data = {
        title: "Done",
        iscount: false,
        link: "See all Done Tickets",
        icon: (
          <CheckCircleIcon
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
        <span className="counter">212121</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20 %
        </div>
        {data.icon}
      </div>
    </div>
  );
};
export default Widget;
