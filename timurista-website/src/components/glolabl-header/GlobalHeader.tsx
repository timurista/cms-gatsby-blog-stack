import React from "react";
import "./GlobalHeader.scss";
import HeroImage from "../hero-image/HeroImage";
import { A } from "hookrouter";
import { BlogStore } from "../../store/BlogStore";
import { Button } from "@material-ui/core";
import get from "lodash.get";
import { inject, observer } from "mobx-react";

export interface GlobalHeaderProps {
  blogStore?: BlogStore;
}

function GlobalHeader(props: GlobalHeaderProps) {
  return (
    <header className="Global-Header">
      <ul className="nav">
        <li className="nav-item">
          <A className="box" href="/">
            Tim Urista
          </A>
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

        <li>
          {get(props, "authStore.user") ? (
            <span>{get(props, "authStore.user.username")}</span>
          ) : (
            <Button
              className="login-button"
              onClick={get(props, "authStore.login")}
            >
              login
            </Button>
          )}
        </li>
      </ul>
    </header>
  );
}

const injectedHeader = inject("authStore")(observer(GlobalHeader));

export default injectedHeader;
