import React from "react";
import Register from "./pages/Register";
import Approutes from "./routes/Approutes";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className=" h-screen w-screen  bg-[#121315] bg-no-repeat bg-center bg-cover flex items-center justify-between flex-col p-4">
      <Navbar />
      <Approutes />
    </div>
  );
};

export default App;
