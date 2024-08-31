import SideBar from "../components/sideBar";
import { useNavigate } from "react-router-dom";
function ListProduct() {
  const navigate = useNavigate();
  return (
    <div id="list-product" className="flex justify-between mt-14">
      <p>Product List</p>
      <button
        className="p-3 bg-blue-700 text-white rounded-lg hover:bg-slate-300"
        onClick={() => navigate("/add-product")}
      >
        Add product
      </button>
    </div>
  );
}

export default ListProduct;
