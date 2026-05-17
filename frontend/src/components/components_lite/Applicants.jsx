// Applicants.jsx

import React, { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";

import { toast } from "sonner";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const Applicants = () => {
  const { id } = useParams();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/${id}/getApplicants`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setApplicants(res.data.job.applications);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">
          Job <span className="text-[#6A38C2]">Applicants</span>
        </h1>

        <ApplicantsTable
          applicants={applicants}
          loading={loading}
          fetchApplicants={fetchApplicants}
        />
      </div>
    </div>
  );
};

export default Applicants;