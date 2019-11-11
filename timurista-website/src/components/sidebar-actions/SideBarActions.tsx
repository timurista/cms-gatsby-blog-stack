import React, { useEffect, useState } from "react";
// import MediumClap from "./medium-clap/MediumClap";
import "./SideBarActions.scss";
import IconButton from "@material-ui/core/IconButton";

function SidebarActions() {
  //   let observer = null;
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    console.log(document.querySelector("#article-header"));
    // createObserver(hidden, setHidden);
    function scrollHandler() {
      //   console.log(window.scrollY);
      if (window.scrollY > 400) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    }
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [hidden, setHidden]);
  return (
    <div className={`Sidebar-Actions ${!hidden ? "show" : ""}`}>
      <div className="follow-details">
        <div className="fas fa-user-circle"></div>

        <div className="follow">Follow</div>
      </div>
      <IconButton>
        <div className="far fa-hand-spock"></div>
      </IconButton>
      <IconButton>
        <div className="far fa-bookmark"></div>
      </IconButton>
    </div>
  );
}

export default SidebarActions;
