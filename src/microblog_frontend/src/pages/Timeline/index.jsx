import React, { useEffect, useState } from 'react';
import { microblog_backend } from '../../../../declarations/microblog_backend';
import { Message } from '../../components/Message';
import { Divider } from '@mui/material';

export const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    loadTimeline();
    }, []
  )

  const loadTimeline = async () => {
    setTimeline(await microblog_backend.timeline(0));
  };

  return (
    <>
      <h3>Timeline</h3>
      <Divider />
      {
        timeline.map((msg, index) => <Message key={index} {...msg} />)
      }
    </>
  );
};