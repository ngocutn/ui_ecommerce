import { Skeleton } from "@mui/material";
import React from "react";

const CateItemSkeleton = () => {
  return (
    <Skeleton
      variant="circular"
      width={70}
      height={70}
      animation="wave"
    ></Skeleton>
  );
};

export default CateItemSkeleton;
