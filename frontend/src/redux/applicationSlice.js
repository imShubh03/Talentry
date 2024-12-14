import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",

    initialState: {
        applicants: [], // Stores the list of applicants
    },

    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload; // Updates the `applicants` array with new data
        },
    },
});

// Exporting the actions
export const { setAllApplicants } = applicationSlice.actions;

// Exporting the reducer
export default applicationSlice.reducer;
