import React, { useState } from "react";
import "../App.css";
import useInput from "../hooks/useInput";
import { area , category } from '../utlity';
import { useDispatch } from "react-redux";
import { addShop } from "../store/shopSlice";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Shop = () => {
  
  const dispatch = useDispatch();

  const [formValidity, setFormValidity] = useState(true);

  const shopNameValidator = (value) => {
    if (value.trim() !== "" && value.trim().match(/^[a-zA-Z\s]+$/)) return true;
    return false;
  };

  const shopClosingDateValidator = (value) => {
    let openingDate = new Date(shopOpeningDate);
    let closingDate = new Date(value);

    if (value == "") return false;
    if (closingDate.getTime() < openingDate.getTime()) return false;
    return true;
  };

  const {
    value: shopName,
    valueIsValid: shopNameIsValid,
    hasError: shopNameHasError,
    valueChangeHandler: shopNameChangeHandler,
    inputBlurHandler: shopNameBlurhandler,
    reset: resetShopName,
  } = useInput(shopNameValidator, "");

  const {
    value: shopArea,
    valueIsValid: shopAreaIsValid,
    hasError: shopAreaHasError,
    valueChangeHandler: shopAreaChangeHandler,
    inputBlurHandler: shopAreaBlurHandler,
    reset: resetShopArea,
  } = useInput((value) => value.trim() !== "Select Area", "Select Area");

  const {
    value: shopCategory,
    valueIsValid: shopCategoryIsValid,
    hasError: shopCategoryHasError,
    valueChangeHandler: shopCategoryChangeHandler,
    inputBlurHandler: shopCategoryBlurHandler,
    reset: resetShopCategory,
  } = useInput(
    (value) => value.trim() !== "Select Category",
    "Select Category"
  );

  const {
    value: shopOpeningDate,
    valueIsValid: shopOpeningDateIsValid,
    hasError: shopOpeningDateHasError,
    valueChangeHandler: shopOpeningDateChangeHandler,
    inputBlurHandler: shopOpeningDateBlurHandler,
    reset: resetshopOpeningDate,
  } = useInput((value) => value.trim() !== "", "");

  const {
    value: shopClosingDate,
    valueIsValid: shopClosingDateIsValid,
    hasError: shopClosingDateHasError,
    valueChangeHandler: shopClosingDateChangeHandler,
    inputBlurHandler: shopClosingDateBlurHandler,
    reset: resetshopClosingDate,
  } = useInput(shopClosingDateValidator, "");

  let formisValid =
    shopNameIsValid &&
    shopAreaIsValid &&
    shopCategoryIsValid &&
    shopOpeningDateIsValid &&
    shopClosingDateIsValid;

  const formInputHandler = (event) => {
    event.preventDefault();
    if (!formisValid) {
      setFormValidity(false);
      return;
    }

    dispatch(addShop({
      shopName,
      shopArea,
      shopCategory,
      shopOpeningDate,
      shopClosingDate
    }));

    toast.success("Shop Added Successfully",{theme : "colored"});

    setFormValidity(true);
    resetShopName();
    resetShopArea();
    resetShopCategory();
    resetshopOpeningDate();
    resetshopClosingDate();
  };

  return (
    <form onSubmit={formInputHandler}>
      <p className="h5 mt-4" >Add new Shop</p>
      <div className="form-group mt-4">
        <label className="h5">Shop Name</label>
        <input
          type="text"
          value={shopName}
          onChange={shopNameChangeHandler}
          onBlur={shopNameBlurhandler}
          className="form-control w-50 mt-2"
        />
        {shopNameHasError && (
          <p className="h6 text-danger">
            shop name is either empty or contains numeric values
          </p>
        )}
      </div>

      <div className="form-group mt-4">
        <label className="h5">Select Area:</label>
        <select
          className="form-control w-50 mt-2"
          value={shopArea}
          onChange={shopAreaChangeHandler}
          onBlur={shopAreaBlurHandler}
        >
          <option>Select Area</option>
          {area.map((area) => (
            <option key={area}>{area}</option>
          ))}
        </select>
        {shopAreaHasError && (
          <p className="h6 text-danger">shop area is required</p>
        )}
      </div>

      <div className="form-group mt-4">
        <label className="h5">Select Category:</label>
        <select
          className="form-control w-50 mt-2"
          value={shopCategory}
          onChange={shopCategoryChangeHandler}
          onBlur={shopCategoryBlurHandler}
        >
          <option>Select Category</option>
          {category.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        {shopCategoryHasError && (
          <p className="h6 text-danger">shop category is required</p>
        )}
      </div>

      <div className="form-group mt-4">
        <label className="h5">Opening Date</label>
        <input
          className="form-control w-50 mt-2"
          type="date"
          value={shopOpeningDate}
          onChange={shopOpeningDateChangeHandler}
          onBlur={shopOpeningDateBlurHandler}
        />
        {shopOpeningDateHasError && (
          <p className="h6 text-danger">shop opening date is required</p>
        )}
      </div>

      <div className="form-group mt-4">
        <label className="h5">Closing Date</label>
        <input
          className="form-control w-50 mt-2"
          type="date"
          value={shopClosingDate}
          onChange={shopClosingDateChangeHandler}
          onBlur={shopClosingDateBlurHandler}
        />
        {shopClosingDateHasError && (
          <p className="h6 text-danger">
            either shop closing date is empty or it is before opening date{" "}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-dark mt-4 mb-4">
        Add Shop
      </button>
      {!formValidity && <p className="h6 text-danger mt-2">All fields should be filled</p>}
    </form>
  );
};

export default Shop;
