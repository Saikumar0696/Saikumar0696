import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  restaurantReducer,
  locationReducer,
} from "./reducers/getRestaurantReducer";
import {
  sellerloginreducer,
  dishesreducer,
  createdishreducer,
  editdishreducer,
  regrestaurantreducer,
  getsellerorderreducer,
  changestatusreducer,
} from "./reducers/SellerReducer";

import {
  cartreducer,
  customerloginreducer,
  customersignupreducer,
  customeraddrreducer,
  orderreducer,
  getorderreducer,
  countreducer,
} from "./reducers/CustomerReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  restaurantReducer,
  locationReducer,
  sellerloginreducer,
  dishesreducer,
  createdishreducer,
  editdishreducer,
  cartreducer,
  customerloginreducer,
  customersignupreducer,
  regrestaurantreducer,
  customeraddrreducer,
  orderreducer,
  getorderreducer,
  getsellerorderreducer,
  changestatusreducer,
  countreducer,
});

const getsellertoken = sessionStorage.getItem("token") || null;

const intialState = {
  sellerloginreducer: {
    token: getsellertoken,
    restaurant_id: sessionStorage.getItem("rid") || null,
    issellerloggedin: sessionStorage.getItem("loggedin") || false,
    error: false,
  },
  customerloginreducer: {
    token: sessionStorage.getItem("customer_token") || null,
    customer_id: sessionStorage.getItem("cid") || null,
    iscustomerloggedin: sessionStorage.getItem("iscustomerloggedin") || false,
    customer_name: sessionStorage.getItem("customer_name") || null,
    customer_profile: sessionStorage.getItem("customer_profile") || null,

    error: false,
  },
  customeraddrreducer: {
    addr: JSON.parse(sessionStorage.getItem("address")) || [],
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
