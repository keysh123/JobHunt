import { setSelectedJob } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/data';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const useSingleJob = (id) => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const result = await axios.get(`${JOB_API_ENDPOINT}/getJob/${id}`, {
          withCredentials: true,
        });
        console.log(result);
        
        if (result.data.success) {
          dispatch(setSelectedJob(result.data.job));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch job");
      }
    };
    fetchJobDetails()
  }, []);

}

export default useSingleJob