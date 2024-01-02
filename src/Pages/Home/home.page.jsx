import "./home.page.scss";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import Navbar from "../../Components/Navbar/navbar.component";
import Widget from "../../Components/widget/widget.component";
import Featured from "../../Components/Featured/Featured.component";
import Chart from "../../Components/Chart/Chart";
import TableComponent from "../../Components/Table/table.component";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const Home = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/user", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const user = response?.data;
        const role = user?.role;
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="technician" />
          <Widget type="All" />
          <Widget type="new" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="This Year" aspect={2 / 1} />
        </div>
        {userRole !== "Admin" && (
          <div className="listContainer">
            <div className="listTitle">
              Latest Tickets
              <TableComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
