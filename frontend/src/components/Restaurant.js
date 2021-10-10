import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useState } from "react";
import baseurl from "./Server";
import axios from "axios";

const Restaurant = ({ restaurant }, callback) => {
  const history = useHistory();
  const [isadded, setisadded] = useState(false);

  const customerloginreducer = useSelector(
    (state) => state.customerloginreducer
  );
  const { iscustomerloggedin, customer_id } = customerloginreducer;

  const favouritehanlder = (r_id) => {
    console.log(r_id);
    console.log(iscustomerloggedin);
    if (!iscustomerloggedin) {
      history.push("/customer/login");
      return;
    }
    const posthandler = async (restaurant_id, customer_id) => {
      let res = await axios.post(
        `${baseurl}/getrestaurants/addtofavourites`,
        {
          customer_id,
          restaurant_id,
        },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        setisadded(true);
      }
    };

    posthandler(r_id, customer_id);
  };

  return (
    <>
      {isadded && <h3> Added as Favourite </h3>}
      <Card classname="my-3 p-3 rounded" style={{ width: "18rem" }}>
        <Link to={`/getRestaurants/${restaurant.Restaurant_id}`}>
          <Card.Img src={restaurant.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/getRestaurants/${restaurant.Restaurant_id}`}>
            <Card.Title as="div">
              <strong>{restaurant.restaurant_name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            {restaurant.pickup === 1 ? (
              <p>PickUp Available</p>
            ) : (
              <p>Pickup Unavailable</p>
            )}
            {restaurant.delivery === 1 ? (
              <p>Delivery Available</p>
            ) : (
              <p>Delivery unavailable</p>
            )}
          </Card.Text>
          <Button
            onClick={() => favouritehanlder(restaurant.Restaurant_id)}
            style={{ width: "auto" }}
          >
            Add to Favourites
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Restaurant;
