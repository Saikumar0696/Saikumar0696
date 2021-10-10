const fetchrestaurant = (connection, location, callback) => {
  query =
    "SELECT Restaurant_id,restaurant_name,description,contact_info,image,pickup,delivery FROM restaurant_table where location =?";
  connection.query(query, [location], callback);
};
const insertfavourites = (connection, c_id, R_id, callback) => {
  query = "INSERT INTO Favourites SET ?";
  console.log(c_id, R_id);
  connection.query(query, [{ c_id, R_id }], callback);
};

const fetchfavourites = (connection, cid, callback) => {
  query =
    "SELECT Restaurant_id,restaurant_name,image,pickup,delivery FROM restaurant_table where Restaurant_id in(select R_ID FROM Favourites where c_id=?)";
  connection.query(query, [cid], callback);
};
module.exports = {
  fetchrestaurant,
  insertfavourites,
  fetchfavourites,
};
