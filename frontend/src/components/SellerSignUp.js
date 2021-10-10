import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import baseurl from "./Server";

import "../Styles/Signup.css";
import { Link } from "react-router-dom";
const SellerSignUp = () => {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [location, setlocation] = useState("");
  const [phone, setphone] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [pickup, setpickup] = useState("");
  const [delivery, setdelivery] = useState("");
  const [timing, settiming] = useState("");
  const [suc, setsuc] = useState(false);
  const [err, seterr] = useState(false);

  const submithandler = (event) => {
    event.preventDefault();
    const data = new FormData();

    data.append("restaurant_name", name);
    data.append("seller_email", email);
    data.append("seller_password", password);
    data.append("location", location);
    data.append("contact_info", phone);
    data.append("description", description);
    data.append("pickup", pickup);
    data.append("delivery", delivery);
    data.append("timings", timing);
    data.append("image", image);

    const registerrestaurant = async () => {
      try {
        let post = await axios.post(`${baseurl}/seller/addrestaurant`, data);
        dispatch({ type: "REGISTRATION_RESTAURANT_REQUEST" });
        console.log(post);
        if (post.data.success) {
          dispatch({
            type: "REGISTRATION_RESTAURANT_SUCCESS",
            payload: { message: "Created succesfully" },
          });
          setsuc(true);

          seterr(false);
        } else {
          dispatch({
            type: "REGISTRATION_RESTAURANT_FAIL",
            payload: { message: "" },
          });
          seterr(true);

          setsuc(false);
        }
      } catch (error) {
        seterr(true);
      }
    };
    registerrestaurant();
  };
  return (
    <div>
      {suc && (
        <p className="primary">
          Restaurant added Succesfully please
          <Link to="/seller/signin">Login</Link>
        </p>
      )}
      {err && <p>already exists</p>}
      <div className="container">
        <div className="content">
          <h1 className="form-title">Register Here</h1>
          <form onSubmit={submithandler}>
            <input
              type="text"
              placeholder="Restaurant Name"
              name="restaurant_name"
              required
              onChange={(event) => {
                setname(event.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Owner Email"
              name="seller_email"
              required
              onChange={(event) => {
                setemail(event.target.value);
              }}
            />{" "}
            <input
              type="password"
              placeholder="Password"
              name="seller_password"
              required
              onChange={(event) => {
                setpassword(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              required
              onChange={(event) => {
                setlocation(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              required
              onChange={(event) => {
                setdescription(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Phone"
              name="contact_info"
              required
              onChange={(event) => {
                setphone(event.target.value);
              }}
            />
            <div>
              <span>
                Restaurant Image{" "}
                <input
                  type="file"
                  name="image"
                  required
                  onChange={(event) => {
                    setimage(event.target.files[0]);
                  }}
                />
              </span>
            </div>
            <input
              type="text"
              placeholder="Timings"
              required
              onChange={(event) => {
                settiming(event.target.value);
              }}
            />
            <label htmlFor="delivery_option_pickup">Pickup</label>
            <input
              type="checkbox"
              name="delivery_option_pickup"
              id="delivery_option_pickup"
              onChange={(event) => {
                setpickup(event.target.value);
              }}
            />
            <label htmlFor="delivery_option_pickup">Delivery</label>
            <input
              type="checkbox"
              name="delivery_option_delivery"
              onChange={(event) => {
                setdelivery(event.target.value);
              }}
            />
            <br />
            <button type="Submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerSignUp;
