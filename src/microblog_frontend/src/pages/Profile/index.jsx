import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { microblog_backend } from '../../../../declarations/microblog_backend';
import { useAlert } from '../../contexts/alert';

export const Profile = () => {
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const { okAlert, errAlert } = useAlert();

  useEffect(() => {
      loadName();
    }, []
  )

  const loadName = async () => {
    const res = await microblog_backend.get_name()
    setName(res[0]);
  };

  const handleSetName = async () => {
    try {
      await microblog_backend.set_name(otp, name)
      okAlert('Post Success!')
    } catch (err) {
      console.log(err);
      errAlert('Post Failed!')
    } finally {
      await loadName();
    }
  };

  return (
    <>
      <h3>What name do you want to set?</h3>
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
          label='New Name'
          value={name}
          onChange={event => setName(event.target.value)}
          variant='filled'
        />
        <Button variant='contained' onClick={handleSetName}>Set</Button>
      </div>
    </>
  );
};