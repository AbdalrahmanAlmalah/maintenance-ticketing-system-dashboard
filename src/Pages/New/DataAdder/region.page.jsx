import axios from "../../../api/axios";
import { useRef, useEffect, useState } from "react";

import Sidebar from "../../../Components/Sidebar/sidebar.component";
import Navbar from "../../../Components/Navbar/navbar.component";
import "../NewTechnician/new.page.scss";

const Region = ({ title }) => {
  const [input1, setInput1] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitRegion = async (e) => {
    e.preventDefault();
    if (!input1) {
      setErrorMessage("Region is required");
      return;
    }
    try {
      const response = await axios.post(
        "/regions",
        { name: input1 },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      setSuccessMessage("Region submitted successfully!");
      setInput1("");
      setErrorMessage("");
    } catch (err) {
      console.log(err.message);
      setErrorMessage("Failed to submit region");
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!question || !answers[0]) {
      setErrorMessage("Question and Answer 1 are required");
      return;
    }
    try {
      const response = await axios.post(
        "/questions",
        { name: question, answers: answers },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      setSuccessMessage("Question submitted successfully!");
      setQuestion("");
      setAnswers([]);
      setErrorMessage("");
    } catch (err) {
      console.log(err.message);
      setErrorMessage("Failed to submit question");
    }
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
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
          <div className="right">
            {successMessage && <p style={{ color: "red" }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={handleSubmitQuestion}>
              <div className="formInput">
                <label>Add Question</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter Question"
                  required
                />
              </div>

              <div className="formInput">
                <label>Add Answers</label>
                <br />
                <br />
                <input
                  type="text"
                  value={answers[0] || ""}
                  onChange={(e) => handleAnswerChange(0, e.target.value)}
                  placeholder="Enter Answer 1"
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  value={answers[1] || ""}
                  onChange={(e) => handleAnswerChange(1, e.target.value)}
                  placeholder="Enter Answer 2"
                />
                <br />
                <br />
                <input
                  type="text"
                  value={answers[2] || ""}
                  onChange={(e) => handleAnswerChange(2, e.target.value)}
                  placeholder="Enter Answer 3"
                />
                <button type="submit">Submit Question</button>
              </div>
            </form>
          </div>
          <div className="right">
            <form onSubmit={handleSubmitRegion}>
              <div className="formInput">
                <label>Add Region</label>
                <input
                  type="text"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  placeholder="Enter Region"
                  required
                />
              </div>

              <button type="submit">Submit Region</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Region;
