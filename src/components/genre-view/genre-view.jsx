import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body className="genre-view">
          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="label titles h3 align-self-center">
              Title:{" "}
            </Card.Text>
            <span className="movie-director-bio titles ml-3 h1">
              {genre.Name}{" "}
            </span>
          </Col>
          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="label titles h3 align-self-center">
              Description:{" "}
            </Card.Text>

            <span className="movie-director-bio card-text  ml-3 ">
              {genre.Description}
            </span>
          </Col>
          <br></br>
          <br></br>
          <Button
            className="custom-btn"
            type="submit"
            onClick={() => {
              onBackClick();
            }}
          >
            Go Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};