import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../contexts/storeContext';
import FoodItem from '../FoodItems/FoodItem';

const FoodDisplay = ({ category = "All", searchTerm = "" }) => {
  const { foodList } = useContext(StoreContext);

  const categoryLower = category ? category.toLowerCase() : "all";
  const searchLower = searchTerm ? searchTerm.toLowerCase() : "";

  const filteredFoods = foodList.filter((item) => {
    const itemCategory = item.category ? item.category.toLowerCase() : "";
    const itemName = item.name ? item.name.toLowerCase() : "";
    return (categoryLower === "all" || categoryLower === itemCategory) &&
           itemName.includes(searchLower);
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>Order now & enjoy deliciousness at your doorstep!</h2>
      <div className="food-display-list">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((item) => (
            <FoodItem 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
        
              image={item.image} 
            />
          ))
        ) : (
          <p className="no-results">No matching foods found.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
