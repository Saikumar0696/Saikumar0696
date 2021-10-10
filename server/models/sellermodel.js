let query = "";
const createseller = (connection, data, callback) => {
  query = "INSERT INTO restaurant_table SET ?";
  connection.query(query, [data], callback);
};
const fetchseller = (connection, email, callback) => {
  query = "SELECT * FROM restaurant_table where seller_email =?";
  connection.query(query, [email], callback);
};
const createdish = (connection, data, callback) => {
  query = "INSERT INTO Dishes SET ?";
  connection.query(query, [data], callback);
};
const fetchdish = (connection, rid, callback) => {
  query = "SELECT * FROM Dishes where restaurant_id=?";
  connection.query(query, [rid], callback);
};
const deletedish = (connection, dish_id, callback) => {
  query = "DELETE FROM Dishes where dish_id=?";
  connection.query(query, [dish_id], callback);
};
const updatedish = (connection, data, dish_id, callback) => {
  query = "UPDATE Dishes SET ? where ? ";
  connection.query(query, [data, { dish_id: dish_id }], callback);
};
const fetchorders = (connection, r_id, callback) => {
  query = "SELECT * from Orders where restaurant_id=?";
  connection.query(query, [r_id], callback);
};
const fetchcustomeranddish = (connection, data, callback) => {
  query =
    "select dish_name from Dishes where dish_id in (select dish_id from order_dishes where order_id=?) ;SELECT customer_name,customer_email from customer_table where customer_id=? ;";
  if (data.pickup == 1)
    query +=
      "select Pickup_received,Pickup_ready,PickUp_succesful from Pickup_status where O_ID=?";
  else
    query +=
      "select Delivery_received,Delivery_preparing,Delivery_delivered from Delivery_status where O_ID=?";
  connection.query(
    query,
    [data.order_id, data.customer_id, data.order_id],
    callback
  );
};

const changestatus = (
  connection,
  O_ID,
  R_ID,
  pickup,
  Pickup_ready,
  Pickup_succesful,
  delivery,
  Delivery_preparing,
  Delivery_delivered,
  callback
) => {
  if (pickup) {
    query = "UPDATE Pickup_status SET ? WHERE O_ID=?;";
    connection.query(
      query,
      [{ R_ID, Pickup_received: 0, Pickup_ready, Pickup_succesful }, O_ID],
      callback
    );
  } else if (delivery) {
    query = "UPDATE Delivery_status SET ? WHERE O_ID=?;";
    connection.query(
      query,
      [
        {
          R_ID,
          Delivery_received: 0,
          Delivery_preparing,
          Delivery_delivered,
        },
        O_ID,
      ],
      callback
    );
  }
};

module.exports = {
  createseller,
  fetchseller,
  createdish,
  fetchdish,
  deletedish,
  updatedish,
  fetchorders,
  fetchcustomeranddish,
  changestatus,
};
