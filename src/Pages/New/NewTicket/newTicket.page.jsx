import Sidebar from "../../../Components/Sidebar/sidebar.component";
import Navbar from "../../../Components/Navbar/navbar.component";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./new.page.scss";
import axios from "../../../api/axios";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const api = process.env.REACT_APP_API_LOCAL;
const NewTicket = ({ inputs, title }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const errRef = useRef();
  const [file, setFile] = useState(null);
  const [allEntered, setAllEntered] = useState(false);
  const [success, setSuccess] = useState("");

  const allowedFileTypes = ["image/jpeg", "image/jpg"];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setErr("");
    } else {
      setFile(null);
      setErr("Please select a valid JPG file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        await axios.post("/ticket2", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        setErr("Error uploading file: " + error);
        return;
      }
    }

    try {
      const response = await axios.post(
        "/ticket",
        { description },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      if (document.cookie) {
        if (response?.data === "Ticket Sent!") {
          setSuccess("Ticket Sent!");
        } else {
          const errorParts = response?.data.split(":");
          const errorMessage = errorParts[errorParts.length - 1].trim();
          setErr(errorMessage);
        }
      } else {
        setErr("You must sign in first!");
      }
    } catch (err) {
      setErr(err.message);
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
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <p
                style={{ color: "#e91e63" }}
                ref={errRef}
                className={err ? "err" : "offscreen"}
                aria-live="assertive"
              >
                {err}
                {success}
              </p>

              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  accept="image/jpeg, image/jpg"
                  onChange={handleFileChange}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <input
                    type="text"
                    label="Description"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
