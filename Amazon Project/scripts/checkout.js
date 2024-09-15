import { renderOrders } from './checkout/orderSummary.js';
import { renderPayment } from './checkout/payment.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/backend-practice.js';

Promise.all([
	loadProductsFetch(),
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
