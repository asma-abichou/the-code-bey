import React, { useEffect, useLayoutEffect, useRef } from "react";
import flv from "flv.js";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchSingleStream } from "../../redux/actions";
import { useOutletContext, useParams } from "react-router-dom";

function StreamWatch({ stream, fetchStream }) {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, []);
  const videoRef = useRef();
  const { id } = useParams();

  useEffect(() => {
    fetchStream(id);
    buildPlayer();
  }, [id]);



  let player;

  const buildPlayer = () => {
    if (player || !stream) {
      return;
    }

    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  };

  if (!stream) {
    return "Loading";
  }

  const { title, description } = stream;

  return (
  
      <Container style={{ marginTop: 20 }}>
        <video ref={videoRef} style={{ width: "100%" }} controls={true} />
        <h3>{title}</h3>
        <p>{description}</p>
      </Container>
   
  );
}

const mapStateToProps = (state, ownProps) => {
  const url = window.location.href;
  const segments = url.split("/");
  const id = segments[segments.length - 1];
  return {
    stream: state.streams[id],
  };
};

export default connect(mapStateToProps, { fetchStream: fetchSingleStream })(
  StreamWatch
);
