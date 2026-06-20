import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint"
import Home from "./pages/Home";
import History from "./pages/History";

function App() {
  return (
    <Routes>

    <Route path="/" element={<Home/>}/>
    
    <Route path="/login" element={<Login/>}/>
    
    <Route path="/register" element={<Register/>}/>
    
          <Route
          path="/dashboard"
          element={
          localStorage.getItem("token")
          ? <Dashboard/>
          : <Login/>
          }
         />

          <Route
           path="/complaint"
           element={
           localStorage.getItem("token")
           ? <Complaint/>
           : <Login/>
           }
           />

    <Route path="/history" element={<History />} />
    
    </Routes>
  );
}

export default App;