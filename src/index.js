import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";//顶层引用

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
