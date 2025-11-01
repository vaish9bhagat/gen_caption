import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerhandler = async (user) => {
    axios
      .post(`http://localhost:3000/auth/register`, user, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    reset();
  };
  return (
    <div className="h-screen w-screen  flex justify-center items-center flex-row gap-2">
      <div className=" p-6 md:w-1/4 rounded bg-[#1F2227]  text-white ">
        <form
          onSubmit={handleSubmit(registerhandler)}
          className=" h-full w-full flex flex-col justify-center items-center md:gap-3 gap-6"
        >
          <h1 className="text-3xl md:text-2xl font-semibold">Register</h1>
          <div className="flex flex-col gap-1">
            {" "}
            <input
              {...register("username", { required: "username field is empty" })}
              className="text-2xl md:text-xl  border-b border-[#07B26C] text-white outline-0"
              type="text"
              id=""
              placeholder="Enter Username"
            />
            {errors.username && (
              <small className="text-red-800">{errors.username.message}</small>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <input
              {...register("password", { required: "password field is empty" })}
              className=" text-2xl md:text-xl border-b border-[#07B26C] text-white outline-0"
              type="password"
              id="1"
              placeholder="Enter Password"
            />
            {errors.password && (
              <small className="text-red-800">{errors.password.message}</small>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#07B26C] text-2xl md:text-xl text-white px-4 py-1 rounded"
          >
            Register
          </button>
          <p className="text-center">If Already have An Account!</p>
          <NavLink
            className="border-b  text-2xl md:text-xl text-[#07B26C]"
            to="/login"
          >
            Log In <i className="ri-arrow-right-box-fill"></i>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Register;
