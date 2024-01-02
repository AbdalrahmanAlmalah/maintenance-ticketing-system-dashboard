import "./dataTable.component.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const TechTable = ({ title }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [ok, setOk] = useState(false);
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

        let techEndpoint = "/techs";
        if (userRole === "Admin" && title === "Managers") {
          techEndpoint = "/users/Manager";
        } else if (userRole === "Admin") {
          techEndpoint = "/users/Technician";
        }else if (userRole === "Manager") {
          techEndpoint = "/techs";
        } else {
          navigate("/home");
        }
        const response = await axios.get(techEndpoint, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const techs = response?.data;
        console.log(response.data);
        if (Array.isArray(techs)) {
          const formattedTechs = await Promise.all(
            techs.map(async (tech) => {
              const regionResponse = await axios.get(`/region/${tech.region}`, {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
                withCredentials: true,
              });

              const regionData = regionResponse?.data;

              return {
                id: tech._id,
                region: regionData?.name || "",
                phone: tech.phone,
                name: tech.name,
              };
            })
          );
          setRows(formattedTechs);
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
      await axios.delete(`/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "region", headerName: "Region", width: 200 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {userRole !== "Manager" &&
          userRole !== "Technician" && (
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          )}
            {userRole !== "Admin" && (
              // Hide "View" button for Admin role
              <div className="viewButton">
                <Link
                  to={`/techs/${params.row.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="editButton">View</div>
                </Link>
              </div>
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
        {userRole !== "Manager" &&
          userRole !== "Technician" && ( // Conditional rendering to hide "Add New" button for Manager role
            <Link
              to={title === "Add New Technician" ? "/newtech" : "/newManager"}
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

export default TechTable;
