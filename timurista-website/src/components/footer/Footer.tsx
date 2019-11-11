import React from "react";
import "./Footer.scss";
import { A } from "hookrouter";

function Footer() {
  return (
    <div className="Footer">
      <div className="content">
        <div className="top-links">
          <div className="col3">
            <A href="/discover">
              <h3>Discover</h3>
            </A>
            <p>Find topics and curate content you love.</p>
          </div>
          <div className="col3">
            <A href="/experience">
              <h3>Customize your experience</h3>
            </A>
            <p>
              Build an experience that presents you relevant information at a
              glance.
            </p>
          </div>
          <div>
            <A href="/membership">
              <h3>Membership</h3>
            </A>
            <p>For as little as $5 a month become a member to read the feed</p>
          </div>
        </div>
        <div className="separator"></div>

        <div className="bottom-links">
          <div>Tim Urista © LLC</div>

          <div className="legal-links">
            <A href="/about">About</A>
            <A href="/help">Help</A>
            <A href="/legal">Legal</A>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
