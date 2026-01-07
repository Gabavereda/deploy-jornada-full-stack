import React from "react";
import cenaquecena from "../assets/logo/cenaquecena.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={cenaquecena} alt="Logo da cena" />
      </Link>

      <Link to="/" className="header__link">
        <h1>CenaQueCena</h1>
      </Link>
    </div>
  );
};

export default Header;
