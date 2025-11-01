import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState(null);

  const fetchdata = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/profile`, {
        withCredentials: true,
      });
      setuser(res.data.user.username);
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("you are not logged in ,login first");
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const logouthandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[94%] h-[94%] flex items-center justify-center ">
      <div className="md:w-1/3  md:p-4 p-16 bg-[#1F2227] text-white  flex   items-center  justify-center gap-12 rounded">
        <div className="flex gap-4  flex-col items-center justify-center">
          <h1 className="font-semibold text-4xl md:text-2xl">Username</h1>
          <h3 className="text-3xl md:text-2xl">@{user}</h3>
          <button
            onClick={logouthandler}
            className="bg-[#00AE66] text-white px-6 py-3 md:px-3 md:py-1 rounded"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
