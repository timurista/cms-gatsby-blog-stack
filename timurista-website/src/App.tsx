import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import "tachyons";
import GlobalHeader from "./components/glolabl-header/GlobalHeader";
import MainScreen from "./components/main-screen/MainScreen";
import Footer from "./components/footer/Footer";
import axios from "axios";
// GlobalHe

const CF_BACKEND_API = "https://d1svgm4wmnpo8f.cloudfront.net/graphql";

// fetch on mount

const App: React.FC = () => {
  React.useEffect(() => {
    axios
      .get(CF_BACKEND_API, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      })
      .then(res => console.log("from axios", res.data));
  });
  return (
    <div className="App App-header">
      <GlobalHeader />
      <MainScreen />
      <Footer />
    </div>
  );
};

export default App;
