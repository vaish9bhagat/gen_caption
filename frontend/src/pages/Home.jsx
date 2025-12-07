import React from "react";
import { useState, useRef } from "react";
import { useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Home = forwardRef((props, divref) => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`https://capgen-7lpn.onrender.com/post/allposts`, {
          withCredentials: true,
        })
        .then((res) => {
          setPost(res.data.posts.reverse());
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
          toast.error("you are not logged in login first");
          navigate("/login");
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deletePost=async(user)

  const allposts = post?.map((post, index) => {
    return (
      <div
        key={index}
        className="md:w-1/3  w-full p-2 rounded bg-[#1F2227] text-white backdrop-blur-sm  flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
         
          <i onClick={()=>deletePost(post.user)} className="ri-close-circle-line text-2xl text-[#07B26C]"></i>
        </div>
        <img className=" w-full object-cover object-center " src={post?.image} alt="" />
        <p>{post.caption}</p>
        <div ref={divref} />
      </div>
    );
  });

  return (
    <div className="w-[94%] sm:w-full sm:h-screen h-[94%] rounded overflow-auto hide-scrollbar md:p-4 p-2  flex flex-col items-center justify-start gap-2 ">
      {allposts}
    </div>
  );
});

export default Home;
