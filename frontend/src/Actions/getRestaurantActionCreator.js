import axios from "axios";
import baseurl from "../components/Server";

export const getRestaurants = (location) => async (dispatch) => {
  try {
    dispatch({ type: "RESTAURANT_LIST_REQUEST" });
    let list = await axios.post(
      `${baseurl}/getrestaurants/`,
      { location },
      {
        headers: {
          "Content-Type": "application/JSON",
        },
      }
    );
    dispatch({ type: "RESTAURANT_LIST_SUCCESS", payload: list.data.result });
  } catch (error) {
    dispatch({ type: "RESTAURANT_LIST_FAIL" });
  }
};
