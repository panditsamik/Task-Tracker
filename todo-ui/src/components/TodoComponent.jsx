import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTodo, getTodo, updateTodo } from "../services/TodoService";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigator = useNavigate();

  const { id } = useParams();

  const saveOrUpdateTodo = (e) => {
    e.preventDefault();

    const todo = { title, description, completed };

    // If id exists, Update the TODO
    if (id) {
      updateTodo(id, todo)
        .then((response) => {
          console.log(response.data);
          navigator("/todos");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Save the todo
      addTodo(todo)
        .then((response) => {
          console.log(response.data);
          navigator("/todos");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Todo</h2>;
    } else {
      return <h2 className="text-center">Add Todo</h2>;
    }
  };

  useEffect(() => {
    // If id exists, then get the todo for that particular id
    if (id) {
      getTodo(id)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Todo Title:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Todo Title:"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Todo Description:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Todo Description:"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Todo Completed:</label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <button
                className="btn btn-primary btn-success"
                onClick={(e) => {
                  saveOrUpdateTodo(e);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
