export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
	cart = [
		{
			productID: 'aad29d11-ea98-41ee-9285-b916638cac4a',
			quantity: 5,
		},
		{
			productID: '1c079479-8586-494f-ab53-219325432536',
			quantity: 3,
		},
	];
}

function saveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function addProductToCart(itemId) {
	let matchingItem = undefined;
	//check if item is already in cart
	cart.forEach((item) => {
		if (item.productID === itemId) {
			matchingItem = item;
		}
	});

	//get item quantity from selector
	const itemQuantity = Number(document.querySelector(`.js-quantity-selector-${itemId}`).value);

	//update cart
	if (matchingItem) {
		matchingItem.quantity += itemQuantity;
	} else {
		cart.push({
			productID: itemId,
			quantity: itemQuantity,
		});
	}

	saveToStorage();
}

export function removeProductFromCart(deletingItemId) {
	//create new cart that doesn't contain productID
	const newCart = [];
	cart.forEach((item) => {
		if (item.productID !== deletingItemId) {
			newCart.push(item);
		}
	});
	cart = newCart;
	saveToStorage();
}
