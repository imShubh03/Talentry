import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [], // Holds all job-related data
        singleJob:null
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload; // Updates the allJobs state
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        }
    },
});

export const { setAllJobs, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;
