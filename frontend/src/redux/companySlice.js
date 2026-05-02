import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    allCompanies: [],
    selectedCompany : null
  },
  reducers: {
    setCompanies: (state, action) => {
        console.log(action.payload);
        
      state.allCompanies = action.payload;
    },
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
  },
});

export const { setCompanies , setSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
