import PopularProduct from "../components/popularProduct";
import imgProduct from "../assets/image/goku.jpg"

function MainPage () {
    return (
        <PopularProduct 
            productImage={imgProduct} 
            productName="Product Name will be here"
            brandName= "Brand Name"
            evaluation="4,7"
            quantitySold= "7,2345 Sold"
            price="24,5"
            discount="24,5">

        </PopularProduct>
    )
}

export default MainPage