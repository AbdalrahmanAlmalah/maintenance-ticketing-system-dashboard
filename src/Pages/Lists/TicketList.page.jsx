import "./list.page.scss";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import Navbar from "../../Components/Navbar/navbar.component";
import Datatable from "../../Components/Datatable/ticketTable.component";
const TicketList = () => {
  return (
    <div className="list-page">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};
export default TicketList;
