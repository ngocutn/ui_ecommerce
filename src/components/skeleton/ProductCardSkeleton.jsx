import { Skeleton } from "@mui/material";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <Skeleton
      variant="rounded"
      width="100%"
      height={250}
      animation="wave"
    ></Skeleton>
  );
};

export default ProductCardSkeleton;
