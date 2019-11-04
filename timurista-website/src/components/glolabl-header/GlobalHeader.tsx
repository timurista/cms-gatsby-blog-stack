import React from "react";
import "./GlobalHeader.scss";
import HeroImage from "../hero-image/HeroImage";

function GlobalHeader() {
  return (
    <header className="Global-Header">
      <ul className="nav">
        <li className="nav-item box">
          <a>Tim Urista</a>
        </li>
        <li className="nav-item divider">
          <a>Blog</a>
        </li>
        <li className="nav-item">
          <a>Learn for life</a>
        </li>
        <li className="nav-item">
          <a>Projects</a>
        </li>
        <li className="nav-item">
          <a>Services</a>
        </li>
      </ul>
      <HeroImage />
    </header>
  );
}

export default GlobalHeader;
