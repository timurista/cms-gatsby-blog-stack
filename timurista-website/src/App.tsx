import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import "tachyons";
import GlobalHeader from "./components/glolabl-header/GlobalHeader";
import MainScreen from "./components/main-screen/MainScreen";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useRoutes } from "hookrouter";
import routes from "./routes/routes";
import HomePage from "./pages/Home";
// GlobalHe

const CF_BACKEND_API =
  "https://g2vtb5opa8.execute-api.us-east-1.amazonaws.com/Prod/graphql";

// fetch on mount

const App: React.FC = () => {
  const routeResult = useRoutes(routes);
  return (
    <div className="App App-header">
      <GlobalHeader />
      {routeResult || <HomePage />}
      <Footer />
    </div>
  );
};

export default App;
