import React, {useState, useEffect} from "react";
import {
  Link
} from "react-router-dom";
import {auth} from 'firebase';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import MemeSHARELogo from './LightVertical.png'
import "./Login.css";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    event.preventDefault();

    auth.sendPasswordResetEmail(email)
    .then(() => {
      setEmailHasBeenSent(true);
      setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
    })
    .catch(() => {
      setError('Error resetting password');
    })
  };

  return(
    <div>
      <img className="center-object" src={MemeSHARELogo} />
      <div className="login center-object">

      <h4 className="text-center">Reset your Password</h4>

        <form>
          {emailHasBeenSent && (
            <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )}
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              name="userEmail"
              id="userEmail"
              value={email}
              placeholder="Input your email"
              onChange={onChangeHandler}
            />
          </FormGroup>

          <Button className="center-object button-bottom">Send me a reset link</Button>
        </form>

        <Link
         to ="/"
          className="go-back"
        >
          &larr; back to sign in page
        </Link>
      </div>
    </div>
  );
}

export default PasswordReset;
