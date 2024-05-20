import React from "react";
import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = "http://localhost:8080/api/todos";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const getAllTodos = () => {
  return axios.get(BASE_REST_API_URL);
};

const addTodo = (todo) => {
  return axios.post(BASE_REST_API_URL, {
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  });
};

const getTodo = (todoId) => {
  return axios.get(BASE_REST_API_URL + "/" + todoId);
};

const updateTodo = (todoId, todo) => {
  return axios.put(BASE_REST_API_URL + "/" + todoId, {
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  });
};

const deleteTodo = (todoId) => {
  return axios.delete(BASE_REST_API_URL + "/" + todoId);
};

const completeTodo = (todoId) => {
  return axios.patch(BASE_REST_API_URL + "/" + todoId + "/complete");
};

const inCompleteTodo = (todoId) => {
  return axios.patch(BASE_REST_API_URL + "/" + todoId + "/in-complete");
};

export {
  getAllTodos,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
  inCompleteTodo,
};
