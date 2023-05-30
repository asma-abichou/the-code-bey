import React, { useLayoutEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createStream } from "../../redux/actions";
import StreamForm from "../../components/stream/StreamForm";
import { useOutletContext } from "react-router-dom";
import Footer from "../../components/footer";

const StreamCreate = (props) => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, []);
  const dispatch = useDispatch();

  const onFormSubmit = (formValues) => {
    dispatch(createStream(formValues));
  };

  return (
    <div className="StreamCreate">
      <Container maxWidth="sm" style={{ marginTop: 100, marginBottom: 250 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create a Stream
        </Typography>
        <StreamForm onSubmit={onFormSubmit} />
      </Container>
      <Footer />
    </div>
  );
};

export default StreamCreate;
