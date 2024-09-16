import { cart, totalItems } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOption.js';
import { addOrder } from '../../data/order.js';

export function renderPayment() {
	//calculating money
	let priceItems = 0;
	let shippingCost = 0;
	let totalBeforeTax = 0;

	cart.forEach((cartItem) => {
		let matchingProduct;

		products.forEach((product) => {
			if (product.id === cartItem.productID) {
				matchingProduct = product;
			}
		});

		priceItems += matchingProduct.priceCents * cartItem.quantity;

		deliveryOptions.forEach((option) => {
			if (option.id === cartItem.deliveryOptionId) {
				shippingCost += option.priceCents;
			}
		});
	});

	totalBeforeTax = priceItems + shippingCost;

	//display prices
	document.querySelector('.js-total-items-quantity').innerHTML = `Items (${totalItems()}):`;

	document.querySelector('.js-total-items-price').innerHTML = `$${formatCurrency(priceItems)}`;

	document.querySelector('.js-total-shipping-cost').innerHTML = `$${formatCurrency(
		shippingCost
	)}`;
	document.querySelector('.js-total-before-tax').innerHTML = `$${formatCurrency(totalBeforeTax)}`;
	document.querySelector('.js-estimated-tax').innerHTML = `$${formatCurrency(
		totalBeforeTax * 0.1
	)}`;
	document.querySelector('.js-total-money').innerHTML = `$${formatCurrency(
		totalBeforeTax * 1.1
	)}`;

	//make place order button interactive
	document.querySelector('.js-place-order-button').addEventListener('click', async () => {
		try {
			const response = await fetch('https://supersimplebackend.dev/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cart: cart,
				}),
			});

			const order = await response.json();
			addOrder(order);
		} catch (e) {
			console.log('error happen, booooo');
		}

		window.location.href = 'orders.html';
	});
}
