import React from "react";
import PropTypes from "prop-types";

//add react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { Director, onBackClick } = this.props;
    //console.log(this.props);
    return (
      <Card>
        <Card.Body className="director-view">
          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="align-self-center label titles h3">
              Name:
            </Card.Text>
            <span className="align-self-center label titles h3">
              {Director.Name}
            </span>
          </Col>
          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="align-self-center label titles h3">
              Bio:
            </Card.Text>
            <span className="movie-director-bio card-text ml-3 ">
              {Director.Bio}
            </span>
          </Col>
          <Col className="d-sm-flex justify-content-between justify-content-xl-start">
            <Card.Text className="align-self-center label titles h3">
              Born:
            </Card.Text>
            <span className="movie-director-birth titles ml-3 h1">
              {Director.Birth}
            </span>
          </Col>
          <br></br>
          <br></br>

          <Button
            className="custom-btn"
            type="submit"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Go Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};