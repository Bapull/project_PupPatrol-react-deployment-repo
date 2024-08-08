import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../utils/fetchAPI";
import BackButton from "../components/backButton";
import { useAuth } from "../hooks/auth";
const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard'
  })
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null)

  const onChange = (e) => {
    let { name, value } = e.target;
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    
    login({
      ...inputs,
      remember: shouldRemember,
      setErrors,
      setStatus,
    })
  };
  return (
    <form onSubmit={onSubmit} className="container">
      <BackButton />
      <input
        type="email"
        name="email"
        value={inputs.email}
        onChange={onChange}
        placeholder=" Email"
        className="loginInput"
      />
      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={onChange}
        placeholder=" Password"
        className="loginInput"
        minLength={8}
      />
      <button type="submit" className="loginButton">
        Login
      </button>
      <div className="block mt-4">
        <label
            htmlFor="remember_me">
            <input
                id="remember_me"
                type="checkbox"
                name="remember"
                onChange={event =>
                    setShouldRemember(event.target.checked)
                }
            />
                Remember me
        </label>
      </div>

      <a href="/register">Sign in</a>
    </form>
  );
};

export default Login;
