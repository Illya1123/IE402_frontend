import React from "react";

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <div className="text-4xl text-green-500">{icon}</div>
      <div className="ml-4">
        <h4 className="text-sm font-semibold text-gray-600">{title}</h4>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
