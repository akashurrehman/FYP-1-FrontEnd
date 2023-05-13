import React from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

export default function Jobst(props) {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8081/api/admin/deleteJobPost/${props.id}`)
      .then((response) => {
        console.log(response);
        alert('Job post deleted successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to delete Job post. Please try again!');
      });
  };

  return (
    <div className="container">
      <div className="headin">
        <h4>Job Title: {props.title}</h4>
        <p>
          <strong>Job Details:</strong> {props.details}
        </p>
        <p>
          <strong>Posted Date:</strong> {props.date}
          <button className="btn btn-danger bton" onClick={handleDelete}>
            Delete Post
          </button>
        </p>
      </div>
    </div>
  );
}
