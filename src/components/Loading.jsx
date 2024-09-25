import React from "react";
import { ThreeDot } from "react-loading-indicators";

const Loading = ({ color = "#fff" }) => {
  return (
    <div>
      <ThreeDot color={color} size="small" text="" textColor="" />
    </div>
  );
};

export default Loading;
