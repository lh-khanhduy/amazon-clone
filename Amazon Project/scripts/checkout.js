import {
	cart,
	updateItemQuantity,
	removeProductFromCart,
	totalItems,
	getItemQuantityById,
} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

updateItemsQuantityOnWebpage();

//generate items in cart
let cartSummaryHTML = '';

cart.forEach((item) => {
	const productId = item.productID;

	let matchingProduct;
	products.forEach((product) => {
		if (product.id === productId) {
			matchingProduct = product;
		}
	});

	cartSummaryHTML += `
        <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${
		item.quantity
	}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link js-update-link-${
					matchingProduct.id
				}" data-product-id="${matchingProduct.id}">
                Update
                </span>
                <input type="number" min="0" max="999" class="quantity-input js-quantity-input-${
					matchingProduct.id
				}">
                <span class="link-primary save-quantity-link js-save-quantity-link-${
					matchingProduct.id
				}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
					matchingProduct.id
				}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${
					item.productID
				}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${
					item.productID
				}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${
					item.productID
				}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

//make update link interactive
document.querySelectorAll('.js-update-link').forEach((link) => {
	link.addEventListener('click', () => {
		const productId = link.dataset.productId;

		//make update link and quantity label disappear
		document.querySelector(`.js-update-link-${productId}`).innerHTML = '';
		document.querySelector(`.js-quantity-label-${productId}`).innerHTML = '';

		//make input quantity and save link appear
		document
			.querySelector(`.js-quantity-input-${productId}`)
			.classList.add('is-editing-quantity');
		document
			.querySelector(`.js-save-quantity-link-${productId}`)
			.classList.add('is-editing-quantity');

		//make save link interactive
		document
			.querySelector(`.js-save-quantity-link-${productId}`)
			.addEventListener('click', () => {
				updateAfterSavingNewQuantity(productId);
			});

		//keydown support for save link
		document
			.querySelector(`.js-quantity-input-${productId}`)
			.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					updateAfterSavingNewQuantity(productId);
				}
			});
	});
});

//make delete link interactive
document.querySelectorAll('.js-delete-link').forEach((link) => {
	link.addEventListener('click', () => {
		const productId = link.dataset.productId;
		removeProductFromCart(productId);

		//update webpage after delete
		document.querySelector(`.js-cart-item-container-${productId}`).remove();
		updateItemsQuantityOnWebpage();
	});
});

function updateItemsQuantityOnWebpage() {
	document.querySelector('.js-total-items-in-cart').innerHTML = `${totalItems()} items`;
}

function updateAfterSavingNewQuantity(productId) {
	//update new quantity for product
	updateItemQuantity(
		productId,
		Number(document.querySelector(`.js-quantity-input-${productId}`).value)
	);
	updateItemsQuantityOnWebpage();
	//after saving, return back to the beginning
	document
		.querySelector(`.js-quantity-input-${productId}`)
		.classList.remove('is-editing-quantity');
	document
		.querySelector(`.js-save-quantity-link-${productId}`)
		.classList.remove('is-editing-quantity');
	document.querySelector(`.js-update-link-${productId}`).innerHTML = 'Update';
	document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `${getItemQuantityById(
		productId
	)}`;
}
