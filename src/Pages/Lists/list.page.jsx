import "./list.page.scss";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import Navbar from "../../Components/Navbar/navbar.component";
import TicketTable from "../../Components/Datatable/ticketTable.component";
import TechTable from "../../Components/Datatable/techTable.component ";

const List = ({ title }) => {
  return (
    <div className="list-page">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        {title === "Tickets" ? (
          <TicketTable title={title} />
        ) : title === "Technicians" ? (
          <TechTable title={title} />
        ) : title === "Managers" ? (
          <TechTable title={title} /> // Replace "AllTicketsTable" with the actual component name for the table displaying all tickets
        ) : null}
      </div>
    </div>
  );
};

export default List;
