import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollection } from "../../store/slice/collectionSlice";
import Collection from "./components/Collection";

const ProductCollection = () => {
  const dispatch = useDispatch();
  const { error, message, isLoading, collections } = useSelector(
    (state) => state.productCollection
  );

  useEffect(() => {
    if (error) {
      console.log("api", error);
    }
    if (message) {
      console.log("api", message);
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    dispatch(getAllCollection());
  }, []);

  console.log("collections", collections);

  return (
    <div className="flex flex-col mt-10 gap-y-20">
      {collections?.result?.map((collection, index) => (
        <Collection key={index} collection={collection}></Collection>
      ))}
    </div>
  );
};

export default ProductCollection;
