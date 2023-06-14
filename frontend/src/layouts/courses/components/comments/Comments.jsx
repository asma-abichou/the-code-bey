import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import CommentItem from '../commentItem/CommentItem';
import './comments.css';
import axios from '../../../../api/axios';

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
];

const Comments = (props) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [arrayList, setArrayList] = useState([]);
  const [count, setCount] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/comment/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        
       
        const filteredComments = response.data.filter((item) => item.course.id == props.courseId);
setArrayList(filteredComments);
setCount(filteredComments.length)

       
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const inputValue = (e) => {
    setName(e.target.value);
  };

  const textValue = (e) => {
    setComment(e.target.value);
  };

  const addComment = (e) => {
    e.preventDefault();
    const firstName = name.slice(0, 1);
    const date = formatDistanceToNow(new Date());
    const index = initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)];
    const newComment = {
      id: uuidv4(),
      firstNames: firstName,
      names: name,
      comments: comment,
      dates: date,
      newClass: index,
      isFavorite: false,
    };
    setArrayList((prevList) => [...prevList, newComment]);
    setName('');
    setComment('');

    // API request to post the comment
    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/api/comment/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: comment,
        courseId: props.courseId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
      })
      .catch((error) => {
        // Handle any errors that occur during the request
      });
  };

  const toggleFavorite = (id) => {
    setArrayList((prevList) =>
      prevList.map((eachData) => {
        if (eachData.id === id) {
          return { ...eachData, isFavorite: !eachData.isFavorite };
        }
        return eachData;
      })
    );
  };

  const deleteComment = (id) => {
    // API request to delete the comment
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/comment/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        // Update the arrayList and count states after deleting the comment
        const filteredList = arrayList.filter((eachValue) => eachValue.id !== id);
        setArrayList(filteredList);
        setCount((prevCount) => prevCount - 1);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };
  

  return (
    <div className="main-container">
      <h1 className="main-heading">Leave a comment</h1>
      <div className="inner-holder">
        <div className="element-holder">
          <form className="element-holder" onSubmit={addComment}>
            <br />
            <textarea
              className="comment-field"
              placeholder="Your Comment"
              onChange={textValue}
              value={comment}
            />
            <button type="submit" className="btn">
              Add Comment
            </button>
          </form>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
          className="image1"
          alt="comments"
        />
      </div>
      <hr />
      <p className="comments-count">
        <br />
        <span className="number-count">{count}</span> Comments
        <ul className="comment-holder">
          {arrayList.map((eachObject) => (
            <CommentItem
              key={eachObject.id}
              arrayList={eachObject}
              deleteComment={deleteComment}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </ul>
      </p>
    </div>
  );
};

export default Comments;
