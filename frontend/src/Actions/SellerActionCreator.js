import axios from "axios";
import baseurl from "../components/Server";
export const sellerlogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    let res = await axios.post(
      `${baseurl}/seller/signin`,
      { seller_email: email, seller_password: password },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: res.data.token,
          restaurant_id: res.data.restaurant_id,
        },
      });
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("rid", res.data.restaurant_id);
      sessionStorage.setItem("loggedin", true);
    } else {
      dispatch({
        type: "LOGIN_FAIL",
      });
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
    });
  }
};

export const getDishes = (rid, token) => async (dispatch) => {
  try {
    dispatch({ type: "DISHES_REQUEST" });
    let res = await axios.post(
      `${baseurl}/seller/getdishes`,
      { rid: rid },
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
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

export const createDish = (data, token) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_DISH_REQUEST" });

    let res = await axios.post(
      `${baseurl}/seller/createdishes`,

      data,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: "CREATE_DISH_SUCCESS",
        payload: {
          message: res.data.message,
        },
      });
    } else {
      dispatch({
        type: "CREATE_DISH_FAIL",
      });
    }
  } catch (error) {
    dispatch({
      type: "CREATE_DISH_FAIL",
    });
  }
};

export const getSellerOrders = (rid, token) => async (dispatch) => {
  try {
    console.log("getSellerOrders");
    let res = await axios.post(
      `${baseurl}/seller/orders`,
      { rid },
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: "GET_SELLER_ORDER_SUCCESS",
        payload: {
          orders: res.data.orders,
        },
      });
      localStorage.setItem("sellerorders", JSON.stringify(res.data.orders));
    } else {
      dispatch({
        type: "GET_SELLER_ORDER_FAIL",
      });
    }
  } catch (error) {
    dispatch({
      type: "GET_SELLER_ORDER_FAIL",
    });
  }
};

export const changestatusorder = (obj, token) => async (dispatch) => {
  try {
    console.log("changestatus");
    let res = await axios.put(
      `${baseurl}/seller/changestatus`,
      { ...obj },
      {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: "CHANGE_STATUS_SUCCESS",
        payload: {
          message: res.data.message,
        },
      });
      window.location.reload();
    } else {
      dispatch({
        type: "CHANGE_STATUS_SUCCESS_FAIL",
      });
    }
  } catch (error) {
    dispatch({
      type: "GET_SELLER_ORDER_FAIL",
    });
  }
};
