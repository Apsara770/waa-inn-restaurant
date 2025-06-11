import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import FeatureSection from "../../components/FeatureSection/FeatureSection";




const Home = () => {

  const[category , setCategory] = useState ("All");
  return (
    <div>
      <Header />
      <FeatureSection/>
   
    </div>
    
  );
};

export default Home;
