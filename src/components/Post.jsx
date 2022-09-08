import React, { useEffect, useState, useRef } from "react";
import "./Post.css";
import axios from "axios";
import userStore from "../User";
import { TweenMax, TimelineLite, Power3 } from "gsap";

function Post({ data, loading }) {
  //*****************UserStore*******************//
  const user = userStore((state) => state.user[0]);

  //*****************UseState*******************//
  const [userProfile, setUserProfile] = useState(null);
  const [likee, setLikee] = useState(null);

  //*****************Fetch Function*******************//
  const fetchUserDetail = async () => {
    await axios({
      method: "POST",
      url: `https://droplikebackend.herokuapp.com/api/user/get/${user._id}`,
      withCredentials: true,
      data: {
        userId: data?.userId,
      },
    }).then((res) => {
      setUserProfile(res.data);
    });
  };

  //*********************Like Function***********************//
  const likeFunc = async () => {
    if (likee == "liked") {
      setLikee("unliked");
      await axios({
        url: `https://droplikebackend.herokuapp.com/api/post/like/${data._id}`,
        method: "PUT",
        withCredentials: true,
        data: {
          userId: user._id,
        },
      }).catch((err) => {
        setLikee("liked");
      });
    } else {
      setLikee("liked");
      await axios({
        url: `https://droplikebackend.herokuapp.com/api/post/like/${data._id}`,
        method: "PUT",
        withCredentials: true,
        data: {
          userId: user._id,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          setLikee("liked");
        });
    }
  };
  //*****************UseEffect*******************//
  useEffect(() => {
    if (data?.likes.includes(user._id)) {
      setLikee("liked");
    } else {
    }
    if (data) {
      fetchUserDetail();
    } else {
    }
  }, []);

  //*****************UseRef*******************//
  let post = useRef(null);
  let profilePicture = useRef(null);
  let userRef = useRef(null);
  let caption = useRef(null);
  let image = useRef(null);
  let like = useRef(null);
  let comment = useRef(null);
  let deleteRef = useRef(null);

  //**************UseEffect for Gsap*****************//
  const t1 = new TimelineLite();
  useEffect(() => {
    t1.from(post, 0.8, { opacity: 0 })
      .from(profilePicture, 0.8, {
        opacity: 0,
        y: 20,
        delay: 0.4,
      })
      .from(userRef, 0.8, {
        opacity: 0,
        y: 20,
        delay: 0.6,
      });

    TweenMax.from(caption, 0.8, {
      opacity: 0,
      y: 20,
      delay: -0.4,
    });
    TweenMax.from(image, 0.8, {
      opacity: 0,
      delay: 0.8,
      ease: Power3.easeInOut,
    });
    TweenMax.from(like, 0.8, {
      opacity: 0,
      y: 20,
      delay: 0.9,
    });
    TweenMax.from(comment, 0.8, {
      opacity: 0,
      y: 20,
      delay: 1,
    });
    TweenMax.from(deleteRef, 0.8, {
      opacity: 0,
      y: 20,
      delay: 1.2,
    }); 
  }, []);

  return (
    <div ref={(el) => (post = el)} className="post">
      <div className="post-header">
        {user?.gender == "m" && (
          <img className="userImage" src="/male.jpg" alt="" />
        )}
        {user?.gender == "f" && (
          <img className="userImage" src="/henessy.jpg" alt="" />
        )}
        {!user && <img className="userImage" src="/noImg.png" alt="" />}

        {userProfile && (
          <div ref={(el) => (userRef = el)} className="username">
            <h3>{userProfile.username}</h3>
            {loading && "fetching..."}
          </div>
        )}
      </div>
      <div className="mainSection">
        <div ref={(el) => (caption = el)} className="caption">
          {data && data.caption}
          {loading && "fetching..."}
        </div>

        <div className="action">
          {likee === "liked" ? (
            <img
              onClick={likeFunc}
              src="/liked.png"
              ref={(el) => (like = el)}
              className="actionImg"
              alt=""
            />
          ) : (
            <img
              onClick={likeFunc}
              src="/notliked.png"
              ref={(el) => (like = el)}
              className="actionImg"
              alt=""
            />
          )}
          <img
            src="/comment.png"
            ref={(el) => (comment = el)}
            className="actionImg"
            alt=""
          />
          <img
            src="/delete.png"
            ref={(el) => (deleteRef = el)}
            className="actionImg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
