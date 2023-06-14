import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import flv from "flv.js";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchSingleStream } from "../../redux/actions";
import { useOutletContext, useParams } from "react-router-dom";
import "./stream-watch.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
function StreamWatch({ stream, fetchStream }) {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, []);

  const videoRef = useRef();
  const { id } = useParams();

  const [liveViews, setLiveViews] = useState(0);
  const [isStreamLive, setIsStreamLive] = useState(true);

  useEffect(() => {
    fetchStream(id);
    buildPlayer();

    // Connect to WebSocket to receive live views updates
    const socket = new WebSocket("ws://localhost:8000/live-views");

    // Listen for live views updates
    socket.addEventListener("message", (event) => {
      const { streamId, views } = JSON.parse(event.data);

      // Update live views count if the received stream ID matches the current stream
      if (streamId === id) {
        setLiveViews(views);
      }
    });

    return () => {
      // Close WebSocket connection on component unmount
      socket.close();
    };
  }, [id]);

  let player;

  const buildPlayer = () => {
    if (player || !stream) {
      return;
    }

    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:3004/live/${id}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();

    // Check if the player is playing the stream
    player.on("playing", () => {
      setIsStreamLive(true);
    });

    // Check if the player is paused or stopped
    player.on("pause", () => {
      setIsStreamLive(false);
    });

    player.on("ended", () => {
      setIsStreamLive(false);
    });
  };

  if (!stream) {
    return "Loading";
  }

  const { title, description } = stream;

  return (
    <Container className="Container">
      <video ref={videoRef} className="video" controls={true} />
      <div className="views">
        <p className="live-views">
          <VisibilityOutlinedIcon className="live-views-logo"></VisibilityOutlinedIcon>
          Views: {liveViews}
        </p>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {isStreamLive ? (
        <p className="live-status-on">Live: Stream is currently running</p>
      ) : (
        <p className="live-status-off">
          Offline: Stream is not currently running
        </p>
      )}
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