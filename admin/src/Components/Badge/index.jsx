import React from "react";

const Badge = (props) => {
  return (
    <span className={`inline-flex items-center justify-center gap-1 py-1 px-4 rounded-full text-[11px] capitalize  ${props.status === "pending" && 'bg-[#FFA500] text-white'} 
     ${props.status === "confirm" && 'bg-[#007BFF] text-white'}  ${props.status === "delivered" && 'bg-[#4CAF50] text-white'}  ${props.status === "success" && 'bg-[#28A745] text-white'}

      ${props.status === "failed" && 'bg-[#DC3545] text-white'} ${props.status === "cancel" && 'bg-[#A0A0A0] text-white'}
    `}>
        {props.status}
    </span>
  );
};

export default Badge;
