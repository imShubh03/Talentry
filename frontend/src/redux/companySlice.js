import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null, // Initial state for a single company
        companies:[],
        searchCompanyByText:"",
    },
    reducers: {
        // Action to set a single company's data
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state, action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state, action) => {
            state.searchCompanyByText = action.payload
        }
    },
});

// Exporting the action for dispatching
export const { setSingleCompany , setCompanies, setSearchCompanyByText} = companySlice.actions;

// Exporting the reducer to integrate into the store
export default companySlice.reducer;
