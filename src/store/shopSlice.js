import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    shopName: "ABC",
    shopArea: "Pune",
    shopCategory: "Butcher",
    shopOpeningDate: "2021-11-10",
    shopClosingDate: "2021-11-25",
  },
  {
    id: 2,
    shopName: "DEF",
    shopArea: "Thane",
    shopCategory: "Baker",
    shopOpeningDate: "2021-11-19",
    shopClosingDate: "2021-11-29",
  },
];

const shopSlice = createSlice({
  name: "shop",
  initialState: initialState,
  reducers: {
    addShop(state, action) {
      const newShop = {
        id: Date.now(),
        shopName: action.payload.shopName,
        shopArea: action.payload.shopArea,
        shopCategory: action.payload.shopCategory,
        shopOpeningDate: action.payload.shopOpeningDate,
        shopClosingDate: action.payload.shopClosingDate,
      };

      state.push(newShop);
    },
    deleteShop(state,action){
        return state.filter(shop => shop.id !== action.payload.id);
    }
  },
});

export const { addShop , deleteShop } = shopSlice.actions;

export default shopSlice.reducer;
