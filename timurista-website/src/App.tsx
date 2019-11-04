import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import "tachyons";
import GlobalHeader from "./components/glolabl-header/GlobalHeader";
import MainScreen from "./components/main-screen/MainScreen";
import Footer from "./components/footer/Footer";
import axios from "axios";
// GlobalHe

const CF_BACKEND_API =
  "https://g2vtb5opa8.execute-api.us-east-1.amazonaws.com/Prod/graphql";

// fetch on mount

const App: React.FC = () => {
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
  return (
    <div className="App App-header">
      <GlobalHeader />
      <MainScreen posts={posts} />
      <Footer />
    </div>
  );
};

export default App;
