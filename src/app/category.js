import { products } from "../core/data";
import { categoryBtn, categoryList } from "../core/selectors";
import { productRender } from "./product";

export const createCategory = (title) => {
  const clone = categoryBtn.content.cloneNode(true);
  const category = clone.querySelector("button");
  category.innerText = title;

  return category;
};

export const categoryRender = (categoryArray) => {
  categoryArray.forEach((el) => categoryList.append(createCategory(el)));
};

export const categoryListHandler = (event) => {
  if (event.target.classList.contains("category-btn")) {
    categoryList.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
    const currentCategory = event.target.innerText;
    const currentProduct = products.filter(product => product.category === currentCategory || currentCategory === "All")
    console.table(currentProduct);
    productRender(currentProduct);
    // if(currentCategory === "All"){
    //     productRender(products);
    // }else{
    //     productRender(currentProduct);
    // }
  }
};
