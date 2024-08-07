import React, { useState, useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
// import axios from "axios";


const FoodDisplay = ({ category }) => {

    const { url, food_list } = useContext(StoreContext);
  //   const [list, setList] = useState([]);

  // const fetchList = async () => {
  //   const response = await axios.get(`${url}/api/food/list`);
  //   if (response.data.success) {
  //     setList(response.data.data);
  //   } else {
  //     toast.error("Error");
  //   }
  // };

  // useEffect(()=>{
  //   fetchList();
  // },[])
  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
