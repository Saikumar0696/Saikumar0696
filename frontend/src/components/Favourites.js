import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import baseurl from "./Server";
import axios from "axios";

const Favourites = () => {
  const [restaurants, setrestaurant] = useState([]);

  const customerloginreducer = useSelector(
    (state) => state.customerloginreducer
  );

  const { customer_id } = customerloginreducer;

  useEffect(() => {
    const getfav = async (customer_id) => {
      let res = await axios.post(
        `${baseurl}/getrestaurants/getfavourites`,
        {
          customer_id,
        },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
        }
      );
      console.log(res);
      setrestaurant(res.data.result);
    };
    getfav(customer_id);
  }, [customer_id]);

  return (
    <>
      {restaurants.map((restaurant) => {
        return (
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
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default Favourites;
