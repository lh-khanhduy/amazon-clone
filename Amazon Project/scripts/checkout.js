import { renderOrders } from './checkout/orderSummary.js';
import { renderPayment } from './checkout/payment.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/backend-practice.js';

Promise.all([
	new Promise((resolve) => {
		loadProducts(() => {
			resolve();
		});
	}),
	new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	}),
]).then(() => {
	renderOrders();
	renderPayment();
});

// loadProducts(() => {
// 	renderOrders();
// 	renderPayment();
// });
