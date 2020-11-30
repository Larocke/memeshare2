import React, {useState} from "react";
import {
  Link,
  Redirect
} from "react-router-dom";
import {auth, generateUserDocument} from './firebase';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import MemeSHARELogo from './LightVertical.png'
import "./Login.css";


function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();

    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {
        displayName: displayName,
        description: "",
        memesOwned: []
      });
    }
    catch(error){
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");

    setRedirect(true);
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    redirect ? <Redirect to='/' /> :
    <div>
      <img className="center-object" src={MemeSHARELogo} alt="MemeSHARE logo" />
      <div className="login center-object">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}


        <form>
          <FormGroup>
            <FormLabel>Display Name</FormLabel>
            <FormControl
              type="text"
              name="displayName"
              value={displayName}
              placeholder="E.g: LaRocke"
              id="displayName"
              onChange={event => onChangeHandler(event)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              name="userEmail"
              value={email}
              placeholder="Username@email.com"
              id="userEmail"
              onChange={event => onChangeHandler(event)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={event => onChangeHandler(event)}
            />
          </FormGroup>

          <Button
            className="center-object"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </Button>
        </form>

        <p className="text-center my-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Sign in here
          </Link>
        </p>
        </div>
    </div>
  );
}

export default Signup;
