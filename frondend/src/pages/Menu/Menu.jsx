import React, { useState } from 'react';
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import searchIcon from '../../assets/search_icon.png';
import "./Menu.css"; 

const Menu = () => {
  const [category, setCategory] = useState("All"); // Default category
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  return (
    <div className="menu-container">
      {/* Search Box */}
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Search foods..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
        <img src={searchIcon} alt="Search" className="search-icon" />
      </div>

      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchTerm={searchTerm} />
    </div>
  );
}

export default Menu;
