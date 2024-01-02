import "./single.page.scss";
import Navbar from "../../Components/Navbar/navbar.component";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import axios from "../../api/axios";

const Profile = () => {
  const navigate = useNavigate();
  const [techInfo, setTechInfo] = useState([]);

  const fetchData = async () => {
    if (document.cookie) {
      try {
        const response = await axios.get(`/user`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const user = response?.data;
        console.log(response?.data);

        if (user) {
          const regionResponse = await axios.get(`/region/${user.region}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          });
          const regionData = regionResponse?.data;

          const numberResponse = await axios.get(`/tickets/user`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          });
          const numberData = numberResponse?.data.length;
          console.log(numberData);
          const formattedUser = {
            id: user._id,
            region: regionData?.name || "",
            name: user.name || "",
            phone: user.phone,
            count: numberData,
          };

          setTechInfo([formattedUser]);
        }
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
    console.log(techInfo);
  }, [techInfo]);

  return (
    <div className="single-page">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            {techInfo.length > 0 && (
              <div className="item">
                <AccountBoxIcon className="icon"></AccountBoxIcon>
                <div className="details">
                  <h1 className="itemTitle">Details:</h1>

                  <div className="detailItem">
                    <span className="itemKey"> Name :</span>
                    <span className="itemValue">{techInfo[0].name}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey"> ID :</span>
                    <span className="itemValue">{techInfo[0].id}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Phone Number :</span>
                    <span className="itemValue">{techInfo[0].phone}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Location :</span>
                    <span className="itemValue">{techInfo[0].region}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Tickets Number :</span>
                    <span className="itemValue">{techInfo[0].count}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {<div className="right"></div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
