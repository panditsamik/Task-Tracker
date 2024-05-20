import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../services/AuthService";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from "../services/TodoService";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);

  const navigator = useNavigate();

  const isAdmin = isAdminUser();

  useEffect(() => {
    getAllTodos().then((response) => {
      setTodos(response.data);
    });
  }, [todos]);

  // POST new TODO
  const addNewTodo = () => {
    navigator("/add-todo");
  };

  // UPDATE TODO
  const updateTodo = (id) => {
    navigator(`/update-todo/${id}`);
  };

  // Delete TODO
  const removeTodo = (id) => {
    deleteTodo(id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Mark Complete TODO
  const markCompleteTodo = (id) => {
    completeTodo(id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Mark InComplete TODO
  const markIncompleteTodo = (id) => {
    inCompleteTodo(id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <br />
      <h2 className="text-center">List of Todos</h2>
      {isAdmin && (
        <button
          className="btn btn-primary mb-2"
          onClick={() => {
            addNewTodo();
          }}
        >
          Add Todo
        </button>
      )}

      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "✅" : "❌"}</td>
                <td>
                  <>
                    {isAdmin && (
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          updateTodo(todo.id);
                        }}
                      >
                        Update
                      </button>
                    )}

                    {isAdmin && (
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          removeTodo(todo.id);
                        }}
                        style={{ marginLeft: "10px" }}
                      >
                        Delete
                      </button>
                    )}

                    <button
                      className="btn btn-success"
                      onClick={() => {
                        markCompleteTodo(todo.id);
                      }}
                      style={{ marginLeft: "10px" }}
                    >
                      Complete
                    </button>

                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        markIncompleteTodo(todo.id);
                      }}
                      style={{ marginLeft: "10px" }}
                    >
                      In Complete
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodoComponent;
