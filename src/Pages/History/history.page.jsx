import "./history.page.scss";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import Navbar from "../../Components/Navbar/navbar.component";
import Table from "../../Components/Table/table.component";
const History = ({ title }) => {
  return (
    <div className="history-page">
      <Sidebar />
      <div className="historyContainer">
        <Navbar />
        <h1 className="datatitle">{title}</h1>
        <Table className="table" title={title} />
      </div>
    </div>
  );
};
export default History;
