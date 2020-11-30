import React, { useState } from "react";
import {
  Link,
  Redirect
} from "react-router-dom";
import "./Login.css";
import {auth, signInWithGoogle} from './firebase';
import firebase from 'firebase/app';

import MemeSHARELogo from './LightVertical.png'

import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const signInWithEmailAndPasswordHandler = (event,email, password) => {
    event.preventDefault();

    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {

        return auth.signInWithEmailAndPassword(email, password);
        // .catch(error => {
          // setError("Error signing in with password and email!");
          // console.error("Error signing in with password and email", error);
        // });
      })
      .catch(error => {
        setError("Error with Persistence");
        console.log("Error with Persistence", error);
      })







    setRedirect(true);
  };

  const onChangeHandler = (event) => {
    const {name, value} = event.currentTarget;

    if(name === 'userEmail') {
      setEmail(value);
    }
    else if(name === 'userPassword'){
      setPassword(value);
    }
  };

  const googleSignIn = () => {
    signInWithGoogle();
    setRedirect(true);
  }


  return(
    redirect ? <Redirect to='/home' /> :
    <div>
        <img className="center-object" src={MemeSHARELogo} />
          <div className="login center-object">
            {error !== null && <div>{error}</div>}

            <form>
              <FormGroup controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl autoFocus type="email" value = {email} placeholder="username@email.com" name="userEmail" onChange = {(event) => onChangeHandler(event)} />
              </FormGroup>

              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl value={password} type="password" placeholder="Your Password" name="userPassword" onChange = {(event) => onChangeHandler(event)} />
              </FormGroup>

              <Button className="center-object" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                Sign in
              </Button>
            </form>


            <p className="text-center my-3">or</p>
            <Button className="center-object" onClick={googleSignIn}>
              Sign in with Google
            </Button>

            <p className="text-center my-3">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-600">
                Sign up here
              </Link>{" "}
              <br />{" "}
              <Link to = "/passwordReset" className="text-blue-500 hover:text-blue-600">
                Forgot Password?
              </Link>
            </p>
          </div>
    </div>
  )
}


export default Login;
