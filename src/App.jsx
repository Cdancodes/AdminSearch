import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes, { renderRoutes } from './routes';

const App = () => {
  return (
    <BrowserRouter basename={"/"}>
      {renderRoutes(routes)}
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
