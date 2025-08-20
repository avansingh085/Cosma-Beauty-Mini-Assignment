import React from "react";

export default function TreatmentList({ treatments }) {
  if (!treatments.length) return null;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Treatments</h2>
      <ul className="list-disc pl-6">
        {treatments.map((t) => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>
    </div>
  );
}
