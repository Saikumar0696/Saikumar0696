import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Redirect } from "react-router";

import { getDishes } from "../Actions/SellerActionCreator";

import { Row, Col, Card } from "react-bootstrap";
import Dish from "./Dish";
import plus from "../Images/plus.jpg";
import { Link } from "react-router-dom";

const SellerHome = () => {
  const loginReducer = useSelector((state) => state.sellerloginreducer);
  const dishesreducer = useSelector((state) => state.dishesreducer);
  const createdishReducer = useSelector((state) => state.createdishreducer);
  createdishReducer.message = "";

  const dispatch = useDispatch();
  const { token, restaurant_id } = loginReducer;
  const { dishes } = dishesreducer;

  useEffect(() => {
    dispatch(getDishes(restaurant_id, token));
  }, [dispatch, restaurant_id, token]);

  return (
    <div>
      {!token && <Redirect to="/seller/signin"></Redirect>}

      <Row>
        {dishes.map((dish) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Dish dish={dish} />
            </Col>
          );
        })}
        <Col sm={12} md={6} lg={4} xl={3}>
          <Link to="/seller/create" classname="btn-btn primary">
            <Card classname="my-3 p-3 rounded" style={{ width: "18rem" }}>
              <Card.Img src={plus} variant="top" />
              <Card.Title as="div" style={{ width: "18rem" }}>
                <button>Create</button>
              </Card.Title>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default SellerHome;
