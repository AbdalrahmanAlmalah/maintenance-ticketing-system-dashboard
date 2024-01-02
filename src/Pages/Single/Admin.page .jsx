import "./single.page.scss";
import Navbar from "../../Components/Navbar/navbar.component";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import axios from "../../api/axios";

const Admin = () => {
  const navigate = useNavigate();
  const [userr, setUser] = useState([]);

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
          const formattedUser = {
            id: user._id,
            name: user.name || "",
            phone: user.phone,
          };

          setUser([formattedUser]);
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

  useEffect(() => {}, [userr]);

  return (
    <div className="single-page">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            {userr.length > 0 && (
              <div className="item">
                <AccountBoxIcon className="icon"></AccountBoxIcon>
                <div className="details">
                  <h1 className="itemTitle">Details:</h1>

                  <div className="detailItem">
                    <span className="itemKey"> Name :</span>
                    <span className="itemValue">{userr[0].name}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey"> ID :</span>
                    <span className="itemValue">{userr[0].id}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Phone Number :</span>
                    <span className="itemValue">{userr[0].phone}</span>
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

export default Admin;
