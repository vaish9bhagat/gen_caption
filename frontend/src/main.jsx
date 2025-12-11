import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TagManager from "react-gtm-module";

 TagManager.initialize({ gtmId: "GTM-WN986WT5" })
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {" "}
    <App />
    <ToastContainer
      toastStyle={{ backgroundColor: "#1F2227", color: "#fff" }}
      position="top-center"
     
    />
  </BrowserRouter>
);
