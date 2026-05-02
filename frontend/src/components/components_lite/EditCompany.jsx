import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const EditCompany = () => {
  const { selectedCompany } = useSelector((state) => state.company);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  const [preview, setPreview] = useState(null); // ✅ for image preview
  const [loading, setLoading] = useState(false);

  // ✅ Prefill form + existing logo preview
  useEffect(() => {
    if (selectedCompany) {
      setForm({
        name: selectedCompany.name || "",
        description: selectedCompany.description || "",
        website: selectedCompany.website || "",
        location: selectedCompany.location || "",
        logo: null,
      });

      setPreview(selectedCompany.logo); // ✅ show existing logo
    }
  }, [selectedCompany]);

  // ✅ Clean up preview URL (avoid memory leak)
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      const file = files[0];
      setForm({ ...form, logo: file });

      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl); // ✅ instant preview
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      return toast.error("Company name is required");
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("website", form.website);
    formData.append("location", form.location);

    if (form.logo) {
      formData.append("file", form.logo); // ✅ backend expects "file"
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Company updated successfully");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white border rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-6">
          Edit <span className="text-[#6A38C2]">Company</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <Label className="mb-2">Company Name *</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="mb-2">Description</Label>
            <Input
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="mb-2">Website</Label>
            <Input
              name="website"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label className="mb-2">Location</Label>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          {/* ✅ Logo Upload + Preview */}
          <div>
            <Label className="mb-2">Logo</Label>
            <Input type="file" name="logo" onChange={handleChange} />

            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <img
                  src={preview}
                  alt="logo preview"
                  className="h-16 w-16 object-contain border rounded-md"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Company"}
          </Button>

        </form>
      </div>
    </section>
  );
};

export default EditCompany;