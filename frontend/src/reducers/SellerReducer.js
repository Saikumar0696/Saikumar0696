export const sellerloginreducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        isloggedin: false,
        token: "",
        restaurant_id: 0,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        issellerloggedin: true,
        token: action.payload.token,
        restaurant_id: action.payload.restaurant_id,
        error: false,
      };
    case "LOGIN_FAIL":
      return {
        issellerloggedin: false,
        token: "",
        restaurant_id: 0,
        error: true,
      };
    case "LOG_OUT":
      return {
        issellerloggedin: false,
        token: "",
        restaurant_id: 0,
      };
    default:
      return state;
  }
};
export const dishesreducer = (state = { dishes: [] }, action) => {
  switch (action.type) {
    case "DISH_REQUEST":
      return {
        loading: true,
        dishes: [],
      };
    case "DISH_SUCCESS":
      return {
        ...state,
        loading: false,
        dishes: action.payload.dishes,
      };
    case "DISH_FAIL":
      return {
        dishes: [],
      };

    default:
      return state;
  }
};

export const createdishreducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case "CREATE_DISH_REQUEST":
      return {
        message: "",
      };
    case "CREATE_DISH_SUCCESS":
      return {
        message: action.payload.message,
      };
    case "CREATE_DISH_FAIL":
      return {
        message: "",
      };

    default:
      return state;
  }
};
export const deletedishreducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case "DELETE_DISH_REQUEST":
      return {
        message: "",
      };
    case "DELETE_DISH_SUCCESS":
      return {
        message: action.payload.message,
      };
    case "DELETE_DISH_FAIL":
      return {
        message: "",
      };

    default:
      return state;
  }
};
export const editdishreducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case "EDIT_DISH_REQUEST":
      return {
        message: "",
      };
    case "EDIT_DISH_SUCCESS":
      return {
        message: action.payload.message,
      };
    case "EDIT_DISH_FAIL":
      return {
        message: "",
      };

    default:
      return state;
  }
};
export const regrestaurantreducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case "REGISTRATION_RESTAURANT_REQUEST":
      return {
        message: "",
      };
    case "REGISTRATION_RESTAURANT_SUCCESS":
      return {
        message: action.payload.message,
      };
    case "REGISTRATION_RESTAURANT_FAIL":
      return {
        message: "",
      };

    default:
      return state;
  }
};
export const getsellerorderreducer = (
  state = { orders: [], success: false },
  action
) => {
  switch (action.type) {
    case "GET_SELLER_ORDER_SUCCESS":
      return {
        success: true,

        orders: action.payload.orders,
      };
    case "GET_SELLER_ORDER_FAIL":
      return {
        success: false,
        orders: [],
      };
    case "SELLER_FILTER_ORDER":
      return {
        orders: action.payload.orders,
      };

    default:
      return state;
  }
};
export const changestatusreducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case "CHANGE_STATUS_SUCCESS":
      return {
        message: action.payload.message,
      };
    case "CHANGE_STATUS_FAIL":
      return {
        message: "",
      };

    default:
      return state;
  }
};
