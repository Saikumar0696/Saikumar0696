export const cartreducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newitem = action.payload.dish.dish_id;
      let dishwithqty = { ...action.payload.dish, qty: 1 };
      let count = 0;
      for (const item of state.cart) {
        if (item.dish_id === newitem) {
          state.cart[count].qty = parseInt(state.cart[count].qty) + 1;
          if (state.cart[count].qty > 4) {
            state.cart[count].qty = 4;
          }
          return state;
        }
        count++;
      }

      return {
        cart: [...state.cart, dishwithqty],
      };
    case "CHANGE_QUANTITY_FROM_CART":
      const dish = action.payload.dish;
      const newqty = action.payload.qty;
      const found = state.cart.find((d) => d.dish_id === dish.dish_id);
      found.qty = newqty;

      return state;

    case "REMOVE_FROM_CART":
      let item = action.payload.dish;

      state.cart = state.cart.filter((c) => c.dish_id !== item.dish_id);

      return state;

    case "NEW_FROM_CART":
      state.cart = [];

      return state;

    default:
      return state;
  }
};

export const customerloginreducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_LOGIN_REQUEST":
      return {
        iscustomerloggedin: false,
        token: "",
        customer_id: 0,
        error: false,
      };
    case "CUSTOMER_LOGIN_SUCCESS":
      return {
        ...state,
        iscustomerloggedin: true,
        token: action.payload.token,
        customer_id: action.payload.customer_id,
        customer_name: action.payload.customer_name,
        customer_profile: action.payload.customer_profile,
        customer_email: action.payload.customer_email,
        error: false,
      };
    case "CUSTOMER_LOGIN_FAIL":
      return {
        iscustomerloggedin: false,
        token: "",
        customer_id: 0,
        error: true,
      };
    case "CUSTOMER_LOG_OUT":
      return {
        iscustomerloggedin: false,
        token: "",
        customer_id: 0,
      };
    default:
      return state;
  }
};
export const customersignupreducer = (
  state = { success: false, error: false },
  action
) => {
  switch (action.type) {
    case "CUSTOMER_REGISTRATION_SUCCESS":
      return {
        success: true,
        error: false,
      };
    case "CUSTOMER_REGISTRATION_FAIL":
      return {
        success: false,
        error: true,
      };

    default:
      return state;
  }
};

export const customeraddrreducer = (
  state = { addr: [], success: false },
  action
) => {
  switch (action.type) {
    case "ADDRESS_SUCCESFUL":
      return {
        addr: action.payload.address,
        success: true,
      };
    case "ADDRESS_ADDED":
      return {
        addr: [...state.addr, action.payload.address],
        success: true,
      };

    case "ADDRESS_UNSUCCESFUL":
      return {
        addr: [],
        success: false,
        error: true,
      };

    default:
      return state;
  }
};

export const orderreducer = (
  state = { success: false, error: false, order_id: 0 },
  action
) => {
  switch (action.type) {
    case "ORDER_SUCCESS":
      return {
        success: true,
        error: false,
        order_id: action.payload.order_id,
      };
    case "ORDER_FAIL":
      return {
        success: false,
        error: true,
        order_id: 0,
      };

    default:
      return state;
  }
};

export const getorderreducer = (
  state = { orders: [], success: false },
  action
) => {
  switch (action.type) {
    case "GET_ORDER_SUCCESS":
      
      return {
        success: true,

        orders: action.payload.orders,
      };
    case "GET_ORDER_FAIL":
      return {
        success: false,
        orders: [],
      };
    case "FILTER_ORDER":
      return {
        orders: action.payload.orders,
      };

    default:
      return state;
  }
};
export const countreducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "COUNT_INCREASE":
      return {
        count: state.count + 1,
      };

    default:
      return state;
  }
};
