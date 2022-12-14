import React, { useRef, useEffect } from "react";
import "./Start.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClapSpinner } from "react-spinners-kit";
import { TimelineMax, Power3 } from "gsap";
import Snowfall from "react-snowfall";
import userStore from "../User";

const t1 = new TimelineMax({ ease: "none", duration: 0.8 });

function Start() {
  document.title = "DropLike Welcome!";

  const navigate = useNavigate();

  const addUser = userStore((state) => state.addUser);
  useEffect(() => {
    addUser("");
  }, []);

  //**************UseRef**************//

  let overlay = useRef(null);
  let firstDiv = useRef(null);
  let secondDiv = useRef(null);
  let thirdDiv = useRef(null);
  let logo = useRef(null);
  let text = useRef(null);

  //**************Gsap useEffect**************//
  useEffect(() => {
    t1.to(firstDiv, { y: "100%", opacity: 0 }, 0.2)
      .to(secondDiv, { y: "100%", opacity: 0 }, 0.4)
      .to(thirdDiv, { y: "100%", opacity: 0 }, 0.6)
      .from(logo, { scale: 2, duration: 1, opacity: 0 }, 0.7)
      .from(
        text,
        {
          opacity: 0,
          y: 20,
        },
        1
      )
      .from(
        logo,
        {
          rotate: 400,
          duration: 1.4,
          onComplete: () => {
            navigate("/register");
          },
        },
        1
      );
  });

  return (
    <div className="start">
      <Snowfall />
      <img ref={(el) => (logo = el)} src="/logo4.png" className="logo" alt="" />
      <h3 ref={(el) => (text = el)}>droplike</h3>

      <div className="overlay" ref={(el) => (overlay = el)}>
        <div className="firstDiv" ref={(el) => (firstDiv = el)}></div>
        <div className="secondDiv" ref={(el) => (secondDiv = el)}></div>
        <div className="thirdDiv" ref={(el) => (thirdDiv = el)}></div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Start;
