import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Createpost = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const divref = useRef(null);
  const scrollbottam = () => {
    divref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:3000/post/createpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success("post created successfully!");
      navigate("/home");
      setTimeout(scrollbottam, 0);
    } catch (error) {
      console.error(error);
      toast.error("you are not logged in login first");
      navigate("/login");
    }
  };
  useEffect(() => {
    handleUpload()
  }, []);
  return (
    <div className="h-[94%] w-[94%]  flex items-center justify-center ">
      <div className="md:h-1/2 w-full  md:w-1/3 bg-[#1F2227] text-white backdrop-blur-sm p-4 flex items-center justify-center flex-col gap-3 rounded">
        {" "}
        <h1 className="md:text-xl text-3xl font-semibold">Create Post</h1>
        <form
          onSubmit={handleUpload}
          className="w-full h-full flex flex-col items-center text-center  justify-center gap-4"
          action=""
        >
          <input
            className="md:ml-20 ml-35 text-2xl text-center"
            type="file"
            name=""
            id=""
            placeholder="submit image"
            onChange={handleFileChange}
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
