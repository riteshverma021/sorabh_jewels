import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SchemUpload = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null); // Store the selected file
  const [previewURL, setPreviewURL] = useState(""); // For image preview

  const onChangeHandler = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Validate file type and size (e.g., max 5MB)
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Only JPEG, PNG, or GIF allowed.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB.");
        return;
      }

      // Update state with file and preview URL
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:1002/luckydraw/scheme",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setFile(null); // Reset file after successful upload
        setPreviewURL(""); // Clear preview URL
        navigate('/admin')
        console.log(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    // Cleanup preview URL when the component unmounts
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
          Upload Image
        </h2>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Upload Image
          </label>
          <input
            onChange={onChangeHandler}
            name="image"
            id="image"
            type="file"
            accept="image/*" // Only accept image files
            className="block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4 
            file:rounded-full file:border-0 
            file:text-sm file:font-semibold 
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />
        </div>
        {previewURL && (
          <div className="mb-4">
            <img
              src={previewURL}
              alt="Preview"
              className="w-full h-auto rounded-md border"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SchemUpload;
