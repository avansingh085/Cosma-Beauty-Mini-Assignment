import React, { useState } from "react";
import apiClient from "../api/apiClient";

export default function EnquiryForm({ pkg, onClose }) {
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiClient.post("/enquiries", 
     
      { package_id: pkg.id, ...form },
    );
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="bg-white p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold text-green-600">Enquiry Submitted!</h2>
          <button
            onClick={onClose}
            className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg w-96 shadow">
        <h2 className="text-xl font-bold mb-4">Enquire: {pkg.package_name}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name"
            className="w-full border px-3 py-2 rounded"
            value={form.user_name}
            onChange={(e) => setForm({ ...form, user_name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full border px-3 py-2 rounded"
            value={form.user_email}
            onChange={(e) => setForm({ ...form, user_email: e.target.value })}
          />
          <textarea
            placeholder="Message"
            className="w-full border px-3 py-2 rounded"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-pink-600 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
