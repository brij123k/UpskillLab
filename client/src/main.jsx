import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./sccs/main.scss";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "react-multi-carousel/lib/styles.css";
import { HelmetProvider } from "react-helmet-async";
// Must be imported before the first render: captures build-time page data.
import "./utils/initialData";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);