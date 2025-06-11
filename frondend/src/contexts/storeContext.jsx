import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'; 

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] === 1) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId] -= 1;
      }
      return updatedCart;
    });

    if (token) {
      try {
        await axios.delete(`${url}/api/cart/remove`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { itemId },
        });
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = foodList.find((f) => f._id === itemId);
      if (item) {
        totalAmount += item.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartData = async (userToken) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");
      if (storedToken) {
        setToken(storedToken);
        setUserId(storedUserId);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    userId,
    setUserId,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {loading ? (
        <div>Loading food list...</div>
      ) : (
        props.children
      )}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
