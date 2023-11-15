import Swal from "sweetalert2";
import { products } from "../core/data";
import {
  app,
  cartBody,
  cartBodyCount,
  cartCostTotal,
  cartCountBadge,
  cartItem,
} from "../core/selectors";

export const createCardItem = ({ id, title, price, image }) => {
  const cartItemUi = cartItem.content.cloneNode(true);
  const cartItemImg = cartItemUi.querySelector(".cart-item-img");
  const cartItemTitle = cartItemUi.querySelector(".cart-item-title");
  const cartItemPrice = cartItemUi.querySelector(".cart-item-price");

  cartItemUi.querySelector(".cart-item").setAttribute("cart-product-id", id);

  cartItemImg.src = image;
  cartItemTitle.innerText = title;
  cartItemPrice.innerText = price;

  return cartItemUi;
};

export const addToCart = (productId) => {
  const currentProduct = products.find((el) => el.id == productId);

  cartBody.append(createCardItem(currentProduct));
};

export const removeFromCart = (id) => {
  const currentCartItem = cartBody.querySelector(`[cart-product-id='${id}']`);
  const currentCardItemId = currentCartItem.getAttribute("cart-product-id");

  // console.log(currentCartItem);
  // console.log(currentCardItemId);

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      currentCartItem.classList.add("animate__animated","animate__hinge");
      currentCartItem.addEventListener("animationend",()=>{
        currentCartItem.remove();

        const currentProductCard = app.querySelector(
          `[product-id='${currentCardItemId}']`
        );
        const currentAddToCartBtn =
          currentProductCard.querySelector(".add-to-cart"); // console.log(currentProductCard);
        currentAddToCartBtn.classList.remove("bg-neutral-600", "text-white");
        currentAddToCartBtn.innerText = "Add to Cart";
        currentAddToCartBtn.disabled = false;
  
      })


      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};

export const calculateItemInCartCostTotal = () => {
  return [...cartBody.querySelectorAll(".cart-item-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );
};

export const countItemInCart = () => {
  return cartBody.querySelectorAll(".cart-item").length;
};

export const incrementQuantity = (id) => {
  const currentCartItem = cartBody.querySelector(`[cart-product-id='${id}']`);
  const quantity = currentCartItem.querySelector(".cart-item-quantity");
  const price = currentCartItem.querySelector(".cart-item-price");
  const cost = currentCartItem.querySelector(".cart-item-cost");

  quantity.innerText = parseInt(quantity.innerText) + 1;
  cost.innerText = quantity.innerText * price.innerText;

};

export const decrementQuantity = (id) => {
  const currentCartItem = cartBody.querySelector(`[cart-product-id='${id}']`);
  const quantity = currentCartItem.querySelector(".cart-item-quantity");
  const price = currentCartItem.querySelector(".cart-item-price");
  const cost = currentCartItem.querySelector(".cart-item-cost");

  if (currentCartItemQuantity.innerText > 1) {
    quantity.innerText = parseInt(quantity.innerText) - 1;
    cost.innerText = quantity.innerText * price.innerText;
  }
};

export const cartBodyHandler = (event) => {
  console.log(event.target);
  if (event.target.classList.contains("cart-item-del")) {
    const currentCartItem = event.target.closest(".cart-item");
    const currentCardItemId = currentCartItem.getAttribute("cart-product-id");

    removeFromCart(currentCardItemId);
  } else if (event.target.classList.contains("cart-item-quantity-increment")) {
    const currentCartItem = event.target.closest(".cart-item");
    const currentCardItemId = currentCartItem.getAttribute("cart-product-id");
    incrementQuantity(currentCardItemId);
  } else if (event.target.classList.contains("cart-item-quantity-decrement")) {
    const currentCartItem = event.target.closest(".cart-item");
    const currentCardItemId = currentCartItem.getAttribute("cart-product-id");

    decrementQuantity(currentCardItemId)
  }
};

export const cartObserver = () => {
  const process = () => {
    // console.log("u change");
    cartCostTotal.innerText = calculateItemInCartCostTotal();
    cartBodyCount.innerText = countItemInCart();
    cartCountBadge.innerText = countItemInCart();
  };
 
  const options = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(process);

  observer.observe(cartBody, options);
};
