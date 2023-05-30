import { useOutletContext, useParams } from "react-router-dom";

import React, { useState, useLayoutEffect } from "react";
import Footer from "../../components/footer";
import ReactVideoPlayer from "../ReactVideoPlayer";
import "./coursVid.css";
import introvide from "../h.mkv";
import Comments from "./components/comments/Comments";
// requete ml back feha cours id chyaatik cours video url fl introvid cours id fl h1
const CoursVid = () => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();

  const showNav = () => setAnimationIsFinished(true);
  const { courseID } = useParams();
  useLayoutEffect(() => {
    showNav();
  }, []);
  return (
    <div className="Course-content">
      <h1 style={{ color: "white" }}>{courseID}</h1>
      <ReactVideoPlayer video={introvide} />
      <Comments></Comments>
      <Footer />
    </div>
  );
};

export default CoursVid;
