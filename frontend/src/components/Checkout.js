import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import Modal from "react-modal";
import baseurl from "../components/Server";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createorder } from "../Actions/CustomerActionCreator";
import { useHistory } from "react-router";

const Checkout = () => {
  const [modalisopen, setModalisopen] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [selectaddr, setaddr] = useState({});
  const [proceed, setproceed] = useState(true);
  const dispatch = useDispatch();
  const [streetname, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [zip, setzip] = useState("");
  const [sta, setstate] = useState("");
  const history = useHistory();

  const customerloginreducer = useSelector(
    (state) => state.customerloginreducer
  );
  const cartreducer = useSelector((state) => state.cartreducer);

  const { cart } = cartreducer;
  const { restaurant_id } = cart[0];

  const customeraddrreducer = useSelector((state) => state.customeraddrreducer);
  const { iscustomerloggedin, customer_id, token } = customerloginreducer;
  const { addr } = customeraddrreducer;
  const callbacktodishes = async (order_id) => {
    for (const item of cart) {
      await axios.post(
        `${baseurl}/customer/ordertodishes`,
        {
          order_id,
          dish_id: item.dish_id,
          qty: item.qty,
        },
        {
          headers: {
            "Content-Type": "application/JSON",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  };
  const orderhandler = () => {
    console.log(selectaddr);
    if (!selectaddr.Delivery_id) {
      setproceed(false);
    } else {
      setproceed(true);
      console.log(restaurant_id);
      dispatch(
        createorder(
          customer_id,
          token,
          delivery,
          pickup,
          restaurant_id,
          callbacktodishes,
          succeshandler
        )
      );
    }
  };
  const succeshandler = () => {
    history.push("/ordersuccess");
  };
  const submithandler = async (e) => {
    let addr = {
      c_id: customer_id,
      Street_name: streetname,
      City: city,
      Zipcode: zip,
      State: sta,
    };
    console.log(addr);
    let res = await axios.post(
      `${baseurl}/customer/addaddress`,
      {
        ...addr,
      },
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    if (res.data.success) {
      dispatch({
        type: "ADDRESS_ADDED",
        payload: {
          address: addr,
        },
      });
      setModalisopen(false);
    }
  };
  const modehandler = (event) => {
    if (event.target.value === "Delivery") {
      setDelivery(true);
    } else if (event.target.value === "PickUp") {
      console.log("hi");
      setPickup(true);
      setaddr({ Delivery_id: restaurant_id });
      setDelivery(false);
    }
  };

  return (
    <>
      <div>
        {!iscustomerloggedin && <Redirect to="/customer/login" />}
        {!proceed && <h3> Please Select or Add Address</h3>}
        <label>
          {" "}
          PickUp/Delivery
          <select onChange={modehandler}>
            <option></option>
            <option value="Delivery">Delivery</option>
            <option value="PickUp">PickUp</option>
          </select>
        </label>
        <br />
        {delivery &&
          addr.length !== 0 &&
          addr.map((a) => {
            return (
              <label>
                <input
                  type="radio"
                  name="addr"
                  value={a}
                  onChange={() => {
                    setaddr(a);
                  }}
                />
                <div class="row">
                  <span className="conatainer">Address </span>
                  <span>
                    <div>
                      <span>Street Name:</span>
                      <span>{a.Street_name}</span>
                    </div>
                    <div>
                      <span>City:</span>
                      <span>{a.City}</span>
                    </div>
                    <div>
                      <span>State:</span>
                      <span>{a.State}</span>
                    </div>
                    <div>
                      <span>ZipCode:</span>
                      <span>{a.Zipcode}</span>
                    </div>
                  </span>
                </div>
              </label>
            );
          })}{" "}
      </div>
      {delivery && (
        <button
          style={{ margin: "5px 0px 2px 0px" }}
          className="btn btn-primary"
          onClick={() => setModalisopen(true)}
        >
          Add Address
        </button>
      )}

      <button
        className=" btn btn-success"
        style={{ margin: "30px 2rem" }}
        onClick={orderhandler}
      >
        Place Your Order
      </button>

      <Modal isOpen={modalisopen} onRequestClose={() => setModalisopen(false)}>
        <div class="col-md-5 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">User Info</h4>
            </div>

            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Street Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="enter address line 1"
                  onChange={(e) => setstreet(e.target.value)}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">City</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="enter City"
                  onChange={(e) => setcity(e.target.value)}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">Zipcode</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Zipcode"
                  onChange={(e) => setzip(e.target.value)}
                />
              </div>
              <div class="col-md-12">
                <label class="labels">State</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="State "
                  onChange={(e) => setstate(e.target.value)}
                />
              </div>
            </div>

            <div class="mt-5 text-center">
              <button
                class="btn btn-primary profile-button"
                type="button"
                onClick={submithandler}
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;
