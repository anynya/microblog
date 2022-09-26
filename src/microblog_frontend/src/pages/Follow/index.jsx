import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import { Principal } from "@dfinity/principal";
import { microblog_backend } from '../../../../declarations/microblog_backend';
import { useAlert } from '../../contexts/alert';
import { Message } from '../../components/Message';

export const Follow = () => {
  const [otp, setOtp] = useState('');
  const [open, setOpen] = useState(false);
  const [principalID, setPrincipalID] = useState('');
  const [follows, setFollows] = useState([]);
  const [posts, setPosts] = useState([]);
  const { okAlert, errAlert } = useAlert();

  useEffect(() => {
      loadFollows();
    }, []
  )

  const loadFollows = async () => {
    setFollows(await microblog_backend.follows());
  };

  const handleClick = async (principal) => {
    setPosts(await microblog_backend.get_posts_by_principal(principal));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPosts([]);
  }

  const follow = async () => {
    try {
      await microblog_backend.follow(otp, Principal.fromText(principalID))
      okAlert('Follow Success!')
    } catch (err) {
      console.log(err);
      errAlert('Follow Failed!')
    } finally {
      setPrincipalID('');
      await loadFollows();
    }
  };

  return (
    <>
      <h3>Who do you want to follow?</h3>
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
          label='Principal ID'
          value={principalID}
          onChange={event => setPrincipalID(event.target.value)}
          variant='filled'
        />
        <Button variant='contained' onClick={follow}>Follow</Button>
      </div>

      <h3>My Follows:</h3>
      {
        follows.map((account, index) => (<div style={{margin: '10px 0'}}><Button key={index} onClick={() => handleClick(account.principal)} variant="outlined"><p style={{color: 'black'}}>{account.name}</p> [{account.principal.toString()}]</Button></div>))
      }

      <Dialog
        fullWidth={true}
        maxWidth='xl'
        scroll='paper'
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>Posts</DialogTitle>
        {
          posts.map((msg, index) => <Message key={index} {...msg} />)
        }
      </Dialog>
    </>
  );
};