import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { getSellerOrders } from "../Actions/SellerActionCreator";
import { Button } from "react-bootstrap";
import { changestatusorder } from "../Actions/SellerActionCreator";

const SellerOrder = () => {
  const sellerloginreducer = useSelector((state) => state.sellerloginreducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurant_id, token, issellerloggedin } = sellerloginreducer;

  var obj = {};

  useEffect(() => {
    dispatch(getSellerOrders(restaurant_id, token));
  }, [dispatch, restaurant_id, token]);

  const getsellerorderreducer = useSelector(
    (state) => state.getsellerorderreducer
  );

  const { orders } = getsellerorderreducer;

  const statushandler = (e, pickup, order_id) => {
    if (pickup) {
      obj = {
        order_id,
        restaurant_id,
        pickup,
        pickupReady: e.target.value === "Pick Up ready" ? 1 : 0,
        pickupSuccesful: e.target.value === "Pickup Succesful" ? 1 : 0,
      };
    } else {
      obj = {
        order_id,
        restaurant_id,
        delivery: 1,
        deliveryPreparing: e.target.value === "Delivery started" ? 1 : 0,
        deliveryDelivered: e.target.value === "Delivered" ? 1 : 0,
      };
    }
  };
  const changestatus = () => {
    dispatch(changestatusorder(obj, token, history));
  };
  const filterstatus = (e) => {
    let p = [];
    const orders = JSON.parse(localStorage.getItem("sellerorders"));
    if (!e.target.value) {
      dispatch({ type: "SELLER_FILTER_ORDER", payload: { orders } });
    }
    if (e.target.value === "preparing") {
      for (const order of orders) {
        for (const status of order.status) {
          if (status.Delivery_preparing) {
            p.push(order);
          }
        }
      }
      dispatch({ type: "SELLER_FILTER_ORDER", payload: { orders: p } });
    } else if (e.target.value === "Delivered") {
      for (const order of orders) {
        for (const status of order.status) {
          if (status.Delivery_delivered) {
            p.push(order);
          }
        }
      }
      dispatch({ type: "SELLER_FILTER_ORDER", payload: { orders: p } });
    }
  };

  return (
    <>
      {!issellerloggedin && <Redirect to="/seller/login" />}
      <h1>Order Status</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Customer Email</th>
            <th scope="col">Dishes</th>
            <th scope="col">
              Status
              <select onChange={filterstatus}>
                <option> </option>
                <option value="preparing">Preparing</option>
                <option value="Delivered">Delivered</option>
              </select>
            </th>

            <th scope="col">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr>
                <th scope="row">{order.order_id}</th>
                {order.customer_info.map((c) => {
                  return (
                    <>
                      <td>{c.customer_name}</td>
                      <td>{c.customer_email}</td>
                    </>
                  );
                })}
                <td>
                  {" "}
                  {order.dishes.map((dish) => {
                    return dish.dish_name;
                  })}
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
                <td>
                  {order.status.map((stat) => {
                    return (
                      <select
                        onChange={(event) =>
                          statushandler(
                            event,
                            stat.Pickup_received,
                            order.order_id
                          )
                        }
                      >
                        {order.pickup === 1 && (
                          <>
                            <option></option>
                            <option value="Pick Up ready">
                              Pick Up ready{" "}
                            </option>
                            <option value="Pickup Succesful">
                              Pickup Succesful
                            </option>
                          </>
                        )}
                        {order.delivery === 1 && (
                          <>
                            <option></option>
                            <option value="Delivery started">
                              Delivery started{" "}
                            </option>
                            <option value="Delivered">Delivered</option>
                          </>
                        )}
                      </select>
                    );
                  })}
                </td>
                <td>
                  <Button style={{ width: "auto" }} onClick={changestatus}>
                    Change
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SellerOrder;
