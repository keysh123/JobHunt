import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    selectedJob : null
  },
  reducers: {
    setJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
});

export const { setJobs , setSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
