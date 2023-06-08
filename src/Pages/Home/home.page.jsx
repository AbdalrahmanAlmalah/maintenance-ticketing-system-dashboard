import "./home.page.scss";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import Navbar from "../../Components/Navbar/navbar.component";
import Widget from "../../Components/widget/widget.component";
import Featured from "../../Components/Featured/Featured.component";
import Chart from "../../Components/Chart/Chart";
import Table from "../../Components/Table/table.component";
const Home = () => {
  return (
    <div className="home-page">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="technician" />
          <Widget type="Approved" />
          <Widget type="done" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months " aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">
            Latest Tickets
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
