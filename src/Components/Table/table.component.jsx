import "./table.component.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import PhotoIcon from "@mui/icons-material/Photo";

import TicketImage from "../TicketImage/TicketImage";
import { Margin } from "@mui/icons-material";
const TableComponent = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleDescriptionClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseDialog = () => {
    setSelectedTicket(null);
  };
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState("");
  const date = new Date(); // Replace this with your actual date

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

  console.log(formattedDate);

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

        setUser(userResponse?.data.role);
        console.log(user);
        const response = await axios.get("/tickets/user", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const tickets = response?.data;
        console.log(response.data);
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

              const customerData = customerResponse?.data;

              const date = new Date(ticket.creationDate); // Replace this with your actual date

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

              //  console.log(formattedDate);

              return {
                id: ticket._id,
                region: regionData?.name || "",
                status: ticket.status,
                creationDate: formattedDate,
                description: ticket.description,
                customer: customerData?.name || "",
                priority: ticket.priority,
              };
            })
          );
          setRows(formattedTickets);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      navigate("/");
    }
  };

  const handleCheckboxChange = async (rowId) => {
    try {
      await axios.patch(
        `/ticket/${rowId}`,
        {
          status: "Done",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      // Fetch the updated data after patching the status
      fetchData();
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Ticket ID</TableCell>
            <TableCell className="tableCell">Region </TableCell>
            <TableCell className="tableCell"> Description</TableCell>
            <TableCell className="tableCell">Customer </TableCell>
            <TableCell className="tableCell">Date </TableCell>
            <TableCell className="tableCell">Status </TableCell>
            <TableCell className="tableCell">Priority </TableCell>

            {user === "Technician" && (
              <TableCell className="tableCell">Completed</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .filter((row) => row.status !== "New") // Filter out rows with status "New"
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">{row.region}</TableCell>
                <TableCell className="tableCell">
                  <div
                    className="cellWrapper"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {row.description}
                    <PhotoIcon
                      className="photoIcon"
                      onClick={() => handleDescriptionClick(row)}
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                    />
                  </div>
                </TableCell>

                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.creationDate}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`priority ${row.priority}`}>
                    {row.priority}
                  </span>
                </TableCell>
                {user === "Technician" && (
                  <TableCell className="tableCell">
                    {row.status === "Done" ? (
                      <Checkbox checked />
                    ) : row.status === "Rejected" ? (
                      <Checkbox disabled />
                    ) : (
                      <Checkbox
                        
                        onChange={() => handleCheckboxChange(row.id)}
                      />
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Dialog
        open={!!selectedTicket}
        onClose={handleCloseDialog}
        sx={{
          width: "105%",
          height: "105%",
        }}
      >
        {selectedTicket && (
          <>
            <DialogTitle>Ticket Description</DialogTitle>
            <DialogContent>
              <div>
                <span className="detailItem">{selectedTicket.description}</span>
              </div>
              <div style={{ alignItems: "center" }}>
                <TicketImage ticketID={selectedTicket.id} />
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </TableContainer>
  );
};
export default TableComponent;
