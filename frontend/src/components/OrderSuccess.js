import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div>
      <h1>Order Succesful</h1>
      <Link to="/customer/orders">View Order Status</Link>
    </div>
  );
};

export default OrderSuccess;
