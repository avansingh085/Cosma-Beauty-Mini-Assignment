import React from "react";

export default function PackageList({ packages, onSelect }) {
  if (!packages.length) return null;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Packages</h2>
      <div className="grid gap-4">
        {packages.map((p) => (
          <div
            key={p.id}
            className="border p-3 rounded-lg hover:shadow cursor-pointer"
            onClick={() => onSelect(p)}
          >
            <h3 className="font-bold">{p.package_name}</h3>
            <p className="text-sm text-gray-600">{p.clinic_name}</p>
            <p className="text-pink-600 font-semibold">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
