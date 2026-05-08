import { setJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAllJobs = () => {
  const {user} = useSelector((store)=>store.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      if(user.role === "recruiter"){
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
    }
    else{
       try {
        const result = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, {
          withCredentials: true,
        });
        if (result.data.success) {
          dispatch(setJobs(result.data.jobs));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch jobs");
      }
    }
    };
    fetchAllJobs()
  }, []);
};

export default useGetAllJobs;
