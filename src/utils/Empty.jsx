/* eslint-disable react/prop-types */

import { AiOutlineSmile } from "react-icons/ai"; // You can use any icon here, like Ant Design's Empty icon.

const Empty = ({ description = "No data available", className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 py-52 rounded-lg ${className}`}
    >
      <AiOutlineSmile className="text-4xl text-gray-400" />
      <p className="mt-4 text-gray-500">{description}</p>
    </div>
  );
};

export default Empty;
