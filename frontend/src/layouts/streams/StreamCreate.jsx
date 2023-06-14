import React from 'react';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createStream } from '../../redux/actions';
import StreamForm from '../../components/stream/StreamForm';
import { useOutletContext } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const StreamCreate = () => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);
  const { auth } = useAuth();
  const username = localStorage.getItem('user');
  console.log(username); 
  React.useEffect(() => {
    showNav();
  }, []);

  const dispatch = useDispatch();

  const onFormSubmit = formValues => {
    // Retrieve the username from localStorage or wherever it is stored
    const formData = { ...formValues, username }; // Include the username in the form data
    dispatch(createStream(formData));
  };

  return (
    <div className="StreamCreate">
      <Container maxWidth="sm" style={{ marginTop: 100, marginBottom: 250 }}>
        <StreamForm onSubmit={onFormSubmit} formTitle="Create Stream">
          <div>
            <label></label>
            <input type="text" name="title" placeholder='title' />
          </div>
          <div>
            <label></label>
            <input type="text" name="description" placeholder='Description:' />
          </div>
        </StreamForm>
      </Container>

    </div>
  );
};

export default StreamCreate;
