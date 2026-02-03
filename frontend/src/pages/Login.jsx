import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginhandler = async (user) => {
    try {
      const res = await axios.post(`https://gen-caption.onrender.com/auth/login`, user, {
        withCredentials: true,
      });
      if (res) {
        toast.success(res.data.message);
        navigate("/home");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-screen  flex justify-center items-center flex-row gap-2">
      <div className=" p-6 md:w-1/4 rounded bg-[#1F2227]  text-white ">
        <form
          onSubmit={handleSubmit(loginhandler)}
          className=" h-full w-full flex flex-col justify-center items-center md:gap-3 gap-6"
        >
          <h1 className="text-3xl md:text-2xl font-semibold">Login</h1>
          <div className="flex flex-col gap-1">
            <input
              {...register("email", { required: "username field is empty" })}
              className="text-2xl md:text-xl  border rounded border-[#07B26C] text-white outline-0"
              type="email"
              id=""
              placeholder="Enter Email"
            />
            {errors.username && (
              <small className="text-red-800">{errors.username.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              {...register("password", { required: "password field is empty" })}
              className=" text-2xl md:text-xl border rounded border-[#07B26C] text-white outline-0"
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
            Log in
          </button>
          <p className="text-center">If you dont have An Account!</p>
          <NavLink
            className="border-b  text-2xl md:text-xl text-[#07B26C]"
            to="/"
          >
            Register <i className="ri-arrow-right-box-fill"></i>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
