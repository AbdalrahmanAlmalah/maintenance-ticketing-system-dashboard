import "./list.page.scss";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import Navbar from "../../Components/Navbar/navbar.component";
import Datatable from "../../Components/Datatable/dataTable.component";
const List = ({ title, To }) => {
  return (
    <div className="list-page">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable title={title} To={To} />
      </div>
    </div>
  );
};
export default List;
