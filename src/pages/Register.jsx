import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

import BackButton from "../components/backButton";
import { useAuth } from "../hooks/auth";
const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const {register}= useAuth({
    middleware:'guest',
    redirectIfAuthenticated:'/dashboard'
  });
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

    register({
      ...inputs,
      password_confirmation: passwordConfirmation,
      setErrors,
  })
  };
  return (
    <form onSubmit={onSubmit} className="container">
      <BackButton />
      <input
        type="text"
        name="name"
        value={inputs.name}
        onChange={onChange}
        placeholder=" Name"
        className="loginInput"
      />
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
      <input
        type="password"
        name="confirmPassword"
        value={passwordConfirmation}
        onChange={(e) => {
          setPasswordConfirmation(e.target.value);
        }}
        placeholder=" Confirm Password"
        className="loginInput"
        minLength={8}
      />
      
      <button type="submit" className="loginButton">
      Register
      </button>
    </form>
  );
};

export default Register;
