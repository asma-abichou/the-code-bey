/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from "react";
import { Container } from "@material-ui/core";
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
    <div>
      <Container style={{ marginTop: 100, marginBottom: 250, marginLeft: 50 }}>
        <StreamForm onSubmit={onFormSubmit} />
      </Container>
      <Footer />
    </div>
  );
};

export default StreamCreate;
