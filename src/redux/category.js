import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { id: null, cat:"" };

export const categorySlice = createSlice({
  name: "category",
  initialState: { value: initialStateValue },
  reducers: {
    selectedCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
