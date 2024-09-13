import { cart, addProductToCart, totalItems } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';
let addedToCartTimeout;

//generate total items in cart when first load the webpage
document.querySelector('.js-cart-quantity').innerHTML = totalItems();

//generate the products to the webpage
products.forEach((product) => {
	productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
          <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
          ${product.name}
      </div>

      <div class="product-rating-container">
          <img class="product-rating-stars" src=${product.getStarURL()}>
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
      </div>

      <div class="product-price">
          ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          </select>
      </div>
      
      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
			product.id
		}">
          Add to Cart
      </button>
    </div>
    `;
});
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//make add to cart button interactive
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
	button.addEventListener('click', () => {
		const productID = button.dataset.productId;
		informAddedToCart(productID);
		addProductToCart(productID);
		displayTotalCartQuantity();
	});
});

function informAddedToCart(productID) {
	//add a class to the message element
	document.querySelector(`.js-added-to-cart-${productID}`).classList.add('added-to-cart-pop-up');

	//clear previous timeout
	clearTimeout(addedToCartTimeout);
	//set timeout for message
	addedToCartTimeout = setTimeout(() => {
		document
			.querySelector(`.js-added-to-cart-${productID}`)
			.classList.remove('added-to-cart-pop-up');
	}, 2000);
}

function displayTotalCartQuantity() {
	document.querySelector('.js-cart-quantity').innerHTML = totalItems();
}
