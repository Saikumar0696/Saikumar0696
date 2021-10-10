import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../Styles/EditDish.css";
import baseurl from "./Server";

const EditDish = ({ match }) => {
  const [dish_name, setname] = useState("");
  const [dish_description, setdescription] = useState("");
  const [dish_price, setprice] = useState("");
  const loginReducer = useSelector((state) => state.sellerloginreducer);
  const { token } = loginReducer;
  const dispatch = useDispatch();
  const submithandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "EDIT_DISH_REQUEST" });

    let res = await axios.put(
      `${baseurl}/seller/editdish`,
      { dish_name, dish_description, dish_price, dish_id: match.params.dishid },
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.success) {
      dispatch({
        type: "EDIT_DISH_SUCCESS",
        payload: { message: res.data.message },
      });
      
    }
  };
  return (
    <div className="container" style={{ margin: "3rem" }}>
      <div className="content">
        <h1 className="form-title">Update Dish</h1>
        <form onSubmit={submithandler}>
          <input
            type="text"
            placeholder="Dish Name"
            name="Dish_name"
            onChange={(event) => {
              setname(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Dish Description"
            name="description"
            onChange={(event) => {
              setdescription(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Dish Price"
            name="price"
            onChange={(event) => {
              setprice(event.target.value);
            }}
          />

          <br />
          <button type="Submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditDish;
