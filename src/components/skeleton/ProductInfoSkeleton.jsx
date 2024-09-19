import { Skeleton } from "@mui/material";
import React from "react";

const ProductInfoSkeleton = () => {
  return (
    <div className="w-1/3 h-[70vh] overflow-hidden">
      <Skeleton
        variant="rounded"
        width="100%"
        height={80}
        animation="wave"
        sx={{ marginBottom: "12px" }}
      ></Skeleton>
      <div className="flex items-center mb-4 gap-x-4">
        <Skeleton
          variant="rounded"
          width={50}
          height={50}
          animation="wave"
        ></Skeleton>
        <Skeleton
          variant="rounded"
          width={50}
          height={50}
          animation="wave"
        ></Skeleton>
        <Skeleton
          variant="rounded"
          width={50}
          height={50}
          animation="wave"
        ></Skeleton>
      </div>
      <div className="flex items-center mb-4 gap-x-4">
        <Skeleton
          variant="rounded"
          width={70}
          height={50}
          animation="wave"
        ></Skeleton>
        <Skeleton
          variant="rounded"
          width={90}
          height={50}
          animation="wave"
        ></Skeleton>
        <Skeleton
          variant="rounded"
          width={70}
          height={50}
          animation="wave"
        ></Skeleton>
      </div>
      <div className="flex items-center mb-6 gap-x-4">
        <Skeleton
          variant="rounded"
          width={90}
          height={50}
          animation="wave"
        ></Skeleton>
        <Skeleton
          variant="rounded"
          width={70}
          height={50}
          animation="wave"
        ></Skeleton>
        <Skeleton
          variant="rounded"
          width={70}
          height={50}
          animation="wave"
        ></Skeleton>
      </div>

      <Skeleton
        variant="rounded"
        width="100%"
        height={50}
        sx={{ marginBottom: "25px" }}
        animation="wave"
      ></Skeleton>
      <Skeleton
        variant="rounded"
        width="100%"
        height={120}
        animation="wave"
      ></Skeleton>
    </div>
  ); // if data empty;
};

export default ProductInfoSkeleton;
