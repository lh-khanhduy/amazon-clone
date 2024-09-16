import { renderOrders } from './checkout/orderSummary.js';
import { renderPayment } from './checkout/payment.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/backend-practice.js';

async function loadPage() {
	try {
		await loadProductsFetch();

		await new Promise((resolve) => {
			loadCart(() => {
				resolve();
			});
		});
	} catch (e) {
		console.log('error boooo hooo');
	}

	renderOrders();
	renderPayment();
}

loadPage();

// Promise.all([
// 	loadProductsFetch(),
// 	new Promise((resolve) => {
// 		loadCart(() => {
// 			resolve();
// 		});
// 	}),
// ]).then(() => {
// 	renderOrders();
// 	renderPayment();
// });

// loadProducts(() => {
// 	renderOrders();
// 	renderPayment();
// });
