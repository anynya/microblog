import React, { useContext, useState } from 'react';
import { microblog_backend } from '../../../declarations/microblog_backend';

const AlertContext = React.createContext({
  alert: {msg: '', severity: 'success' | 'info' | 'warning' | 'error', open: false},
  setAlert: Object,
  okAlert: (msg) => {},
  errAlert: (msg) => {},
  closeAlert: () => {}
});

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({msg: '', severity: 'info', open: false});
  const errAlert = (msg) => {
    setAlert({severity: 'error', open: true, msg});
  };

  const okAlert = (msg) => {
    setAlert({severity: 'success', open: true, msg});
  };

  const closeAlert = () => {
    setAlert({severity: "info", open: false, msg: ""});
  };


  return (
    <AlertContext.Provider value={{ alert, setAlert, okAlert, errAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export function useAlert() {
  return  useContext(AlertContext);
}