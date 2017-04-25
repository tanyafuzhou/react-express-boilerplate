import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const rootEl = document.getElementById("root");

const render = Component => ReactDOM.render(<Component />, rootEl);

render(App);
if (module.hot) module.hot.accept();
