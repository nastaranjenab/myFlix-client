import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './registration-view.scss';
import axios from 'axios';

//add react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";
import Form from "react-bootstrap/Form";

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
    // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!Username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (Username.length < 5) {
      setUsernameErr("Username must be 5 characters long");
      isReq = false;
    } else {
      setUsernameErr("");
    }
    if (!Password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (Password.length < 6) {
      setPasswordErr("Password must be 6 characters long");
      isReq = false;
    } else {
      setPasswordErr("");
    }
    if (!Email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (Email.indexOf("@") === -1) {
      setEmailErr("Email must be a valid email address");
      isReq = false;
    } else {
      setEmailErr("");
    }

    return isReq;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication
       then call props on registerd user (username) */
    const isReq = validate();
    if (isReq) {
        axios.post('https://movieflexworld.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }).then(response => {
            const data = response.data;
            console.log(data);
            alert("Successfully registreation. You can now precced to login.");
            window.open('/', '_self');
            // The Second argument '_self' is necessary so that the page will open inthe current tab.
        }).catch((response) => {
            console.error(response);
            alert('ERROR user registering');
        });
    }
};

  return (
    <Row>
      <Col med={4}>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title className="titles custom-card-title text-center">
                {" "}
                Sign Up here
              </Card.Title>
              <Form className="register-form">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label className="titles h3"> Username: </Form.Label>
                  <Form.Control
                    type="text"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Your Username should be at least 4 characters long"
                  />
                  {UsernameErr && <p>{UsernameErr}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="titles h3"> Password: </Form.Label>
                  <Form.Control
                    type="password"
                    value={Password}
                    placeholder="Your password should be at least 8 characters"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {PasswordErr && <p>{PasswordErr}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="titles h2"> Email: </Form.Label>
                  <Form.Control
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {EmailErr && <p>{EmailErr}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicBirthdate">
                  <Form.Label className="titles h3">
                    {" "}
                    Birthday date:{" "}
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="yyyy/mm/dd"
                    value={Birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="custom-btn"
                  type="submit"
                  onClick={handleRegister}
                >
                  Sign me up!
                </Button>
                <br></br>
                <br></br>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
}

// RegistrationView.propTypes = {
//   onRegister: PropTypes.func.isRequired,
// };