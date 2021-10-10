import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import uberhome from "../Images/uber.jpg";
import "../Styles/Home.css";

const Home = () => {
  const [location, setlocation] = useState("");
  const dispatch = useDispatch();
  const his = useHistory();

  const getLocation = (e) => {
    setlocation(e.target.value);
  };
  const passLocation = (e) => {
    dispatch({ type: "Location", payload: location });
    his.push("/getRestaurants");
  };

  return (
    <div>
      <div style={{ backgroundImage: `url(${uberhome})` }} className="bgm">
        <div class="wrap">
          <div class="search">
            <input
              type="text"
              class="searchTerm"
              placeholder="Search Location"
              onChange={getLocation}
            />
            <button type="submit" class="searchButton" onClick={passLocation}>
              search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
