/* eslint-disable react/prop-types */
import React, { useEffect, useLayoutEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleStream, editStream } from '../../redux/actions';
import StreamForm from '../../components/stream/StreamForm';
import _ from 'lodash';
import { useOutletContext, useParams } from 'react-router-dom';

const StreamEdit = props => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, []);
  const { id } = useParams
  const dispatch = useDispatch();
  const stream = useSelector(state => state.streams[id]);

  const onFormSubmit = formValues => {
    console.log(formValues);
    dispatch(editStream(id, formValues));
  };


  return (
   
      <Container style={{ marginTop: 50 }}>
        {!stream ? 'Loading' : stream.title}
        <StreamForm
          initialValues={_.pick(stream, 'title', 'description')}
          onSubmit={onFormSubmit}
        />
      </Container>
    
  );
};

export default StreamEdit;
