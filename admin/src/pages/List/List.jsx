import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [foodList, setFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all food items from the backend
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log('Response data:', response.data);

      if (response.data.success) {
        setFoodList(response.data.data);
        setFilteredFoodList(response.data.data); // Initialize filtered list
      } else {
        toast.error('Failed to fetch food list!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while fetching food list!');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Food item deleted successfully");
        fetchList(); // Refresh list after deletion
      } else {
        toast.error("Failed to delete food item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting food item");
    }
  };

  // Filter the food list when the searchTerm changes
  useEffect(() => {
    const filtered = foodList.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFoodList(filtered);
  }, [searchTerm, foodList]);

  useEffect(() => {
    fetchList(); // Fetch food list on mount
  }, []);

  return (
    <div className="list-add flex-col">

      {/* Search bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search food by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
        
          <b>Action</b>
        </div>

        {Array.isArray(filteredFoodList) && filteredFoodList.map((item, index) => (
          <div className="list-table-format" key={index}>
            <img
              src={`${url}${item.image}`}
              alt={item.name}
          
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs. {item.price}</p>
       
            <p onClick={() => removeFood(item._id)} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
