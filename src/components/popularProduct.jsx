function PopularProduct (props) {
    return (
    <div className="w-[250px] h-auto p-4">
        <img src={props.productImage} alt="Product Imgae"/>
        <p className="font-bold">{props.productName}</p>
        <p>{props.brandName}</p>
        
        <div className="flex">
            <i class="fa fa-star" aria-hidden="true"></i>
            <span>{props.evaluation}</span>
            <span>{props.quantitySold}</span>
        </div>
        <div className="flex">
            <p>{props.price}</p>
            <p>{props.discount}</p>
        </div>
    </div>
    )

}

export default PopularProduct