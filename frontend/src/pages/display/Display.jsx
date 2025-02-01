import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Display = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1002/items/main")
      setData(response.data);
      console.log(response.data); // Debugging: Log the entire data array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    
    
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:1002/items/${id}`, {
        withCredentials: true,
      });
      setData((prev) => prev.filter((item) => item._id !== id)); // Correctly filter the array
      toast.success("Item deleted successfully");
      navigate("/listItem");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Add New Button */}
     
      <div className="flex justify-end mb-6">
        <button
          className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300"
          onClick={()=>navigate('/admin')}
        >
          Add New
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
        All Items List
      </h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full bg-white border rounded-lg shadow-md">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 bg-gray-100 text-gray-800 text-left font-semibold p-4 border-b">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Action</span>
            <span>Delete</span>
          </div>

          {/* Table Rows */}
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 items-center p-4 hover:bg-gray-50 transition duration-200 border-b"
              >
             
                <img
                  src={`http://localhost:1002/${item.image.url}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
               
                <p className="truncate text-gray-700">{item.name}</p>
                <p className="truncate text-gray-500">{item.category}</p>
                <p className="text-green-600 font-semibold">₹{item.price}</p>
                {/* Edit Link */}
                <Link
                  to={`/items/${item._id}/edit`}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Edit
                </Link>
                {/* Delete Action */}
                <button
                  className="text-red-500 hover:underline font-medium"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500">
              No items found. Please add new items.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Display;
