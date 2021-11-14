import React from "react";
import "../App.css";
import { deleteShop } from "../store/shopSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const ShopList = ({
  id,
  shopName,
  shopArea,
  shopCategory,
  shopOpeningDate,
  shopClosingDate,
}) => {

  const dispatch = useDispatch();
  const deleteShopHandler = () =>{
      dispatch(deleteShop({id : id}));
      toast.error("Shop deleted",{theme : "colored"});
  }

  return (
    <div className="card text-center mt-4 mb-4 shoplist_container">
      <div className="card-header">
      <p className="h6">{shopOpeningDate} To {shopClosingDate}</p>
     </div>
      <div className="card-body">
        <h5 className="card-title">{shopName}</h5>
        <p className="card-text">
          <i className="fa fa-bookmark pb-1"> {shopCategory}</i>
          <br />
          <i className="fa fa-location-arrow pb-1"> {shopArea}</i>
        </p>
        <button className="btn btn-danger" onClick={deleteShopHandler}>Delete</button>
      </div>
    </div>
  );
};

export default ShopList;
