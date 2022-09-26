import React, { useState } from 'react';
import { Alert, AppBar, Box, Button, Input, Snackbar, Toolbar, Typography } from '@mui/material';
import { useAlert } from '../../contexts/alert';
import { Link } from 'react-router-dom';

export const Layout = React.memo(({ children }) => {
  const { alert, closeAlert } = useAlert();

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={5000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.msg}
        </Alert>
      </Snackbar>
      <AppBar component='nav'>
        <Toolbar>
          <Typography
            variant='h4'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Micro-blog
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link className="link-button" to="/post">
              POST
            </Link>
            <Link className="link-button" to="/timeline">
              TIMELINE
            </Link>
            <Link className="link-button" to="/follow">
              FOLLOW
            </Link>
            <Link className="link-button" to="/profile">
              PROFILE
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <div className='content'>
        {children}
      </div>
    </div>
  )
});