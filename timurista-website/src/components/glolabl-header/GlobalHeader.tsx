import React from "react";
import "./GlobalHeader.scss";
import HeroImage from "../hero-image/HeroImage";
import { A } from "hookrouter";
import { BlogStore } from "../../store/BlogStore";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import get from "lodash.get";
import { inject, observer } from "mobx-react";
import { any } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: any) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export interface GlobalHeaderProps {
  blogStore?: BlogStore;
}

function GlobalHeader(props: GlobalHeaderProps) {
  const username = get(props, "authStore.user.username");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="Global-Header">
      <ul className="nav">
        <HeroImage />
        <li className="nav-item">
          <Typography variant="body2">
            <A className="box" href="/">
              Tim Urista
            </A>
          </Typography>
        </li>

        <li className="nav-item divider">
          <A href="/blog">Blog</A>
        </li>
        <li className="nav-item">
          <A href="/about">About</A>
        </li>
        <li className="nav-item">
          <A href="/contact">Contact</A>
        </li>

        <li>
          {username != null ? (
            <>
              <Avatar
                alt={username}
                src={`https://robohash.org/${username}`}
                onClick={handleClick}
              />
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemText
                    primary="Logout"
                    onClick={get(props, "authStore.logout")}
                  />
                </StyledMenuItem>
              </StyledMenu>
            </>
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
