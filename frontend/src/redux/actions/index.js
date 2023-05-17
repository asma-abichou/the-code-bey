import { streamDb } from '../../api/axios';
import history from '../../history';
import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_SINGLE_STREAM,
  EDIT_STREAM,
} from './types';



// export const getAuthUser = user => async dispatch => {
//   dispatch({ type: GET_AUTH_USER, payload: user });
// };

export const createStream = formValues => async (dispatch, getState) => {
  const response = await streamDb.post('/streams', {
    ...formValues,
    userId: "",
    user: "",
  });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/streams');
};

export const fetchStreams = () => async dispatch => {
  const response = await streamDb.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchSingleStream = id => async dispatch => {
  const response = await streamDb.get(`/streams/${id}`);

  dispatch({ type: FETCH_SINGLE_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streamDb.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/streams');
};

export const deleteStream = id => async dispatch => {
  await streamDb.delete(`/streams/${id}`);

  dispatch({ type: EDIT_STREAM, payload: id });
};
