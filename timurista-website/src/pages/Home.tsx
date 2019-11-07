import React from "react";
import { observer, inject } from "mobx-react";
import { BlogStore } from "../store/BlogStore";
import MainScreen from "../components/main-screen/MainScreen";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { useRoutes, A } from "hookrouter";
import get from "lodash.get";
import CircularProgress from "@material-ui/core/CircularProgress";

function HomePage(props: { blogStore?: BlogStore }) {
  const posts = get(props, "blogStore.posts", []);
  const loading = get(props, "blogStore.loading", false);
  return <MainScreen posts={posts} loading={loading} />;
}

const injectedHomePage = inject("blogStore")(observer(HomePage));

export default injectedHomePage;
