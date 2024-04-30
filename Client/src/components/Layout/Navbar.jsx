import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <>
      <nav className={isAuthorized ? "navbarshow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="JobZee-logos__white.png" alt="Logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)}>
                All Jobs
              </Link>
            </li>
            <li>
              <Link to={"/application/me"} onClick={() => setShow(false)}>
                {user && user.role === "Employer"
                  ? "Applicant's Application"
                  : "My Applications"}
              </Link>
            </li>
            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    Post New Job
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                    View Your Jobs
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            <button onClick={handleLogout}>Logout</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
