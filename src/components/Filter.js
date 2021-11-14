import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import '../App.css';
import { area , category } from '../utlity';

const Filter = ({shopData,setShopData}) => {

  const shops = useSelector((state) => state.shops);


  const [selectedArea,setSelectedArea] = useState('');
  const [selectedCategory,setSelectedCategory] = useState('');

  const areaChangeHandler = (event) =>{
      setSelectedArea(event.target.value);
      if(event.target.value === 'Select Area'){
            setShopData(shops);
      }else{
        const newShopData = shops.filter(shop => {
          console.log(shop.shopArea+"  "+event.target.value);
          return shop.shopArea === event.target.value
        });
        setShopData(newShopData);
      }
      setSelectedCategory('');
  }

  const categoryChangeHandler = (event) =>{
    setSelectedCategory(event.target.value);
    if(event.target.value === 'Select Category'){
          setShopData(shops);
    }else{
      const newShopData = shops.filter(shop => {
        console.log(shop.shopCategory+"  "+event.target.value);
        return shop.shopCategory === event.target.value
      });
      setShopData(newShopData);
    }
    setSelectedArea('');
  }

  const checkBoxHandler = (event) =>{
      console.log(event.target.checked);

      const todayDate = new Date().getTime();
      if(event.target.checked){
        const newShopData = shops.filter(shop => {
          let openingTime = new Date(shop.shopOpeningDate).getTime();
          let closingTime = new Date(shop.shopClosingDate).getTime();
            if(todayDate >= openingTime && todayDate <=closingTime) return true;
            return false;
        });
        setShopData(newShopData);
        console.log({newShopData});
      }else{
        setShopData(shops);
      }

      setSelectedCategory('');
      setSelectedArea('');

  }

    return (
        <div className="filter_container p-4 ">
            <h4>Filter Shops by:</h4>
            
            <div className="form-group mt-4">
        <label className="h5">Select Area:</label>
        <select
          className="form-control w-75 mt-2"
          value={selectedArea}
          onChange={areaChangeHandler}
        >
          <option>Select Area</option>
          {area.map((area) => (
            <option key={area}>{area}</option>
          ))}
        </select>
      </div>
            
            <div className="form-group mt-4">
        <label className="h5">Select Category:</label>
        <select
          className="form-control w-75 mt-2"
          value={selectedCategory}
          onChange={categoryChangeHandler}
        >
          <option>Select Category</option>
          {category.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      <div class="form-check mt-4">
  <input class="form-check-input" type="checkbox" onClick={checkBoxHandler} />
  <label class="form-check-label">
    <p className="h6">Open Now</p>
  </label>
</div>

       </div>
       
    )
}

export default Filter
