import axios from "axios";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import baseurl from "../components/Server";
import Modal from "react-modal";
import "../Styles/dialog.css";

const Dish = ({ dish, r_id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [modalisopen, setModalisopen] = useState(false);
  const loginReducer = useSelector((state) => state.sellerloginreducer);

  const countreducer = useSelector((state) => state.countreducer);
  const { count } = countreducer;

  const { issellerloggedin, token } = loginReducer;

  const deletehandler = async (e) => {
    dispatch({ type: "DELETE_DISH_REQUEST" });

    let res = await axios.post(
      `${baseurl}/seller/deletedish`,
      { dish_id: dish.dish_id },
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.success) {
      dispatch({ type: "DELETE_DISH_SUCCESS" });
      window.location.reload();
    }
  };
  const addtocart = (event) => {
    dispatch({ type: "ADD_TO_CART", payload: { dish } });
  };

  const edithandler = async (e) => {
    history.push(`/seller/editdish/${dish.dish_id}`);
  };
  const newcarthandler = () => {
    dispatch({ type: "NEW_FROM_CART" });
    dispatch({ type: "ADD_TO_CART", payload: { dish } });
    localStorage.setItem("rid", r_id);
    history.push("/cart");
  };
  return (
    <div>
      <Card classname="my-4  p-6 rounded" style={{ margin: "1rem" }}>
        <Card.Img src={dish.dish_image} variant="top" />

        <Card.Body>
          <Card.Title as="div">
            <strong>{dish.dish_name}</strong>
          </Card.Title>
          <Card.Title as="div">
            <strong>${dish.dish_price}</strong>
          </Card.Title>
          {issellerloggedin ? (
            <Card.Title as="div">
              <button class="btn btn-primary mx-3" onClick={edithandler}>
                edit
              </button>
              <button class="btn btn-danger" onClick={deletehandler}>
                delete
              </button>
            </Card.Title>
          ) : (
            <Card.Title as="div">
              <button
                classname="btn btn-primary"
                style={{ width: "18rem" }}
                onClick={(e) => {
                  dispatch({ type: "COUNT_INCREASE" });

                  if (count === 0) {
                    addtocart(e);
                    localStorage.setItem("rid", r_id);
                    history.push("/cart");
                  } else {
                    if (localStorage.getItem("rid") === r_id) {
                      addtocart(e);
                      history.push("/cart");
                    } else {
                      setModalisopen(true);
                    }
                  }
                }}
              >
                Add To CART
              </button>
            </Card.Title>
          )}
        </Card.Body>
      </Card>
      <Modal
        isOpen={modalisopen}
        onRequestClose={() => setModalisopen(false)}
        className="Modal"
      >
        <div>Do you wish to continue with a new order?</div>
        <div className="modalbtn">
          <button className="dishbtn" onClick={newcarthandler}>
            Yes
          </button>

          <button className="dishbtn" onClick={() => setModalisopen(false)}>
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dish;
