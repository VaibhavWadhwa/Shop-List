import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Shop from './components/Shop'
import ShopList from './components/ShopList';
import './App.css';
import { useSelector } from 'react-redux';

const App = () => {

    const shops = useSelector((state) => state.shops);

    const [shopData,setShopData] = useState(shops);

    useEffect( () => setShopData(shops) , [shops]);

    return (
        <>
        <div className="row">
            <div className="col-5">
                <Filter
                shopData={shopData}
                setShopData={setShopData}
                 />
            </div>
            <div className="col-7">
                <Shop />
            </div>
        </div>
        
        <div className="container text-center mt-4">
            <p className="h5 mt-4">Shop List</p>
            {shopData.length > 0?shopData.map(shop => (
                <ShopList
                id={shop.id}
                shopName={shop.shopName}
                shopArea={shop.shopArea}
                shopCategory={shop.shopCategory}
                shopOpeningDate={shop.shopOpeningDate}
                shopClosingDate={shop.shopClosingDate}
                />
            ) ) : <p className="h5 mt-4">No Shops Found!!</p>} 
        </div>
        </>
    )
}

export default App
