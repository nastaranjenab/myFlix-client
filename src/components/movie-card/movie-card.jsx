import React from "react";
import PropTypes from "prop-types";

//add react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="m-1 fade-in-down">
        <Card.Img
          style={{ height: "100%" }}
          variant="top"
          src={movie.ImagePath}
          className="img-responsive"
        />

        <Card.Body>
          <Card.Title className="titles custom-card-title text-center">
            {movie.Title}
          </Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Container className="text-center">
            <Link to={`/movies/${movie._id}`}>
              <Button className="custom-btn" variant="link">
                Open
              </Button>
            </Link>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
};