import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export function ProfileView({ movies }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [show, setShow] = useState(false); // setting the state for the deleteUser modal

  const getUser = () => {
    //console.log("user11");
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .get(`https://movieflexworld.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setFavoriteMovies(response.data.FavoriteMovies);
        setFavouriteMovies(response.data.FavouriteMovies);
        // setFavouriteMovies(response.data.FavouriteMovies);
        setBirthday(response.data.Birthday.substring(0, 10));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    // console.log("I");
    getUser();
  }, []);

  function User() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    useEffect(() => {
      console.log(favoriteMovies);
    });
    return (
      <div>
        <p>You clicked {favoriteMovies} times</p>
      </div>
    );
  }

  //   function User() {
  //     const [favoriteMovies, setFavoriteMovies] = useState([]);
  //     useEffect(() => {
  //       console.log(favoriteMovies);
  //     });
  //     return (
  //       <div>
  //         <p>You clicked {favoriteMovies} times</p>
  //       </div>
  //     );
  //   }

  // Update users info
  const updateUser = () => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .put(
        `https://movieflexworld.herokuapp.com/users/${user}`,
        {
          Username: username,
          Email: email, //Email is a variable which holds the email
          Birthday: birthday,
          Password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        alert("Your profile has been updated");
        localStorage.setItem("user", response.data.Username);
        console.log(response.data);
        window.open("/users/${response.data.Username}", "_self");
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  // Delete user
  const deleteUser = () => {
    setShow(false);
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete(`https://movieflexworld.herokuapp.com/users/${user}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Your profile has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  const renderFavorits = () => {
    console.log(movies);
    if (movies.length + 0) {
      return (
        <Row className="justify-content-md-center">
          {favoriteMovies.length === 0 ? (
            <h5></h5>
          ) : (
            favoriteMovies.map((movieId, i) => (
              <Col md={6} lg={4}>
                <MovieCard
                  key={`${i}-${movieId}`}
                  movie={movies.find((m) => m._id == movieId)}
                />
              </Col>
            ))
          )}
        </Row>
      );
    }
  };

  // Functions needed to open and close the modal (below) to delete a user
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function that contains the modal to delete a users account
  const cancelUserModal = () => {
    return (
      <>
        <Modal
          style={{ background: "transparent" }}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete your Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={deleteUser}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <h1 className="titles h1 text-center"> Hi there!</h1>
          <Card.Title className="titles text-center custom-card-title">
            View and update your details
          </Card.Title>
          <Container className="d-flex justify-content-right ">
            <Col className="d-inline">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="titles h3">Username:</Form.Label>
                  <Container className="p-1">
                    <Form.Control
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      type="text"
                      placeholder="username"
                    />
                  </Container>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="titles h3">Email</Form.Label>
                  <Form.Control
                    className="custom-form-label"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter new email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="titles h3">Birth date</Form.Label>
                  <Container className="d-flex flex-column flex-sm-row justify-content-between p-1"></Container>
                  <Form.Control
                    className="custom-form-label"
                    onChange={(e) => setBirthday(e.target.value)}
                    value={birthday}
                    type="date"
                    placeholder="birthday"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="titles h3">Password</Form.Label>
                  <Container className="d-flex flex-column flex-sm-row justify-content-between p-1">
                    <Form.Control
                      className="custom-form-label"
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      value={password}
                      placeholder="Password"
                    />
                  </Container>
                </Form.Group>

                <Button variant="primary custom-btn" onClick={updateUser}>
                  Update your profile
                </Button>

                {/* This button triggers a modal that's called bellow   */}
                <Button
                  className="custom-btn-delete m-1"
                  variant="primary"
                  onClick={handleShow}
                >
                  Delete your profile
                </Button>
              </Form>
            </Col>
          </Container>
        </Card.Body>
      </Card>
      <br></br>
      <br></br>
      <Card>
        <Card.Body>
          {/* Calling the function that renders the modal to delete the users account */}
          {cancelUserModal()}
          <div className="titles h1 text-center">
            <h1>There's no movies in your list of favorites!</h1>
            <p className="h5">
              Head over to the{" "}
              <Link to={`/`}>
                <Button className="custom-btn" type="submit">
                  List of movies
                </Button>
              </Link>{" "}
              to add some
            </p>
          </div>
          /
          {/* Calling the function that renders the users favourite movies on the profile page */}
          {renderFavorits()}
        </Card.Body>
      </Card>
    </Container>
  );
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequire,
  user: PropTypes.string.isRequired,
  onUserUpdated: PropTypes.func.isRequired,
};