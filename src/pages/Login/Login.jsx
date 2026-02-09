import React, { useState, useRef } from 'react'
import { Button, Container, Form , InputGroup} from 'react-bootstrap'
import { errorHandler } from '../../utils/errorHandler';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API } from '../../Apis/API_Servece';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slicies/userSlices';
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { HiQrCode } from 'react-icons/hi2';

export default function Login() {
  //validate data before sending 
  const [validated, setValidated] = useState(false); 
  const [ispassword, setIsPassword] = useState(true);
  //refs
  const usernameRef=useRef();
  const passwordRef=useRef();
  // navigate
  const navigate =useNavigate();
  // dispatch
  const dispatch =useDispatch();
  //handler
  async function handleLogin(e) {
    e.preventDefault()
    const form = e.target;
    try {
      //enable valdate
      setValidated(true);
      //check if form is valid
      if (form.checkValidity() === false) {
        return;
      }
      // get data
      const data={
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }
      //hit api
      const response = await API.post("/auth/login", data);
      const userData = response.data;
      //store in local storage and redux
      localStorage.setItem("userData", JSON.stringify(userData));
      //redux 
      dispatch(login(userData));

      //redirect to home
      navigate("/");
      //message
      toast.success("Login Successfull");
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
  <div
    className="w-100 p-4 bg-white rounded-4 d-flex flex-column justify-content-center" 
    style={{
      maxWidth: "550px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      height: "60vh",
    }}
  >
    <h1 className="text-center mb-4 fw-bold">Login</h1>

    <Form onSubmit={handleLogin} noValidate validated={validated}>
      {/* username */}
      <Form.Group className="mb-3">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter user name"
          required
          minLength={2}
          ref={usernameRef}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid user name.
        </Form.Control.Feedback>
      </Form.Group>

      {/* password */}
      <Form.Group className="mb-4">
        <InputGroup hasValidation>
          <Form.Control
            type={ispassword ? "password" : "text"}
            placeholder="Password"
            ref={passwordRef}
            required
            minLength={6}
          />
          <InputGroup.Text
            onClick={() => setIsPassword(prev => !prev)}
            style={{ cursor: "pointer" }}
            className="text-primary"
          >
            {ispassword ? <FaEye className='text-dark'/> : <IoMdEyeOff  className='text-dark'/>}
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">
            Please enter a valid password
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* button */}
      <Button
        type="submit"
        variant="dark"
        className="w-100 py-2"
      >
        Login
      </Button>
    </Form>
  </div>
</Container>

  )
}
