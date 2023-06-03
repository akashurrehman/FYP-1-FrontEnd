import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './style/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
    <Spinner animation="grow" variant="info">
      <span className="sr-only">Loading...</span>
    </Spinner>
    <p className="loading-message">Just wait a second! Screen is customizing according to your needs</p>
  </div>
  );
};

export default LoadingSpinner;
