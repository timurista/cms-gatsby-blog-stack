import React from "react";
import "./GlobalHeader.scss";
import HeroImage from "../hero-image/HeroImage";
import { A } from "hookrouter";

function GlobalHeader() {
  return (
    <header className="Global-Header">
      <ul className="nav">
        <li className="nav-item">
          <A className="box" href="/">Tim Urista</A>
        </li>
        <HeroImage />
        <li className="nav-item divider">
          <A href="/blog">Blog</A>
        </li>
        <li className="nav-item">
          <A href="/blog">Human 2.0</A>
        </li>
        <li className="nav-item">
          <A href="/blog">Services</A>
        </li>
      </ul>
      
    </header>
  );
}

export default GlobalHeader;
