import React, { useEffect , useState } from "react";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/data";

const Description = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch(); 

  // useSingleJob(id); // fills Redux
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
    fetchJobDetails(); 
  }, [id]);
  const applyJobHandler = async () => {
    try{
      const res= await axios.post(`${APPLICATION_API_ENDPOINT}/apply/${id}`,{},{
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message)
        setIsApplied(true)
        const updateSingleJob = {...selectedJob, applications: [...selectedJob.applications, {applicant : user?._id}]}
        dispatch(setSelectedJob(updateSingleJob))
      }
    }
    catch(error){
      console.log(error);
      toast.error("Failed to apply for job");
    }
  }

  const { selectedJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  if (!selectedJob) return <p>Loading...</p>;

  const isInitiallyApplied = selectedJob.applications?.some(
    (app) => app.applicant === user?._id,
  );
 
  
  const [isApplied,setIsApplied] = useState(isInitiallyApplied)

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mb-2">{selectedJob.title}</h1>

          <p className="text-gray-500 mb-8">
            {selectedJob.company?.name} • {selectedJob.location} •{" "}
            {selectedJob.experience} yrs experience
          </p>

          {/* JOB INFO */}
          {/* JOB INFO */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Salary</p>
              <p className="font-semibold text-lg">₹{selectedJob.salary}</p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="font-semibold text-lg">{selectedJob.jobType}</p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Openings</p>
              <p className="font-semibold text-lg">{selectedJob.position}</p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Applicants</p>
              <p className="font-semibold text-lg">
                {selectedJob.applications?.length || 0}
              </p>
            </div>
          </div>

          {/* Posted Date */}
          <p className="text-sm text-gray-500 mb-8">
            {(() => {
              const daysAgo = Math.floor(
                (new Date() - new Date(selectedJob.createdAt)) /
                  (1000 * 60 * 60 * 24),
              );
              return daysAgo === 0
                ? "Posted today"
                : `Posted ${daysAgo} days ago`;
            })()}
          </p>

          {/* DESCRIPTION */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Job Description</h2>

            <p className="text-gray-600 leading-relaxed">
              {selectedJob.description}
            </p>
          </div>

          {/* REQUIREMENTS */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Requirements</h2>

            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              {selectedJob.requirements?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="border rounded-xl p-6 bg-white sticky top-20 shadow-sm">
            <Button
              disabled={isApplied}
              className={`w-full mb-6 ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#6A38C2] hover:bg-[#5b30a6]"
              }`}
              onClick = {applyJobHandler}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
            <p className="text-sm text-gray-500 text-center mb-4">
  {selectedJob.applications?.length || 0} people applied
</p>

            {/* COMPANY */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedJob.company?.logo}
                className="h-12 w-12 rounded-md border"
                alt=""
              />

              <div>
                <h3 className="font-semibold">{selectedJob.company?.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedJob.company?.location}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-5">
              {selectedJob.company?.description}
            </p>

            <a
              href={selectedJob.company?.website}
              className="text-sm font-medium text-[#6A38C2]"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
