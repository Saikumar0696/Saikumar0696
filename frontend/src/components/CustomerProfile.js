import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import baseurl from "../components/Server";
import "../Styles/customerprofile.css";

import axios from "axios";

const CustomerProfile = () => {
  const [streetname, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [zip, setzip] = useState("");
  const [sta, setstate] = useState("");
  const [image, setimage] = useState(
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
  );

  const customerloginreducer = useSelector(
    (state) => state.customerloginreducer
  );

  const addrreducer = useSelector((state) => state.customeraddrreducer);
  const { success, addr } = addrreducer;

  const dispatch = useDispatch();
  const {
    customer_name,
    customer_id,
    customer_profile,
    customer_email,
    token,
    iscustomerloggedin,
  } = customerloginreducer;

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
    }
  };
  const imagehandler = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("customer_id", customer_id);
    data.append("customer_image", image);

    const uploadimage = async (data) => {
      let res = await axios.put(`${baseurl}/customer/customerimage`, data);
      console.log(res);
      if (res.data.success) {
        console.log(res.data.url);
        setimage(res.data.url);
        dispatch({
          type: "CUSTOMER_LOGIN_SUCCESS",
          payload: {
            customer_profile: res.data.url,
          },
        });
      }
    };
    uploadimage(data);
  };

  return (
    <>
      <div class="container rounded bg-white mt-5 mb-5">
        {!iscustomerloggedin && <Redirect to="/" />}

        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                alt=""
                src={customer_profile}
              />
              <input
                type="file"
                name="image"
                required
                onChange={(event) => {
                  setimage(event.target.files[0]);
                }}
              />
              <Button style={{ width: "auto" }} onClick={imagehandler}>
                Upload
              </Button>
              <span class="font-weight-bold">{customer_name}</span>
              <span class="text-black-50">{customer_email}</span>
              <span>
                {success && <p>Address</p>}
                {addr.length !== 0 &&
                  addr.map((a) => {
                    return (
                      <div>
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
                      </div>
                    );
                  })}{" "}
              </span>
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
