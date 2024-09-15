import { renderOrders } from './checkout/orderSummary.js';
import { renderPayment } from './checkout/payment.js';
import { loadProducts } from '../data/products.js';
// import '../data/backend-practice.js';

loadProducts(() => {
	renderOrders();
	renderPayment();
});
