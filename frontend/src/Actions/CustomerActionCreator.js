import axios from "axios";
import baseurl from "../components/Server";
export const getDishes = (rid) => async (dispatch) => {
  try {
    dispatch({ type: "DISHES_REQUEST" });
    let res = await axios.post(
      `${baseurl}/customer/getdishes`,
      { restaurant_id: rid },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: "DISH_SUCCESS",
        payload: {
          dishes: res.data.dishes,
        },
      });
    } else {
      dispatch({
        type: "DISH_FAIL",
      });
    }
  } catch (error) {
    dispatch({
      type: "DISH_FAIL",
    });
  }
};
export const customerlogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "CUSTOMER_LOGIN_REQUEST" });
    let res = await axios.post(
      `${baseurl}/customer/signin`,
      { customer_email: email, customer_password: password },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: "CUSTOMER_LOGIN_SUCCESS",
        payload: {
          token: res.data.token,
          customer_id: res.data.customer_id,
          customer_name: res.data.customer_name,
          customer_profile: res.data.customer_profile,
          customer_email: res.data.customer_email,
        },
      });
      sessionStorage.setItem("customer_token", res.data.token);
      sessionStorage.setItem("cid", res.data.customer_id);
      sessionStorage.setItem("iscustomerloggedin", true);
      sessionStorage.setItem("customer_name", res.data.customer_name);
      sessionStorage.setItem("customer_profile", res.data.customer_profile);
      dispatch(getAddress(res.data.customer_id, res.data.token));
    } else {
      dispatch({
        type: "CUSTOMER_LOGIN_FAIL",
      });
    }
  } catch (error) {
    dispatch({
      type: "CUSTOMER_LOGIN_FAIL",
    });
  }
};

export const customersignup = (name, email, password) => async (dispatch) => {
  try {
    let res = await axios.post(
      `${baseurl}/customer/signup`,
      {
        customer_name: name,
        customer_email: email,
        customer_password: password,
      },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    );
    if (res.data.success) {
      dispatch({ type: "CUSTOMER_REGISTRATION_SUCCESS" });
    } else {
      dispatch({ type: "CUSTOMER_REGISTRATION_FAIL" });
    }
  } catch (e) {}
};
export const getAddress = (cid, token) => async (dispatch) => {
  try {
    let res = await axios.post(
      `${baseurl}/customer/getaddress`,
      {
        customer_id: cid,
      },
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.address) {
      dispatch({
        type: "ADDRESS_SUCCESFUL",
        payload: { address: res.data.address },
      });
      sessionStorage.setItem("address", JSON.stringify(res.data.address));
    } else {
      dispatch({ type: "ADDRESS_UNSUCCESFUL" });
    }
  } catch (e) {}
};

export const createorder =
  (
    cid,
    token,
    delivery,
    pickup,
    restaurant_id,
    callbacktodishes,
    succeshandler
  ) =>
  async (dispatch) => {
    try {
      console.log("create order");
      let res = await axios.post(
        `${baseurl}/customer/insertorder`,
        {
          customer_id: cid,
          restaurant_id,
          delivery: delivery === true,
          pickup: pickup === true,
        },
        {
          headers: {
            "Content-Type": "application/JSON",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        dispatch({
          type: "ORDER_SUCCESS",
          payload: { order_id: res.data.order_id },
        });
        callbacktodishes(res.data.order_id);
        succeshandler();
      } else {
        dispatch({ type: "ORDER_FAIL" });
      }
    } catch (e) {}
  };
export const getOrders = (cid, token) => async (dispatch) => {
  try {
    let res = await axios.post(
      `${baseurl}/customer/getorders`,
      { customer_id: cid },
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      localStorage.setItem("orders", JSON.stringify(res.data.orders));
      dispatch({
        type: "GET_ORDER_SUCCESS",
        payload: {
          orders: res.data.orders,
        },
      });
    } else {
      dispatch({
        type: "GET_ORDER_FAIL",
      });
    }
  } catch (error) {
    dispatch({
      type: "GET_ORDER_FAIL",
    });
  }
};
