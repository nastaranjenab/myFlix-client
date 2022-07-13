import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUser } from "../../actions/actions";
import MoviesList from '../movies-list/movies-list';

//add react-bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardGroup from "react-bootstrap/CardGroup";
import Form from "react-bootstrap/Form";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";


import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Menubar } from '../navbar-view/navbar-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../director-view/director-view';
import { Redirect } from "react-router-dom";
import "../../index.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      // selectedMovie: null,
      // registered: null,
      user: null,
    };
  }
  
 componentDidMount(){
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
  }


getMovies(token) {
  axios.get('https://movieflexworld.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
          // this.props.setMovies(response.data);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}

onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}


render() {
  const { movies } = this.state;
  let { user } = this.state;

  return (
    <Router>
      <Menubar user={user} />
      <Row className="main-view justify-content-md-center">

        <Route
                    exact
                    path="/"
                    render={() => {
                      if (!user)
                        return (
                          <Col>
                            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                          </Col>
                        );
                      if (movies.length === 0) return <div className="main-view" />;
                      return <MoviesList movies={movies} />;

                    }} />
          <Route
            path="/login"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col md={8}>
                  <LoginView />
                </Col>
              );
            }}
          />
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
          </Col>
        }} />
        <Route path="/movies/:id" render={({ match,
        history }) => {
          if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>
        if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <MovieView movie={movies.find(m =>
            m._id === match.params.id)} onBackClick={() =>
              history.goBack()} />
          </Col>
        }} />
          <Route path="/directors/:Name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
          <Route
            path="/users/:Username"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              if (!user) return <Redirect to="/" />;
              return (
                <Col md={8}>
                  <ProfileView
                    // history={history}
                    movies={movies}
                    user={user}
                    onUserUpdated={(user) => this.handleUserUpdate(user)}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:Name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.Name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (store) => {
  return {
    movies: store.movies,
    user: store.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
    setMovies: (movies) => {
      dispatch(setMovies(movies));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
