import React, { useEffect, useState } from "react";
// import MediumClap from "./medium-clap/MediumClap";
import "./SideBarActions.scss";
import IconButton from "@material-ui/core/IconButton";
import { Author } from "../../store/BlogStore";
import Button from "@material-ui/core/Button";

function SidebarActions(props: { author: Author }) {
  const author = props.author
    ? props.author
    : { title: "", name: "Unknown", shortBio: "" };
  //   let observer = null;
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
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
        {/* <div className="fas fa-user-circle"></div> */}
        <h5>{author.name}</h5>
        <p>{author.shortBio}</p>
        <Button className="follow">Follow</Button>
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
