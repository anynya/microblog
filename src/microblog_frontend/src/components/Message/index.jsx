import React from 'react';
import { Card, CardContent, Divider } from '@mui/material';
import './index.css';

export const Message = (props) => {
  const { time, text, author } = props;
  const displayTime = new Date(parseInt(time.toString().slice(0, 13))).toLocaleString();

  return (
    <>
      <Card className='message-box'>
        <CardContent>
          <p className='name'>{author === '' || !author ? '[unknow]' : author}</p>
          <p className='time'>{displayTime}</p>
          <Divider />
          <p className='text'>{text}</p>
        </CardContent>
      </Card>
    </>
  )
}