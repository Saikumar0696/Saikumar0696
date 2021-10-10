import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { createDish } from "../Actions/SellerActionCreator";

const CreateDish = () => {
  const loginReducer = useSelector((state) => state.sellerloginreducer);
  const { token, restaurant_id } = loginReducer;
  const createdishReducer = useSelector((state) => state.createdishreducer);
  const { message } = createdishReducer;

  const [dish_name, setname] = useState("");
  const [dish_description, setdescription] = useState("");
  const [dish_image, setimage] = useState("");
  const [dish_price, setprice] = useState("");
  const dispatch = useDispatch();

  const submithandler = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("restaurant_id", restaurant_id);
    data.append("dish_name", dish_name);
    data.append("dish_description", dish_description);
    data.append("dish_price", dish_price);
    data.append("dish_image", dish_image);

    dispatch(createDish(data, token));
  };
  return (
    <div className="container" style={{ margin: "3rem" }}>
      <div className="content">
        <h1 className="form-title">Create Dish</h1>
        <form onSubmit={submithandler}>
          <input
            type="text"
            placeholder="Dish Name"
            name="Dish_name"
            required
            onChange={(event) => {
              setname(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Dish Description"
            name="description"
            required
            onChange={(event) => {
              setdescription(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Dish Price"
            name="price"
            required
            onChange={(event) => {
              setprice(event.target.value);
            }}
          />

          <div>
            <span>
              Dish Image{" "}
              <input
                type="file"
                name="dish_image"
                required
                onChange={(event) => {
                  setimage(event.target.files[0]);
                }}
              />
            </span>
          </div>
          <br />
          <button type="Submit">Create</button>
        </form>
        {message && <Redirect to="/seller/home" />}
      </div>
    </div>
  );
};

export default CreateDish;
