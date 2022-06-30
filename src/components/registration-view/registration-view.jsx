import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Row, Col, Button, Container, Form } from 'react-bootstrap';

//user registration form taking necessary user details
export function RegistrationView(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");

  // Declare hook for each input
  const [UsernameErr, setUsernameErr] = useState("");
  const [PasswordErr, setPasswordErr] = useState("");
  const [EmailErr, setEmailErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username is required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be 5 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is required (6 characters long)");
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr("Password must be 5 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Add Email");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmail("Email must be a valid email address");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  const isReq = validate();
  if (isReq) {
    axios.post('https://movieflexworld.herokuapp.com/users', { Username: Username, Password: Password, Email: Email, Birthday: Birthday })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert("Your registration has been successfully processed. You can now proceed to login.");
        window.open("/", "_self");
        //open in the current tab
      })
      .catch((response) => {
        console.error(response);
        alert("error registering the user");
      });
  }
};

return (
  <>
        <Row className="justify-content-center my-5">
       <Col md={3}>
       <Form>
     <Form.Group>
       <Form.Label>Username*</Form.Label>
       <Form.Control 
        type="text" 
        placeholder="Username" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required/>
        {values.UsernameErr && 
        <p>{values.UsernameErr}</p>}
    </Form.Group>
    <Form.Group>
      <Form.Label>Password*</Form.Label>
      <Form.Control 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength="5"
      />
       {values.PasswordErr && 
        <p>{values.PasswordErr}</p>}
    </Form.Group>
    <Form.Group>
      <Form.Label>Email*</Form.Label>
      <Form.Control 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
       {values.EmailErr && 
        <p>{values.Err}</p>}
    </Form.Group>
    <Form.Group>
      <Form.Label>Birthday</Form.Label>
      <Form.Control 
        type="date" 
        placeholder="dd-mm-yyyy" 
        onChange={(e) => setBirthday(e.target.value)}
        value={birthday}
      />
    </Form.Group>
    <br></br>
            <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
        </Form>
    </Col>
    </Row>
    </>
)
}
/*
RegistrationView.propTypes = {
    user: PropTypes.exact({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired
    }).isRequired,
  };*/