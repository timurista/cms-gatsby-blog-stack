import React from "react";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import BlogDetail from "../pages/BlogDetail";
import PaperDetail from "../pages/PaperDetail";
import ProductOverview from "../pages/Home";
import PrivacyPage from "../pages/PrivacyPage";
import MembershipPage from "../pages/Membership";
import ContactPage from "../pages/Contact";

const routes = {
  "/": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/privacy": () => <PrivacyPage />,
  "/blog": () => <ProductOverview />,
  "/membership": () => <ContactPage />,
  "/contact": () => <ContactPage />,
  "/blog/:id": ({ id }: any) => <BlogDetail id={id} />,
  "/paper/:id": ({ id }: any) => <PaperDetail id={id} />,
};

export default routes;
