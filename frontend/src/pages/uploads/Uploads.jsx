import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "rings",
  });

  const onChangeHandler = (e) => {
    let { name, value, files, type } = e.target;

    if (name === "image" && type === "file") {
      const selectedFile = files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setData({
          ...data,
          image: { url: URL.createObjectURL(selectedFile), filename: selectedFile.name },
        });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await axios.post("http://localhost:1002/items/addNew", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
     
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Upload Item
        </h1>
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              name="image"
              onChange={onChangeHandler}
              type="file"
              id="image"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <input
                onChange={onChangeHandler}
                value={data.name}
                name="name"
                type="text"
                id="name"
                placeholder="Enter Item Name"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                onChange={onChangeHandler}
                value={data.price}
                name="price"
                type="number"
                id="price"
                placeholder="Enter price"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              id="description"
              placeholder="Enter description"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Item Category
            </label>
            <select
              onChange={onChangeHandler}
              name="category"
              id="category"
              value={data.category}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="rings">Rings</option>
              <option value="necklace">Necklace</option>
              <option value="ankelets">Ankelets</option>
              <option value="bangles">Bangles</option>
              <option value="chains">Chains</option>
              <option value="nose-pin">Nose Pin</option>
              <option value="earings">Earrings</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition"
            >
              Upload Item
            </button>
          </div>
        </form>
        <div className="flex justify-between">
  <Link to="/listItem">
    <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
      View Items List
    </button>
  </Link>
  
  <Link to="/luckydraw/scheme">
    <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
      Upload Lucky Draw Scheme
    </button>
  </Link>
</div>

        
      </div>
     
    </div>
  );
};

export default Upload;
