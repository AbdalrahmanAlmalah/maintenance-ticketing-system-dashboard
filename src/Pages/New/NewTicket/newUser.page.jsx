import Sidebar from "../../../Components/Sidebar/sidebar.component";
import Navbar from "../../../Components/Navbar/navbar.component";
import "./new.page.scss";
import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const NewUser = ({ title }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get("/regions");
        const regions = response.data;
        setRegions(regions);
      } catch (error) {
        console.error("Error fetching regions:", error);
        setError("Error fetching regions. Please try again later.");
      }
    };

    fetchRegions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "/users",
        {
          name,
          phone,
          password,
          region: selectedRegion,
          role: selectedRole,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
        if(response?.data !== "User Created Successfully"){
          if(response?.data === 'E11000 duplicate key error collection: juniorDB.users index: phone_1 dup key: { phone: "'+phone+'" }'){
            setError("Duplicate phone number, the number you entered already exists.");
          } else{
            const errorParts = response?.data.split(':');
            const errorMessage = errorParts[errorParts.length - 1].trim();
            setError(errorMessage);
          }
        }
        setName("");
        setPhone("");
        setPassword("");
        setSelectedRegion("");
        setSelectedRole("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="new-page">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {error && (
              <div className="error" style={{ color: "red" }}>
                {error}
              </div>
            )}
            <AccountBoxIcon className="icona"></AccountBoxIcon>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={phone}
                  placeholder="Enter phone"
                  onChange={handlePhoneChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Region:</label>
                <select
                  className="custom-select__input"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  required
                >
                  <option value="">Select a region</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Role:</label>
                <select
                  className="custom-select__input"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  required
                >
                  <option value="">Select The Role</option>
                  <option value="Technician">Technician</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
