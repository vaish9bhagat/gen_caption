import React from "react";
import { useState, useRef } from "react";
import { useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Home = forwardRef((props, divref) => {
  const navigate = useNavigate();
  const [posts, setPost] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`https://gen-caption.onrender.com/post/allposts`, {
        withCredentials: true,
      });
      setPost(res?.data?.posts?.reverse());
    } catch (err) {
      console.log(err);
      const msg =
        err.response?.data?.message || "You are not logged in. Login first";
      toast.error(msg, { style: { background: "#1F2227", color: "#fff" } });
      navigate("/login");
    }
  };

  const likePost = async (postId) => {
    try {
      const res = await axios.post(
        `https://gen-caption.onrender.com/post/likepost/${postId}`,
        {},
        { withCredentials: true },
      );
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const allposts =
    posts && posts.length > 0 ? (
      posts.map((post, index) => (
        <div
          key={index}
          className="md:w-1/3 w-full p-2 rounded bg-[#1F2227] text-white flex flex-col gap-2"
        >
          <div className="flex items-start  flex-col justify-between">
            <div className="flex items-center  justify-center gap-1.5">
              <img
                className="w-5 h-5 rounded-full"
                src={post.user.profileimage}
                alt=""
              />
              <p className="text-xl">{post.user.username}</p>
            </div>
            {post.location && (
              <span className="flex items-center justify-center text-[12px] mt-1.5">
                <i class="ri-map-pin-fill"></i>
                <p>{post?.location}</p>
              </span>
            )}
          </div>

          <img
            className="w-full object-cover object-center max-h-94"
            src={post?.image}
            alt=""
          />
          <span onClick={() => likePost(post._id)} className="text-xl">
            <i class="ri-thumb-up-fill"></i> {post?.likes?.length}
          </span>

          <p>{post?.caption}</p>
        </div>
      ))
    ) : (
      <h1 className="text-white text-2xl">No posts.</h1>
    );

  return (
    <div className="w-[94%] sm:w-full sm:h-screen h-[94%] rounded overflow-auto hide-scrollbar md:p-4 p-2  flex flex-col items-center justify-start gap-2 ">
      {allposts}
    </div>
  );
});

export default Home;
