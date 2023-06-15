import React from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleStream, editStream } from '../../redux/actions';
import StreamForm from '../../components/stream/StreamForm';
import _ from 'lodash';
import { useOutletContext, useParams } from 'react-router-dom';

const StreamEdit = () => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  React.useEffect(() => {
    showNav();
  }, []);

  const { id } = useParams();
  const dispatch = useDispatch();
  const stream = useSelector(state => state.streams[id]);

  const onFormSubmit = formValues => {
    console.log(formValues);
    dispatch(editStream(id, formValues));
  };

  return (
    <Container style={{ marginTop: 50 }}>
      <StreamForm
        onSubmit={onFormSubmit}
        formTitle="Edit Stream"
        initialValues={_.pick(stream, 'title', 'description')}
      >
        <div>
          <label></label>
          <input type="text" name="title" placeholder='title' />
        </div>
        <div>
          <label></label>
          <input type="text" name="description" placeholder='description' />
        </div>
      </StreamForm>
    </Container>
  );
};

export default StreamEdit;
