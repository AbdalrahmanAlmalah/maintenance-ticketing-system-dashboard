import React, { useContext } from "react";
import SignInOutContainer from "./Pages/Containers/index.container";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/home.page";
import List from "./Pages/Lists/list.page";
import SingleTicket from "./Pages/Single/singleTicket.page";
import New from "./Pages/New/NewTechnician/new.page";
import History from "./Pages/History/history.page";
import Unauthorized from "./Pages/Unauthorized/unauthorized.page";
import Missing from "./Pages/Missing/missing.page";
import RequiredAuth from "./Pages/RequiredAuth/RequiredAuth";
import { techInputs, ticketInputs, userInputs } from "./formSource";
import "./Style/dark.style.scss";
import { DarkModeContext } from "./context/darkModeContext";
import SingleTech from "./Pages/Single/singleTech.page";
import NewTicket from "./Pages/New/NewTicket/newTicket.page";
import Region from "./Pages/New/DataAdder/region.page";
import Profile from "./Pages/Single/Profile.page";
import Admin from "./Pages/Single/Admin.page ";
import NewUser from "./Pages/New/NewTicket/newUser.page";
function App() {
  const ROLES = {
    technician: "Technician",
    manager: "Manager",
    admin: "Admin",
  };

  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route index element={<SignInOutContainer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tickets" element={<List title={"Tickets"} />} />
        <Route path="/techs" element={<List title={"Technicians"} />} />
        <Route path="/managers" element={<List title={"Managers"} />} />
        <Route
          path="New"
          element={<NewTicket inputs={ticketInputs} title={"Add New Ticket"} />}
        />

        <Route
          path="NewTech"
          element={<NewUser title={"Add New Technician"} />}
        />
        <Route
          path="newManager"
          element={<NewUser title={"Add New Manager"} />}
        />
        <Route
          path="r&q"
          element={<Region title={"Add New Region And Question"} />}
        />

        <Route path="/techs/:techId" element={<SingleTech />} />
        <Route
          path="History"
          element={<History title={"Tickets History"} />}
        ></Route>
        <Route path="/tickets/:ticketId" element={<SingleTicket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
