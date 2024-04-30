import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <section className="page notfound">
      <div className="content">
        <img src="/notfound.png" alt="Page Not Found" />
        <Link to={"/"}>Return to Home</Link>
      </div>
    </section>
  );
};

export default Notfound;
