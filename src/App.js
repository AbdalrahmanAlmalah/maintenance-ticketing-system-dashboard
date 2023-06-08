import React, { useContext } from "react";
import SignInOutContainer from "./Pages/Containers/index.container";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home.page";
import List from "./Pages/Lists/list.page";
import Single from "./Pages/Single/single.page";
import New from "./Pages/New/new.page";
import History from "./Pages/History/history.page";
import Unauthorized from "./Pages/Unauthorized/unauthorized.page";
import Missing from "./Pages/Missing/missing.page";
import RequiredAuth from "./Pages/RequiredAuth/RequiredAuth";
import { techInputs, ticketInputs, userInputs } from "./formSource";
import "./Style/dark.style.scss";
import { DarkModeContext } from "./context/darkModeContext";
import Layout from "./Components/Layout/layout.component";

function App() {
  const ROLES = {
    technicians: "Technician",
    manager: "Manager",
    
  };

  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        {/* public routes*/}

        <Route path="/" element={<Layout />}>
          <Route path="login" element={<SignInOutContainer />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* private routes*/}

          <Route
            element={
              <RequiredAuth allowedRoles={[ROLES.manager]} />
            }
          >
            <Route path="/home" element={<Home />} />
            

            <Route path="users">
              <Route
                index
                element={<List title="Add New User " To="/users/new" />}
              />
              <Route path=":userId" element={<Single />} />
              <Route path="history" element={<History title="History" />} />
              <Route
                path="New"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="tickets">
              <Route
                index
                element={<List title="Add New Ticket" To="/tickets/new" />}
              />
              <Route path=":ticketId" element={<Single />} />
              <Route
                path="New"
                element={<New inputs={ticketInputs} title="Add New Ticket" />}
              />
              <Route path="history" element={<History title="History" />} />
            </Route>
            <Route path="technicians">
              <Route
                index
                element={
                  <List title="Add New Technician " To="/technicians/new" />
                }
              />
              <Route path=":techId" element={<Single />} />
              <Route
                path="New"
                element={<New inputs={techInputs} title="Add New Technician" />}
              />
              <Route path="history" element={<History title="History" />} />
            </Route>


            </Route>

           
            <Route
            element={
              <RequiredAuth allowedRoles={[ROLES.technicians, ROLES.manager]} />
              
            }
          >
              <Route path="history" element={<History title="History" />} />
              <Route path=":ticketId" element={<Single />} />
              <Route path=":techId" element={<Single />} />
          </Route>


            
         

         
        
          

          {/* Catch All */}

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
