import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_ENDPOINT } from '@/utils/data';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';

const useGetAllCompanies = () => {
   const dispatch = useDispatch();
  useEffect(() => {
    console.log("HII");
    
    const fetchAllCompanies = async () => {
      try {
        const result = await axios.get(`${COMPANY_API_ENDPOINT}/getCompany`, {
          withCredentials: true,
        });
        if (result.data.success) {
            console.log(result.data);
            
          dispatch(setCompanies(result.data.companies));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch companies");
      }
    };
    fetchAllCompanies()
  }, [dispatch]);
}

export default useGetAllCompanies