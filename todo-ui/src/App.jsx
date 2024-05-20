import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListTodoComponent from "./components/ListTodoComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import TodoComponent from "./components/TodoComponent";
import { isUserLoggedIn } from "./services/AuthService";

function App() {
  const AuthenticatedRoute = ({ children }) => {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  };

  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route
          path="/todos"
          element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/add-todo"
          element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/update-todo/:id"
          element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }
        />

        <Route path="/register" element={<RegisterComponent />} />

        <Route path="/login" element={<LoginComponent />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
