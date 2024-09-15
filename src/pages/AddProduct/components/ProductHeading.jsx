import { useState } from "react";
import PopUp from "../../../components/popUp";
import { useNavigate } from "react-router-dom";

const ProductHeading = () => {
  const navigate = useNavigate();
  const [discardButton, setDiscardButton] = useState(false);
  const handleDiscardButton = () => {
    setDiscardButton(!discardButton);
  };
  return (
    <div id="add-prd-header" className="flex gap-6">
      <button
        className="flex items-center justify-center px-5 py-1 text-gray-500 border-2 border-gray-200 rounded-md hover:bg-gray-200 hover:text-white"
        onClick={handleDiscardButton}
      >
        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
      </button>
      <div>
        <p className="font-semibold text-gray-500">Back to product list</p>
        <p className="text-2xl font-bold">Add new product</p>
      </div>
      {discardButton && (
        <PopUp
          title="Do you want to discard this product?"
          rightButton="Discard"
          onCancel={handleDiscardButton}
          onDiscard={() => navigate("/admin")}
        />
      )}
    </div>
  );
};

export default ProductHeading;
