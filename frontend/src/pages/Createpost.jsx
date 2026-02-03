import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Createpost = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [location, setlocation] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("location", location);
    try {
      const response = await axios.post(
        `https://gen-caption.onrender.com/post/createpost`,
        formData,
        {
          withCredentials: true,
        },
      );

      if (response.status === 201) {
        toast.success("post created successfully!");
        navigate("/home");
      } else {
        toast.error(response.data.message);
        navigate("/createpost");
      }
    } catch (error) {
      toast.error("you are not logged in login first");
      navigate("/login");
    }
  };
  useEffect(() => {
    handleUpload();
  }, []);
  return (
    <div className="h-[94%] w-[94%]  flex items-center justify-center ">
      <div className=" w-full  md:w-1/3 bg-[#1F2227] text-white backdrop-blur-sm p-4 flex items-center justify-center flex-col gap-3 rounded">
        {" "}
        <h1 className="md:text-xl text-3xl font-semibold">Create Post</h1>
        <form
          onSubmit={handleUpload}
          className="w-full h-full flex flex-col items-center text-center  justify-center gap-4"
          action=""
        >
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer  hover:bg-gray-100 transition">
            <svg
              className="w-8 h-8 mb-2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V12m0 0V8m0 4h4m6 4V8m0 8a4 4 0 01-4 4H7a4 4 0 01-4-4V8a4 4 0 014-4h5l4 4h1a4 4 0 014 4z"
              />
            </svg>

            <span className="text-sm text-white">Click to select Post</span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <input
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            type="text"
            id=""
            placeholder="Enter the Location"
            className="border rounded p-1"
          />

          <button
            type="submit"
            className="bg-[#00AE66] rounded px-6 py-3 md:px-2  md:py-1 md:mt-3 text-white"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createpost;
