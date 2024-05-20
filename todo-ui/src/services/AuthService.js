import React from "react";
import axios from "axios";

const AUTH_REST_API_URL = "http://localhost:8080/api/auth";

const registerAPICall = (registerObj) => {
  return axios.post(AUTH_REST_API_URL + "/register", {
    name: registerObj.name,
    username: registerObj.username,
    email: registerObj.email,
    password: registerObj.password,
  });
};

const loginAPICall = (loginObj) => {
  return axios.post(AUTH_REST_API_URL + "/login", {
    usernameOrEmail: loginObj.usernameOrEmail,
    password: loginObj.password,
  });
};

const storeToken = (token) => localStorage.setItem("token", token);

const getToken = () => localStorage.getItem("token");

const saveLoggedInUser = (username, role) => {
  sessionStorage.setItem("authenticatedUser", username);
  sessionStorage.setItem("role", role);
};

const isUserLoggedIn = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  if (username == null) {
    return false;
  } else {
    return true;
  }
};

const getLoggedInUser = () => {
  const username = sessionStorage.getItem("authenticatedUser");
  return username;
};

const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

const isAdminUser = () => {
  let role = sessionStorage.getItem("role");

  if (role != null && role === "ROLE_ADMIN") {
    return true;
  } else {
    return false;
  }
};

export {
  registerAPICall,
  loginAPICall,
  storeToken,
  getToken,
  saveLoggedInUser,
  isUserLoggedIn,
  getLoggedInUser,
  logout,
  isAdminUser,
};
