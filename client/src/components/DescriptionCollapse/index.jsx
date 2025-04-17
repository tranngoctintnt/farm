import { Button } from "antd";
import { useState } from "react";

export default function DescriptionCollapse({ html }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full  p-4 sm:p-5 mt-5">

      <div
        className={`transition-all relative overflow-hidden ${
          expanded ? "max-h-full" : "max-h-[150px]"
        }`}
      >
        <div
          className="text-[0.95rem] leading-relaxed text-justify"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Gradient ở dưới khi chưa mở */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-[3rem] bg-gradient-to-t to-transparent pointer-events-none" />
        )}
      </div>

      {/* Nút xem thêm / thu gọn */}
      <button
        className="mt-2 font-medium hover:underline focus:outline-none"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Thu gọn" : "Xem thêm"}
      </button>
    </div>
  );
}
