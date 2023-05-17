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

const StreamList = () => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, []);
  const dispatch = useDispatch();
  const state = useSelector(state => state.streams);
  const streams = Object.values(state);

  const onItemDelete = streamId => {
    dispatch(deleteStream(streamId));
  };

  useEffect(() => {
    dispatch(fetchStreams());
  }, [dispatch]);

  const renderAuthUser = stream => {
      return (
        <React.Fragment>
          <Link
            to={`/stream/edit/${stream.id}`}
            style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: 'rgb(5, 31, 66)',
                color: '#fff',
                marginRight: 10,
              }}>
              Edit
            </Button>
          </Link>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onItemDelete(stream.id)}>
            Delete
          </Button>
        </React.Fragment>
      );
    
  };

  const renderStreams = () => {
    return streams.map(stream => {
      return (
        <Grid
          item
          xs={6}
          sm={6}
          key={stream.id}
          style={{ marginBottom: 20, position: 'relative' }}>
          <Paper
            style={{
              padding: 10,
              height: '100%',
            }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Avatar src={stream.user.avatar_url} />
              <Typography
                variant="h6"
                style={{
                  paddingLeft: 10,
                }}>
                {stream.user.username}{' '}
              </Typography>
            </div>
            <CardContent>
              <Typography variant="h6">{stream.title}</Typography>
              <Typography component="p">{stream.description}</Typography>
              <div style={{ position: 'absolute', bottom: 5 }}>
                <Link
                  to={`/stream/watch/${stream.id}`}
                  style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: 'rgb(5, 31, 66)',
                      color: '#fff',
                      marginRight: 10,
                    }}>
                    Watch Stream
                  </Button>
                </Link>
                {renderAuthUser(stream)}
              </div>
            </CardContent>
          </Paper>
        </Grid>
      );
    });
  };

  const renderButton = () => {
    
      return (
        <div style={{ textAlign: 'right' }}>
          <Link
            to="/stream/new"
            style={{
              textDecoration: 'none',
            }}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'rgb(5, 31, 66)', color: '#fff' }}>
              Create Stream
            </Button>
          </Link>
        </div>
      );
    
  };

  return (
   
      <Container style={{ marginTop: 70 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: 10 }}>
          <Typography variant="h4" style={{ color: 'rgb(5, 31, 66)' }}>
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
