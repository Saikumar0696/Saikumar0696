import React, { useState } from "react";
import "../Styles/CustomerLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { customersignup } from "../Actions/CustomerActionCreator";


const CustomerSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const customersignupreducer = useSelector(
    (state) => state.customersignupreducer
  );
  const { success } = customersignupreducer;
  console.log(success);
  const reghandler = (e) => {
    e.preventDefault();
    dispatch(customersignup(name, email, password));
  };

  return (
   
      <div>
        <div class="login">
          <form>
            <h2 class="ti"> Sign Up</h2>

            <div class="email-login">
              <input
                type="text"
                placeholder="Name"
                name="customer_name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Email"
                name="customer_email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="Password"
                name="customer_password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <button class="signup" onClick={reghandler}>
                SignUp
              </button>
            </div>
            {success && <p> Registration Succesful</p>}
          </form>
        </div>
      </div>
    
  );
};

export default CustomerSignUp;
