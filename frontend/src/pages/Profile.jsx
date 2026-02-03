import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const formdata = new FormData();
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [userposts, setuserposts] = useState([]);

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/post/deletepost/${id}`,
        {
          withCredentials: true,
        },
      );
      setuserposts(res?.data?.posts?.reverse());
      userPosts()
      console.log(res);
      const msg = res?.data?.message;
      toast.error(msg, { style: { background: "#1F2227", color: "#fff" } });
    } catch (err) {
      console.log(err);
    }
  };

  const userPosts = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/post/userposts/",
        {},
        { withCredentials: true },
      );
      setuserposts(res.data.userPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchdata = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/profile`, {
        withCredentials: true,
      });
      setuser(res.data.user);
      console.log(res.data.user);
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("you are not logged in ,login first");
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchdata();
    userPosts();
  }, []);

  const logouthandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const newuserposts = userposts?.map((post) => {
    return (
      <div className="relative ">
        <i
          onClick={() => deleteHandler(post?._id)}
          className="ri-delete-bin-5-fill absolute top-0 right-0 p-2 text-white hover:scale-150 hover:text-red-300 transition-transform duration-300 ease-out cursor-pointer"
        ></i>
        <img
          className="w-full h-full object-center object-cover"
          src={post?.image}
          alt=""
          srcset=""
        />
        <div className="absolute bottom-0 m-auto p-2 text-white">
          <i class="ri-thumb-up-fill"></i>
          {post?.likes?.length}
        </div>
      </div>
    );
  });

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    formdata.append("image", file);
    try {
      const res = await axios.post(
        "http://localhost:3000/post/userprofileimage",
        formdata,
        { withCredentials: true },
      );
      console.log(res);
      setuser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[94%] flex items-center flex-col justify-center gap-2 ">
      <div className="md:w-1/3 w-full  md:p-4 p-8  text-white  flex flex-col   items-center  justify-center gap-6 rounded">
        <div className="flex gap-4 items-center justify-center flex-col">
          <img
            className="w-20 h-20 bg-amber-50 cursor-pointer  rounded-full object-cover object-center"
            src={user?.profileimage}
            onClick={handleClick}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleChange}
            hidden
          />

          <div>
            {" "}
            <h3 className="text-3xl md:text-2xl">{user?.username}</h3>
          </div>
        </div>
        <h3 className="text-2xl">Total Posts : {userposts?.length}</h3>
        <button
          onClick={logouthandler}
          className="bg-[#00AE66] text-white px-6 py-3 md:px-3 md:py-1 rounded"
        >
          Log Out
        </button>
        <hr />
      </div>

      <div className="md:w-1/3 [#1F2227] grid grid-cols-2 gap-1 overflow-y-auto  overflow-y-scroll no-scrollbar">
        {newuserposts}
      </div>
    </div>
  );
};

export default Profile;
