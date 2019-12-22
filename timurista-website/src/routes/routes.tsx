import React from "react";
import HomePage from "../pages/Home";
import AboutPage from "../pages/Home";
import BlogDetail from "../pages/BlogDetail";
import PaperDetail from "../pages/PaperDetail";
import ProductOverview from "../pages/Home";

const routes = {
  "/": () => <HomePage />,
  "/about": () => <AboutPage />,
  "/blog": () => <ProductOverview />,
  "/blog/:id": ({ id }: any) => <BlogDetail id={id} />,
  "/paper/:id": ({ id }: any) => <PaperDetail id={id} />
};

export default routes;
