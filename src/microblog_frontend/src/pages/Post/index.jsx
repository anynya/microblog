import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Message } from '../../components/Message';
import { microblog_backend } from '../../../../declarations/microblog_backend';
import { useAlert } from '../../contexts/alert';

export const Post = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const { okAlert, errAlert } = useAlert();

  useEffect(() => {
      loadPosts();
    }, []
  )

  const postMessage = async () => {
    try {
      await microblog_backend.post(otp, message)
      okAlert('Post Success!')
    } catch (err) {
      console.log(err);
      errAlert('Post Failed!')
    } finally {
      setMessage('');
      await loadPosts();
    }
  };

  const loadPosts = async () => {
    setPosts(await microblog_backend.posts(0));
  };

  return (
    <>
      <h3>What do you want to post?</h3>
      <TextField
        id='filled-multiline-static'
        label='OTP'
        value={otp}
        onChange={event => setOtp(event.target.value)}
        variant='filled'
      />
      <div className='inline'>
        <TextField
          id='filled-multiline-static'
          label='Text'
          multiline
          rows={4}
          value={message}
          onChange={event => setMessage(event.target.value)}
          variant='filled'
        />
        <Button variant='contained' onClick={postMessage}>Post</Button>
      </div>
      <h3>My Posts:</h3>
      {
        posts.map((msg, index) => <Message key={index} {...msg} />)
      }
    </>
  );
};