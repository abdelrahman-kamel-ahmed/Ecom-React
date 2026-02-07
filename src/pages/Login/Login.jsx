import React, { useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { errorHandler } from '../../utils/errorHandler';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { API } from '../../Apis/API_Servece';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slicies/userSlices';

export default function Login() {
  //validate data before sending 
  const [validated, setValidated] = useState(false); 
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
    <div>
      <Form onSubmit={handleLogin} noValidate validated={validated}>
        {/* email */}
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter user name"  required minLength={2} ref={usernameRef} />
          <Form.Text className="text-muted">
            We'll never share your data with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid user name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* password */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" required minLength={6} ref ={passwordRef}/>
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        <Form.Control.Feedback type="invalid">
            Please enter correct password
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="btn btn-primary fw-bold w-100" style={{maxWidth:"200px"}}>
          Login
        </Button>
      </Form>
    </div>

  )
}
