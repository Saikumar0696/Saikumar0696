import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { customerlogin } from "../Actions/CustomerActionCreator";

import "../Styles/CustomerLogin.css";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const costomerloginreducer = useSelector(
    (state) => state.customerloginreducer
  );
  const { iscustomerloggedin } = costomerloginreducer;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(customerlogin(email, password));
  };

  return (
    <div class="login">
      {iscustomerloggedin && <Redirect to="/" />}
      <form>
        <h2 class="ti"> Log In</h2>

        <div class="email-login">
          <label for="email">
            {" "}
            <b>Email</b>
          </label>
          <input
            type="text"
            className="common"
            placeholder="Enter Email"
            name="uname"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="common"
            name="psw"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit" class="cta-btn" onClick={submitHandler}>
            Log In
          </button>
          <button class="signup">
            <Link to="/customer/signup" className="a">
              Sign Up
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerLogin;
