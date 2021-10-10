import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router";

import { sellerlogin } from "../Actions/SellerActionCreator";
import { Link } from "react-router-dom";

import "../Styles/Login.css";

const SellerSignin = () => {
  const [email, setemail] = useState("");
  const loginReducer = useSelector((state) => state.sellerloginreducer);
  const { issellerloggedin, error } = loginReducer;

  const dispatch = useDispatch();
  const [password, setpassword] = useState("");

  const submithandler = (event) => {
    event.preventDefault();

    dispatch(sellerlogin(email, password));
  };
  return (
    <div class="box">
      {issellerloggedin && <Redirect to="/seller/home" />}
      <h2>Login</h2>
      <form onSubmit={submithandler}>
        <div class="inputBox">
          <input
            type="text"
            required
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <label for="">Username</label>
        </div>
        <div class="inputBox">
          <input
            type="password"
            required
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <label for="">Password</label>
        </div>
        <input type="submit" name="" id="" value="Log In" />

        <Link class="btn btn-primary mx-4" to="/seller/signup" role="button">
          SignUp
        </Link>
        {error && <p> Incorrect credentials</p>}
      </form>
    </div>
  );
};

export default SellerSignin;
