import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router";
import { Row, Col } from "react-bootstrap";
import Restaurant from "./Restaurant";
import { getRestaurants } from "../Actions/getRestaurantActionCreator";
const RestaurantLandingPage = () => {
  const locationReducer = useSelector((state) => state.locationReducer);
  const restaurantreducer = useSelector((state) => state.restaurantReducer);
  const { restaurant } = restaurantreducer;
  const dispatch = useDispatch();
  const { location } = locationReducer;

  useEffect(() => {
    dispatch(getRestaurants(location));
  }, [location, dispatch]);

  return (
    <div>
      {!location && <Redirect to="/" />}
      {restaurant === undefined ? (
        <p>No restaurant matching the locaton</p>
      ) : (
        <Row>
          {restaurant.map((res) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Restaurant restaurant={res} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default RestaurantLandingPage;
