import "./single.page.scss";
import Navbar from "../../Components/Navbar/navbar.component";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import Chart from "../../Components/Chart/Chart";
import Table from "../../Components/Table/table.component";
const Single = () => {
  return (
    <div className="single-page">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane hoe</h1>
                <div className="detailItem">
                  <span className="itemKey">Phone Number :</span>
                  <span className="itemValue">994163497</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Location :</span>
                  <span className="itemValue">Damascus</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Technician Repair Last 6 Months" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Latest Tickets</h1>
          <Table />
        </div>
      </div>
    </div>
  );
};
export default Single;
