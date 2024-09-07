import React, { useContext, useState } from "react";
import "../styles/Register.css";
import {ApiContext} from '../contexts/ApiContext'
import BackButton from "../components/backButton";
import { useAuth } from "../hooks/auth";
import { imageUploadApi } from "../utils/fetchAPI";
const Register = () => {
  
  const { apiUrl } = useContext(ApiContext);
  
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState("")
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    profilePicture: "",
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

    imageUploadApi(`${apiUrl}/api/imageUpload`,'users',image)
    .then(response=>response.data)
    .then(
      data=>{
        register({
          ...inputs,
          profilePicture:data,
          password_confirmation: passwordConfirmation,
          setErrors,
      })
      }
    )
    
  };
  const imageChange = (e) => {
    setImage(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]))
  }
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
      <input
        type="date"
        name="birthday"
        onChange={onChange}
        className="loginInput"
      />
      {preview && <img className="loginInput" style={{width:"100px"}} src={preview} alt="profile"/>}
      <input 
        type="file" 
        name="profilePicture"
        className="loginInput"
        onChange={imageChange}  
      />
      
      {errors.email?.length > 0 && errors.email.map((item,index)=>{
        return <p className="error" key={index}>
          {item}
        </p>
      })}
      {passwordConfirmation !== inputs.password ? <p className="error">비밀번호가 일치하지 않습니다.</p> : null}
      <button type="submit" className="loginButton">
      Register
      </button>
    </form>
  );
};

export default Register;
