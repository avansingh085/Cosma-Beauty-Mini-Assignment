// frontend/src/components/AdminEnquiryList.jsx
import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export default function AdminEnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiClient.get("/admin/enquiries");
        setEnquiries(res.data);
      } catch (err) {
        console.error("Error fetching enquiries:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading enquiries...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Enquiries</h2>
      {enquiries.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Clinic</th>
              <th className="border px-4 py-2">Package</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id}>
                <td className="border px-4 py-2">{e.user_name}</td>
                <td className="border px-4 py-2">{e.user_email}</td>
                <td className="border px-4 py-2">{e.clinic_name}</td>
                <td className="border px-4 py-2">{e.package_name}</td>
                <td className="border px-4 py-2">{e.message}</td>
                <td className="border px-4 py-2">
                  {new Date(e.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
