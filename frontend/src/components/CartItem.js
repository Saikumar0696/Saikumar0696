import React, { useState } from "react";
import styles from "../Styles/CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const CartItem = ({ item, cb }) => {
  const [qty, setqty] = useState(item.qty);
  const cartreducer = useSelector((state) => state.cartreducer);
  


  const { cart } = cartreducer;
  const dispatch = useDispatch();
  const history = useHistory();

  const priceHandler = () => {
    const Tp = cart.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.dish_price * currentValue.qty,
      0
    );
    cb(Tp);
  };

  const ondeleteitemHandler = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { dish: item } });
    const { cart } = cartreducer;
    const Tp = cart.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.dish_price * currentValue.qty,
      0
    );
    cb(Tp);

    history.push("/cart");
  };

  return (
    <div className={styles.cartItem}>
      <img
        className={styles.cartItem__image}
        src={item.dish_image}
        alt={item.title}
      />
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{item.dish_name}</p>
        <p className={styles.details__desc}>{item.dish_description}</p>
        <p className={styles.details__price}>$ {item.dish_price}</p>
      </div>
      <div className={styles.cartItem__actions}>
        <div className={styles.cartItem__qty}>
          <label htmlFor="qty">Qty</label>
          <select
            value={qty}
            onChange={(e) => {
              dispatch({
                type: "CHANGE_QUANTITY_FROM_CART",
                payload: {
                  dish: item,
                  qty: e.target.value,
                },
              });
              setqty(e.target.value);
              priceHandler();
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button
          onClick={() => ondeleteitemHandler(item)}
          className={styles.actions__deleteItemBtn}
        >
          <img
            src="https://image.flaticon.com/icons/svg/709/709519.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
