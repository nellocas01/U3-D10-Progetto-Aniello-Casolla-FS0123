import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // rende lo stato accessibile a tutta l'app
  // qualsiasi componente può utilizzare useSelector, useDispatch ...
  <Provider store={store}>
    <App />
  </Provider>
);
