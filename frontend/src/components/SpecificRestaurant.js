import React from "react";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDishes } from "../Actions/CustomerActionCreator";
import Dish from "./Dish";
const SpecificRestaurant = ({ match }) => {
  const dispatch = useDispatch();
  const r_id = match.params.id;
  const dishesreducer = useSelector((state) => state.dishesreducer);
  const { dishes } = dishesreducer;

  useEffect(() => {
    dispatch(getDishes(match.params.id));
  }, [match.params.id, dispatch]);

  return (
    <div>
      <Row>
        {dishes.map((dish) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Dish dish={dish} r_id={r_id} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SpecificRestaurant;
