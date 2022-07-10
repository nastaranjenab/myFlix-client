// export const GET_MOVIES = "GET_MOVIES";
// export const GET_MOVIE_INFO = "GET_MOVIE_INFO";
// export const SET_FILTER = "SET_FILTER";
// export const LOGIN_USER = "LOGIN_USER";
// export const REGISTER_USER = "REGISTER_USER";
// export const UPDATE_USER = "UPDATE_USER";
// export const GET_USER_INFO = "GET_USER_INFO";
// export const DELETE_USER = "DELETE_USER";
// export const LOGOUT_USER = "LOGOUT_USER";
// export const ADD_FAVORITEMOVIES = "ADD_FAVORITEMOVIES";
// export const DELETE_FAVORITEMOVIES = "DELETE_FAVORITEMOVIES";

// export function getMovies(value) {
//   return { type: GET_MOVIES, value };
// }

// export function getMovieInfo(value) {
//   return { type: GET_MOVIE_INFO, value };
// }

// export function setFilter(value) {
//   return { type: SET_FILTER, value };
// }

// export function loginUser(value) {
//   return { type: LOGIN_USER, value };
// }

// export function registerUser(value) {
//   return { type: REGISTER_USER, value };
// }

// export function updateUser(value) {
//   return { type: UPDATE_USER, value };
// }

// export function getUserInfo(value) {
//   return { type: GET_USER_INFO, value };
// }

// export function deleteUser(value) {
//   return { type: DELETE_USER, value };
// }

// export function logoutUser(value) {
//   return { type: LOGOUT_USER, value };
// }

// export function addFavoritemovies(value) {
//   return { type: ADD_FAVORITEMOVIES, value };
// }

// export function deleteFavoritemovies(value) {
//   return { type: DELETE_FAVORITEMOVIES, value };
// }

export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user: user?.Username,
  };
}