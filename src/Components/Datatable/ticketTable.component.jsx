import "./dataTable.component.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const TicketTable = ({ title }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [userRole, setUserRole] = useState("");
const [ok, setOk]=useState(false);
  const fetchData = async () => {
    if (document.cookie) {
      try {
        const userResponse = await axios.get("/user", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const user = userResponse?.data;
        const userRole = user?.role;
        setUserRole(userRole);

        let ticketsEndpoint = "/tickets/user";
        if (userRole === "Admin") {
          ticketsEndpoint = "/tickets";
        }else if(userRole==="Manager"){
          setOk(true)
        }

        // Get tickets based on user role
        const response = await axios.get(ticketsEndpoint, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const tickets = response?.data;
        if (Array.isArray(tickets)) {
          const formattedTickets = await Promise.all(
            tickets.map(async (ticket) => {
              const regionResponse = await axios.get(
                `/region/${ticket.region}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                  withCredentials: true,
                }
              );

              const regionData = regionResponse?.data;
              let customerData = "";

              if (userRole !== "Admin") {
                const customerResponse = await axios.get(
                  `/user/${ticket.customer}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                    },
                    withCredentials: true,
                  }
                );
                customerData = customerResponse?.data;
              }

              const date = new Date(ticket.creationDate);
              const formattedDate = `${date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
              })}, ${date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}`;
              return {
                id: ticket._id,
                region: regionData?.name || "",
                status: ticket.status,
                creationDate: formattedDate,
                description: ticket.description,
                customer: customerData?.name || "",
              };
            })
          );
          setRows(formattedTickets);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/ticket/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const columns = [
    { field: "status", headerName: "Status", width: 90 },
    { field: "creationDate", headerName: "Date", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "region", headerName: "Region", width: 100 },
    ...(userRole !== "Admin"
      ? [
          {
            field: "customer",
            headerName: "Customer",
            width: 100,
          },
        ]
      : []),
    { field: "id", headerName: "Ticket ID", width: 175 },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: ok ? "Action" : "", // Set empty string if user role is "Admin"
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction"> 
            {ok &&  (
             <>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </div>
            
                <Link
                  to={`/tickets/${params.row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="viewButton">View</div>
                </Link>
                </>
                )}
              
            
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatitle">
        {title}
        {ok && (
              <Link
                to="/New"
                className="link"
                style={{ textDecoration: "none" }}
              >
                Add New
              </Link>
            )}
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default TicketTable;
