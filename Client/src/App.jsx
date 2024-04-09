import React from "react";
import { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Context } from "./main";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Home from "./Components/Home/Home";
import Jobs from "./Components/Jobs/Job";
import jobDetails from "./Components/Jobs/jobDetails";
import myJobs from "./Components/Jobs/myJobs";
import Application from "./Components/Application/Aplication";
import myApplication from "./Components/Application/myApplication";
import Page404 from "./Components/404NotFound/Page404";
import Toaster from "react-hot-toast";
import axios from "axios";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        console.log(error.message);
      }
      fetchUser();
    };
  }, [isAuthorized]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getAll" element={<Jobs />} />
          <Route path="/job/:id" element={<jobDetails />} />
          <Route path="/job/create" element={<createJobs />} />
          <Route path="/job/myJob" element={<myJobs />} />
          <Route path="/application:id" element={<Application />} />
          <Route path="/myApplication" element={<myApplication />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
};

export default App;
