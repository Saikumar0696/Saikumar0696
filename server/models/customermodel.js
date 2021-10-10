let query = "";
const createcustomer = (connection, data, callback) => {
  query = "INSERT INTO customer_table SET ?";
  connection.query(query, [data], callback);
};
const fetchcustomer = (connection, email, callback) => {
  query = "SELECT * FROM customer_table where customer_email =?";
  connection.query(query, [email], callback);
};
const getdishes = (connection, rid, callback) => {
  query = "SELECT * from Dishes where Restaurant_id =?";
  connection.query(query, [rid], callback);
};
const createorder = (connection, data, callback) => {
  query = "INSERT INTO Orders SET ?";
  connection.query(query, [data], callback);
};
const getorder = (connection, data, callback) => {
  query = "SELECT * from Orders where customer_id=? ";

  connection.query(query, [data], callback);
};
const getrestaurantanddish = (connection, data, callback) => {
  query =
    "select dish_name,dish_price from Dishes where dish_id in (select dish_id from order_dishes where order_id=?);SELECT restaurant_name from restaurant_table where restaurant_id=? ; ";
  if (data.pickup == 1)
    query +=
      "select Pickup_received,Pickup_ready,PickUp_succesful from Pickup_status where O_ID=?";
  else
    query +=
      "select Delivery_received,Delivery_preparing,Delivery_delivered from Delivery_status where O_ID=?";

  connection.query(
    query,
    [data.order_id, data.restaurant_id, data.order_id],
    callback
  );
};
const getaddr = (connection, data, callback) => {
  query = "SELECT * from customer_address where c_id=? ";
  connection.query(query, [data], callback);
};
const addaddr = (connection, data, callback) => {
  console.log(data);
  query = "INSERT INTO customer_address SET ? ";
  connection.query(query, [data], callback);
};
const dishestoorder = (connection, data, callback) => {
  query = "INSERT INTO order_dishes SET ? ";
  connection.query(query, [data], callback);
};
const createstatus = (connection, O_ID, pickup, R_ID, callback) => {
  if (pickup == 1) {
    let data = { O_ID, Pickup_received: 1, R_ID };
    query = "INSERT INTO Pickup_status  SET ? ";
    connection.query(query, [data], callback);
  } else {
    let data = { O_ID, Delivery_received: 1, R_ID };
    query = "INSERT INTO Delivery_status SET ? ";
    connection.query(query, [data], callback);
  }
};

const createcustomerimage = (
  connection,
  customer_profile,
  customer_id,
  callback
) => {
  query = "UPDATE customer_table SET ? where customer_id=? ";
  connection.query(query, [{ customer_profile }, customer_id], callback);
};

module.exports = {
  createcustomer,
  fetchcustomer,
  getdishes,
  createorder,
  getorder,
  getrestaurantanddish,
  getaddr,
  addaddr,
  dishestoorder,
  createstatus,
  createcustomerimage,
};
