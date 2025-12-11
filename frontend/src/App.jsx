import GTM from "./GTM";
import React from "react";
import Register from "./pages/Register";
import Approutes from "./routes/Approutes";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TagManager from "react-gtm-module";

const App = () => {
  TagManager.initialize({ gtmId: "GTM-XXXX" });
  return (
    <>
      <GTM />
      <div className=" h-screen w-screen  bg-[#121315] bg-no-repeat bg-center bg-cover flex items-center justify-between flex-col p-4">
        <Navbar />
        <Approutes />
      </div>
    </>
  );
};

export default App;
