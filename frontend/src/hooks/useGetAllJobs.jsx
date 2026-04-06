import { setJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const result = await axios.get(`${JOB_API_ENDPOINT}/getAllJobs`, {
          withCredentials: true,
        });
        if (result.data.success) {
          dispatch(setJobs(result.data.jobs));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch jobs");
      }
    };
    fetchAllJobs()
  }, []);
};

export default useGetAllJobs;
