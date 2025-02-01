import React, { useEffect, useState } from "react";


import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const App = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["admin"]);
  const [data, setData] = useState([]);
  const [scheme, setScheme] = useState(null);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const getAdminPortal = cookies.admin === true;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1002/sourabhJewellers/items",
        { params: { category } }
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchScheme = async () => {
    const response = await axios.get(
      "http://localhost:1002/luckydraw/getScheme"
    );
    setScheme(response.data);
  };

  const onChangeHandler = () => {
    alert("You want to move to admin panel");
    navigate("/admin");
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  useEffect(() => {
    fetchScheme();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
     

     
      <div className="luckydraw text-center my-12">
        <h1 className="text-4xl font-bold text-blue-500 animate-twinkle">
          Lucky Draw Scheme
        </h1>
        {loading ? (
          <div className="mt-4 text-lg text-gray-500">Loading...</div>
        ) : (
          scheme && (
            <img
              src={`http://localhost:1002/${scheme.image.url}`}
              alt="Lucky Draw Scheme"
              className="mx-auto mt-6 rounded-lg shadow-lg max-w-md"
            />
          )
        )}
      </div>

      {/* Category Filter Section */}
      <div className="flex justify-center mb-8 mt-10">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-amber-500 text-white px-6 py-3 rounded-full shadow-xl border-2 border-amber-600 focus:ring-4 focus:ring-amber-300 hover:bg-amber-400 transition duration-300 ease-in-out text-sm sm:text-base md:text-lg"
        >
          <option value="all">All Categories</option>
          <option value="rings">Rings</option>
          <option value="necklace">Necklace</option>
          <option value="ankelets">Ankelets</option>
          <option value="bangles">Bangles</option>
          <option value="chains">Chains</option>
          <option value="nose-pin">Nose Pin</option>
          <option value="earings">Earrings</option>
        </select>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-12">
        {loading ? (
          <div className="col-span-full text-center py-6 text-gray-500">
            Loading items...
          </div>
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105"
            >
              <img
                src={`http://localhost:1002/${item.image.url}`}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-gray-500 mt-2 text-sm">{item.description}</p>
                <p className="text-amber-500 font-bold text-lg mt-4">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-6 text-gray-500">
            No items found in this category.
          </div>
        )}
      </div>


      {getAdminPortal && (
        <div className="flex justify-center items-center my-4">
          <label
            htmlFor="admin"
            className="text-gray-800 font-medium text-lg mr-4"
          >
            Admin Portal
          </label>
          <input
            id="admin"
            onChange={onChangeHandler}
            type="checkbox"
            className="w-5 h-5 text-amber-500 focus:ring-amber-400 border-gray-300 rounded"
          />
        </div>
      )}

    </div>
  );
};

export default App;
