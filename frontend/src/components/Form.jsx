import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import LoadingIndicator from "./LoadingIndicator";
import api from "../../api";

/**
 * Form component for login and register pages
 * @param {Object} props
 * @param {string} props.route - API route for login or register
 * @param {string} props.loginOrRegister - "login" or "register"
 * @returns {JSX.Element}
 * @example
 * <Form route="/login" loginOrRegister="login" />
 * <Form route="/register" loginOrRegister="register" />
 */
export default function AuthForm({ route, loginOrRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = loginOrRegister === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });

      if (loginOrRegister === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-container">
      <h1 className="mb-4">{name}</h1>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>
      {loading && <LoadingIndicator />}
      <Button className="form-button" variant="primary" type="submit">
        {name}
      </Button>
    </Form>
  );
}
