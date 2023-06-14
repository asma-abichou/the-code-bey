import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStreams, deleteStream } from '../../redux/actions';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Avatar,
  CardContent,
} from '@material-ui/core';
import { Link, useOutletContext } from 'react-router-dom';
import './stream-list.css';

const StreamList = () => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, []);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.streams);
  const streams = Object.values(state);

  const onItemDelete = (streamId) => {
    dispatch(deleteStream(streamId));
  };

  useEffect(() => {
    dispatch(fetchStreams());
  }, [dispatch]);

  const openOBS = () => {
    alert('Please open OBS to start streaming');
  };

  const renderAuthUser = (stream) => {
    const role = localStorage.getItem('roles');

    if (role === 'ROLE_ADMIN' || role === 'ROLE_TEACHER') {
      return (
        <>
          <Link to={`/stream/edit/${stream.id}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: 'rgb(5, 31, 66)',
                color: '#fff',
                marginBottom: '8px',
                marginTop: '8px',
                marginRight: '8px',
                width: '150px',
              }}
            >
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: '150px' }}
            onClick={() => onItemDelete(stream.id)}
          >
            Delete
          </Button>
          {role === 'ROLE_TEACHER' && (
           <div style={{ display: 'flex', marginTop: '8px' }}>
           <Button
             variant="contained"
             style={{
               backgroundColor: 'rgb(5, 31, 66)',
               color: '#fff',
               marginRight: '8px',
               marginTop: '8px',
               flex: 1,
               width: '150px',
             }}
             onClick={openOBS}
           >
             Start Streaming (OBS)
           </Button>
         </div>
         
         
          )}
        </>
      );
    }

    return (
      <Link to={`/stream/watch/${stream.id}`} style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: 'rgb(5, 31, 66)',
            color: '#fff',
            marginRight: 10,
            width: '150px',
          }}
        >
          Watch Stream
        </Button>
      </Link>
    );
  };

  const renderStreams = () => {
    return streams.map((stream) => {
      return (
        <Grid
          item
          xs={6}
          sm={6}
          key={stream.id}
          style={{ marginBottom: 20, position: 'relative' }}
        >
          <Paper
            style={{
              padding: 10,
              height: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Avatar src={stream.user.avatar_url} />
              <Typography variant="h6" style={{ paddingLeft: 10 }}>
                {stream.user.username} Teacher
              </Typography>
            </div>
            <CardContent>
              <Typography variant="h4">{stream.title}</Typography>
              <Typography variant="h6" color="black">
                {stream.description}
              </Typography>
              <div style={{ bottom: 5 }}>
                {renderAuthUser(stream)}
              </div>
            </CardContent>
          </Paper>
        </Grid>
      );
    });
  };

  const renderButton = () => {
    const role = localStorage.getItem('roles');

    if (role === 'ROLE_ADMIN' || role === 'ROLE_TEACHER') {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/stream/new" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'rgb(5, 31, 66)', color: '#fff' }}
            >
              Create Stream
            </Button>
          </Link>
        </div>
      );
    }

    return null;
  };

  return (
    <Container style={{ marginTop: 70 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: 10 }}
      >
        <Typography variant="h4" style={{ color: '#f50057' }}>
          Streamed Videos
        </Typography>
        {renderButton()}
      </Grid>
      <Grid container spacing={3} direction="row" alignItems="stretch">
        {renderStreams()}
      </Grid>
    </Container>
  );
};

export default StreamList;
