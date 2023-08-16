import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {id:0, name: "" };

export const mealSlice = createSlice({
  name: "meal",
  initialState: { value: initialStateValue },
  reducers: {
    food: (state, action) => {
      state.value = action.payload;
    },

  },
});

export const { food } = mealSlice.actions;

export default mealSlice.reducer;
