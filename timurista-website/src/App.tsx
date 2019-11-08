import React from "react";
import "./App.scss";
import "tachyons";
import GlobalHeader from "./components/glolabl-header/GlobalHeader";
import Footer from "./components/footer/Footer";
import { useRoutes } from "hookrouter";
import routes from "./routes/routes";
import HomePage from "./pages/Home";
// GlobalHe

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
