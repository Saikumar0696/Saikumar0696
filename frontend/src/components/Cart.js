import React, { useState } from "react";
import styles from "../Styles/Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const cartreducer = useSelector((state) => state.cartreducer);

  const { cart } = cartreducer;
  const history = useHistory();

  const Tp = cart.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.dish_price * currentValue.qty,
    0
  );

  const [TotalPrice, setTotalprice] = useState(Tp);

  const checkouthandler = () => {
    history.push("/checkout");
  };

  return (
    <div>
      {cart.length !== 0 ? (
        <div className={styles.cart}>
          <div className={styles.cart__items}>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} cb={setTotalprice} />
            ))}
          </div>
          <div className={styles.cart__summary}>
            <h4 className={styles.summary__title}>Cart Summary</h4>
            <div className={styles.summary__price}>
              <span>TOTAL: ({cart.length} items)</span>
              <span>$ {TotalPrice}</span>
            </div>
            <button
              className={styles.summary__checkoutBtn}
              style={{ width: "8rem" }}
              onClick={checkouthandler}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="cart cart-header">Cart is empty</div>
      )}
      <button style={{ width: "8rem" }} onClick={(e) => history.goBack()}>
        Go back
      </button>
    </div>
  );
};

export default Cart;
