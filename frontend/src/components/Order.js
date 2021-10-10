import React from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../Actions/CustomerActionCreator";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import store from "../store";

const Order = () => {
  const customerloginreducer = useSelector(
    (state) => state.customerloginreducer
  );
  const dispatch = useDispatch();
  const { customer_id, token, iscustomerloggedin } = customerloginreducer;

  useEffect(() => {
    dispatch(getOrders(customer_id, token));
  }, [dispatch, customer_id, token]);

  const getorderreducer = useSelector((state) => state.getorderreducer);

  const { orders } = getorderreducer;

  const filterstatus = (e) => {
    let p = [];
    const orders = JSON.parse(localStorage.getItem("orders"));
    if(!e.target.value){
        dispatch({ type: "FILTER_ORDER", payload: { orders } });
    }
    if (e.target.value === "New") {
      for (const order of orders) {
        for (const status of order.status) {
          if (status.Delivery_received) {
            p.push(order);
          }
        }
      }
      dispatch({ type: "FILTER_ORDER", payload: { orders: p } });
    } else if (e.target.value === "Delivered") {
      for (const order of orders) {
        for (const status of order.status) {
          if (status.Delivery_delivered) {
            p.push(order);
          }
        }
      }
      dispatch({ type: "FILTER_ORDER", payload: { orders: p } });
    }
  };

  return (
    <>
      {!iscustomerloggedin && <Redirect to="/" />}
      <h1>Order Status</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Restaurant Name</th>
            <th scope="col">Dishes</th>
            <th scope="col">Price</th>
            <th scope="col">
              Status
              <select onChange={filterstatus}>
                <option> </option>
                <option value="New">New</option>
                <option value="Delivered">Delivered</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr>
                <th scope="row">{order.order_id}</th>
                <td>{order.restaurant_name.map((r) => r.restaurant_name)}</td>
                <td>
                  {" "}
                  {order.dishes.map((dish) => {
                    return dish.dish_name;
                  })}
                </td>
                <td>
                  {" "}
                  {order.dishes.reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue.dish_price;
                  }, 0)}
                </td>
                <td>
                  {order.status.map((stat) => {
                    return (
                      <>
                        {stat.Pickup_received === 1 && <p>PickUp Placed</p>}
                        {stat.Pickup_ready === 1 && <p>PickUp ready</p>}
                        {stat.PickUp_succesful === 1 && <p>Pickup Succesful</p>}
                        {stat.Delivery_received === 1 && <p>Delivery Placed</p>}
                        {stat.Delivery_preparing === 1 && (
                          <p>Delivery to start</p>
                        )}
                        {stat.Delivery_delivered === 1 && <p>Delivered</p>}
                      </>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Order;
