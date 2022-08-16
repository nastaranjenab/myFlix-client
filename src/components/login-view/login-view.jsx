import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from 'react-redux';
import { setUser } from "../../actions/actions";
//add react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CardGroup from "react-bootstrap/CardGroup";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

//login for user - taking username and password
export function LoginView(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://movieflexworld.herokuapp.com/login", {
        Username: Username,
        Password: Password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log(e);
        alert(
          "you're not already registered or you have deleted your profile! Please register"
        );
        window.open("/register", "_self");
      });
  };


  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ textAlign: "center", fontSize: "" }} />
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col md={6}>
            <h1>Sign in to your account</h1>
            <Form className="register-form">
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="label titles h3 align-self-center">
                  {" "}
                  Username:{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className="label titles h3 align-self-center">
                  {" "}
                  Password:{" "}
                </Form.Label>
                <Form.Control
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="custom-btn"
                type="submit"
                // style={{ marginTop: 20, marginRight: 5 }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
              <br></br>
              <br></br>
              <Row className="d-flex justify-content-center">
                <p className="m-2">Don't have an account?</p>

                <Link
                  className="movie-director titles-expand ml-3 h4"
                  to={`/register`}
                >
                  Sign up
                </Link>
              </Row>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

LoginView.propTypes = {
  // onRegister: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { setUser })(LoginView);