import "./history.page.scss";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import Navbar from "../../Components/Navbar/navbar.component";
import Table from "../../Components/Table/table.component";
const History = ({ title, To }) => {
  return (
    <div className="history-page">
      <Sidebar />
      <div className="historyContainer">
        <Navbar />
        <Table className="table" title={title} To={To} />
      </div>
    </div>
  );
};
export default History;
