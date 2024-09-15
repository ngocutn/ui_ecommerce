import PopUp from "../../../components/popUp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const ProductBtn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [discardButton, setDiscardButton] = useState(false);
  const handleDiscardButton = () => {
    setDiscardButton(!discardButton);
  };

  // const isFormValid = formState.isValid;

  const {
    formState: { errors, isValid },
  } = useFormContext();

  return (
    <div id="add-prd-button" className="flex justify-between mt-5">
      <button
        type="button"
        className="p-3 font-semibold border-2 rounded-lg 2 hover:bg-gray-300 hover:text-white"
        onClick={handleDiscardButton}
      >
        Discard
      </button>
      <button
        type="submit"
        disabled={!isValid}
        className={`border-2 ${
          isValid
            ? loading
              ? "bg-gray-300 text-white"
              : "bg-blue-700 text-white"
            : "bg-gray-300 text-white"
        } rounded-lg p-3 font-semibold`}
      >
        {loading ? "Loading..." : "Add Product"}
      </button>

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

export default ProductBtn;
