export const restaurantReducer = (state = { restaurant: [] }, action) => {
  switch (action.type) {
    case "RESTAURANT_LIST_REQUEST":
      return { loading: true, restaurant: [] };
    case "RESTAURANT_LIST_SUCCESS":
      return { loading: false, restaurant: action.payload };
    case "RESTAURANT_LIST_FAIL":
      return { ...state, restaurant: [] };
    default:
      return state;
  }
};

export const locationReducer = (state = { location: "" }, action) => {
  switch (action.type) {
    case "Location":
      return { location: action.payload };
    default:
      return state;
  }
};
