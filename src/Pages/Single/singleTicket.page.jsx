import "./single.page.scss";
import TicketImage from "../../Components/TicketImage/TicketImage";
import Navbar from "../../Components/Navbar/navbar.component";
import Sidebar from "../../Components/Sidebar/sidebar.component";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const SingleTicket = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticketInfo, setTicketInfo] = useState([]);
  const [regions, setRegions] = useState([]);
  const [techs, setTechs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [technicianName, setTechnicianName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const response = await axios.get("/techs", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        setTechs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching techs:", error);
      }
    };
    fetchTechs();
  }, []);

  const fetchData = async () => {
    if (document.cookie) {
      try {
        const response = await axios.get(`/ticket/${ticketId}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const ticket = response?.data;
        console.log(response?.data);

        if (ticket) {
          const regionResponse = await axios.get(`/region/${ticket.region}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          });
          const regionData = regionResponse?.data;

          const customerResponse = await axios.get(`/user/${ticket.customer}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          });
          const customerData = customerResponse?.data;

          const formattedTicket = {
            id: ticket._id,
            region: regionData?.name || "",
            status: ticket.status,
            creationDate: ticket.creationDate,
            description: ticket.description,
            customer: customerData?.name || "",
            priority: ticket.priority,
            rating: ticket.rating,
            technician: ticket.technician || "No one",
            questions: ticket.questions,
          };

          setTicketInfo([formattedTicket]);
        }
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(`/user/${ticketInfo[0].technician}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        });
        const technician = response?.data;
        console.log(technician);

        if (technician) {
          setTechnicianName(technician.name);
        }
      } catch (error) {
        console.error("Error fetching technician data:", error);
      }
    };

    if (ticketInfo.length > 0) {
      fetchTechnician();
    }
  }, [ticketInfo]);

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `/ticket/${ticketInfo[0].id}`,
        {
          technician: selectedTech,
          priority: selectedPriority,
          status: selectedStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );

      console.log("Ticket updated successfully:", response.data);
      window.location.reload();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleTechChange = (e) => {
    setSelectedTech(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  useEffect(() => {
    console.log(ticketInfo);
  }, [ticketInfo]);

  return (
    <div className="single-page">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {isEditing ? (
              <div className="editButton" onClick={handleSave}>
                Save
              </div>
            ) : (
              <div className="editButton" onClick={() => setIsEditing(true)}>
                Edit
              </div>
            )}
            <h1 className="title">Information</h1>
            {ticketInfo.length > 0 && (
              <div className="item">
                <TicketImage ticketID={ticketInfo[0].id} className="itemImg" />
                <div className="details">
                  <h1 className="itemTitle">Details :</h1>

                  <div className="detailItem">
                    <span className="itemKey">Customer Name :</span>
                    <span className="itemValue">{ticketInfo[0].customer}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Ticket id :</span>
                    <span className="itemValue">{ticketInfo[0].id}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Description :</span>
                    <span className="itemValue">
                      {ticketInfo[0].description}
                    </span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Location :</span>
                    <span className="itemValue">{ticketInfo[0].region}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Status :</span>
                    {isEditing ? (
                      <select
                        className="custom-select__input"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Done">Done</option>
                      </select>
                    ) : (
                      <span className="itemValue">{ticketInfo[0].status}</span>
                    )}
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Date :</span>
                    <span className="itemValue">
                      {ticketInfo[0].creationDate}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Priority :</span>
                    {isEditing ? (
                      <select
                        className="custom-select__input"
                        value={selectedPriority}
                        onChange={handlePriorityChange}
                      >
                        <option value="">Select Priority</option>
                        <option value="Normal">Normal</option>
                        <option value="Minor">Minor</option>
                        <option value="Critical">Critical</option>
                      </select>
                    ) : (
                      <span className="itemValue">
                        {ticketInfo[0].priority}
                      </span>
                    )}
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Rating :</span>
                    <span className="itemValue">{ticketInfo[0].rating}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Technician :</span>
                    {isEditing && (
                      <select
                        className="custom-select__input"
                        value={selectedTech}
                        onChange={handleTechChange}
                      >
                        <option value="">Select Technician</option>
                        {techs.map((tech) => (
                          <option key={tech._id} value={tech._id}>
                            {tech.name}
                          </option>
                        ))}
                      </select>
                    )}
                    {!isEditing && (
                      <span className="itemValue">{technicianName}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;
