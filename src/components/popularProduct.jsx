function PopularProduct(props) {
  return (
    <div id="popularProduct" className="w-[250px] h-auto p-4">
      <img src={props.productImage} alt="Product Imgae" />
      <p className="font-bold">{props.productName}</p>
      <p className="text-gray-500 text-md">{props.brandName}</p>

      <div className="flex gap-2 items-center">
        <div className="w-3/4 ">
          <div className="flex gap-2 items-center text-[12px] font-bold">
            <i class="fa fa-star" aria-hidden="true"></i>
            <span>{props.evaluation}</span>
            <div class="w-1 bg-gray-400 h-[20px]"></div>
            <span className="bg-gray-300 p-1">{props.quantitySold} Sold</span>
          </div>

          <div className="flex gap-4">
            <p className="line-through text-gray-500">$ {props.price}</p>
            <p className="font-bold">$ {props.discount}</p>
          </div>
        </div>

        <div className="w-1/4 ml-auto">
          <i
            className="fa fa-plus-circle fa-2x float-right"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  );
}

export default PopularProduct;
