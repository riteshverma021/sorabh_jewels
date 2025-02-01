import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [fetchData, setFetchData] = useState({
    name: '',
    description: '',
    price: '',
    image: { url: '', filename: '' }, // Ensure image has a default structure
    category: '',
  });

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(`http://localhost:1002/items/${id}/edit`, {
          withCredentials: true,
        });
        setFetchData(response.data);
        console.log('Item fetched successfully');
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };
    fetchedData();
  }, [id]);

  const onChangeHandler = (e) => {
    let { name, type, files, value } = e.target;
    if (name === 'image' && type === 'file') {
      const selectedFile = files[0];
      setFile(selectedFile); // Save the new file
      setFetchData({
        ...fetchData,
        image: {
          url: URL.createObjectURL(selectedFile), // Preview the new image
          filename: selectedFile.name,
        },
      });
    } else {
      setFetchData({ ...fetchData, [name]: value });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('name', fetchData.name);
    formData.append('description', fetchData.description);
    formData.append('price', fetchData.price);
    formData.append('category', fetchData.category);

    // If a new file is selected, append it to formData
    if (file) {
      formData.append('image', file);
    } else {
      // Append the existing image URL and filename separately
      formData.append('imageUrl', fetchData.image.url);
      formData.append('imageFilename', fetchData.image.filename);
    }

    try {
      const response = await axios.put(`http://localhost:1002/items/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/listItem');
      }
    } catch (error) {
      toast.error('Error updating item');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Item
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
            {fetchData.image.url && (
              <img src={fetchData.image.url} alt="Selected Preview" className="mt-2 w-32 h-32 object-cover" />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <input
                onChange={onChangeHandler}
                value={fetchData.name}
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
                value={fetchData.price}
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
              value={fetchData.description}
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
              value={fetchData.category}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="rings">Rings</option>
              <option value="necklace">Necklace</option>
              <option value="anklets">Anklets</option>
              <option value="bangles">Bangles</option>
              <option value="chains">Chains</option>
              <option value="nose-pin">Nose Pin</option>
              <option value="earrings">Earrings</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
