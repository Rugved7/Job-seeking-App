import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import axios from "axios";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/register",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);
};

export default App;
