import React, { useState } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";
export default function SearchBox({ onResult }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try{
   const res = await apiClient.get(`/search?concern=${query}`);
    onResult(res.data);
    }
    catch(err){
        console.log(err,"error during fetch search");
    }
    
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search concern (e.g. Acne, Hair Loss)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-2 border rounded-lg w-64"
      />
      <button
        onClick={handleSearch}
        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
      >
        Search
      </button>
    </div>
  );
}
