import React, { useState } from 'react'; // import React and useState hook
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios'; // for making HTTP requests
import { toast } from 'react-toastify'; // for toast notifications

const Add = ({url}) => {
  

  const [image, setImage] = useState(null); //  for file handling

  const [data, setData] = useState({  // store data 
    name: "",
    description: "",
    price: "",
    category: "BBQ & Grill",
  
  });

  const onChangeHandler = (event) => {  // for input handling
    // Destructure name and value from event.target
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {  // form submission
    // Prevent default form submission behavior
    event.preventDefault();

    if (!data.name || !data.description || !data.price ||  !image) {  // check if all fields are filled
      // Show error message if any field is empty
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData(); // create a new FormData object
    // Append form data to the FormData object
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price)); // convert price to number
    formData.append("category", data.category);

    // Append image file to the FormData object
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData); // send a POST request to the server
      if (response.data.success) {
        // Reset form after successful submission
        setData({
          name: "",
          description: "",
          price: "",
          category: "BBQ & Grill", // default category
     
        });
        setImage(null); // Reset image to null
        // Show success message
        toast.success("Food item added successfully!");
      } else {
        toast.error("Failed to add food item. Please try again."); // from ract toastify
      }
    } catch (error) {
      console.error("Error uploading food item:", error); // log error to console
      alert("Error uploading food item!");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}> 
        <div className="add-img-upload flex-col">
     
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area} // show image preview if image is selected
              alt='Upload Preview'
              style={{ cursor: 'pointer' }}
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])} // set image when file is selected
            type='file'
            id='image'
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">  
         
          <input
            onChange={onChangeHandler} // handle input change
            value={data.name}
            type='text'
            name='name'
            placeholder='Enter Food Name'
            required
          />
        </div>

        <div className="add-product-description flex-col">
       
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows='2'
            placeholder='Write food description here'
            required
          ></textarea>
        </div>

        

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Food Category</p>
            <select name='category' value={data.category} onChange={onChangeHandler}>
              <option value="BBQ & Grill">BBQ & Grill</option>
              <option value="Burger">Burger</option>
              <option value="Pasta">Pasta</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Pizza">Pizza</option>
              <option value="Rice & Noodles">Rice & Noodles</option>
              <option value="Healthy & Salads">Healthy & Salads</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div> 

          <div className="add-price flex-col">
            <p>Food Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              placeholder='LKR.1000'
              required
            />
          </div>
        </div>

        <button type='submit' className='add-button'>Add</button> 
      </form>
    </div>
  );
};

export default Add;
