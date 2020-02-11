import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import blogStore from "../src/store/BlogStore";
import authStore from "../src/store/AuthStore";
import { Provider } from "mobx-react";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './themes/mainTheme';

const stores = {
  blogStore,
  authStore
};

ReactDOM.render(
  <Provider {...stores}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
