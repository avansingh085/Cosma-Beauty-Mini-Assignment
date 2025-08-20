import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import TreatmentList from "./components/TreatmentList";
import PackageList from "./components/PackageList";
import EnquiryForm from "./components/EnquiryForm";
// Keep admin list separate, don’t mix with user flow
import AdminEnquiryList from "./components/adminEnquiries";

export default function App() {
  const [data, setData] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-pink-600">💎 Cosma Beauty</h1>

      {/* Search box always visible */}
      <SearchBox onResult={setData} />

      {/* Toggle for admin view (optional) */}
      <button
        onClick={() => setShowAdmin((p) => !p)}
        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600"
      >
        {showAdmin ? "Back to User View" : "Admin View"}
      </button>

      {/* Admin Section */}
      {showAdmin && (
        <div className="w-full max-w-4xl mt-6">
          <AdminEnquiryList />
        </div>
      )}

      {/* User Flow */}
      {!showAdmin && data && (
        <div className="w-full max-w-3xl mt-6 space-y-6">
          <TreatmentList treatments={data.treatments} />
          <PackageList packages={data.packages} onSelect={setSelectedPackage} />
        </div>
      )}

      {/* Enquiry form as a bottom sheet */}
      {selectedPackage && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
          <EnquiryForm
            pkg={selectedPackage}
            onClose={() => setSelectedPackage(null)}
          />
        </div>
      )}
    </div>
  );
}
