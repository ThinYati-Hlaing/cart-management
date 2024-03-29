import { cartBodyHandler, cartObserver } from "./app/cart";
import { categoryListHandler, categoryRender } from "./app/category";
import { productListHandler, productRender } from "./app/product";
import { categories, products } from "./core/data";
import { cartBtnHandler, clearSearchBarInputHandler, searchBarInputHandler, searchBtnHandler, } from "./core/handlers";
import { cartBody, cartCloseBtn, categoryList, clearSearchBarInput, productList, searchBar, searchBtn } from "./core/selectors";

class Shop {

    observer() {
        cartObserver()
    }

    initialRender() {
        categoryRender(categories)
        productRender(products)
    }

    listener() {
        cartBtn.addEventListener("click", cartBtnHandler)
        cartCloseBtn.addEventListener("click", cartBtnHandler)
        productList.addEventListener("click", productListHandler)
        cartBody.addEventListener("click",cartBodyHandler)
        categoryList.addEventListener("click", categoryListHandler)
        searchBtn.addEventListener("click",searchBtnHandler)
        searchBar.addEventListener("keyup",searchBarInputHandler)
        clearSearchBarInput.addEventListener("click", clearSearchBarInputHandler)

    }

    init() {
        console.log("App start");
        this.observer()
        this.initialRender()
        this.listener()
    }

}

export default Shop;