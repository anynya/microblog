import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes } from './routes';
import './styles.css';

const App = () => <Routes />;

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);