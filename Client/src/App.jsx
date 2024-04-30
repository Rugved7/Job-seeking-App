import "./App.css";
import { Context } from "./main";
import {
  BrowserRouter as Routes,
  Route,
  Router,
} from "react-router-dom";
import Application from "./Components/Application/Application";
import Home from "./Components/Home/Home";
import Footer from "./Components/Layout/Footer";
import Navbar from "./Components/Layout/Navbar";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
