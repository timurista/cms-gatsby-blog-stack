import React from "react";
import MainScreen from "../components/main-screen/MainScreen";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { useRoutes, A } from "hookrouter";
// GlobalHe

const CF_BACKEND_API =
  "https://g2vtb5opa8.execute-api.us-east-1.amazonaws.com/Prod/graphql";

function HomePage() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(CF_BACKEND_API, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      })
      .then(res => setPosts(res.data.body));
  }, [setPosts]);
  return <MainScreen posts={posts} />;
}

export default HomePage;
