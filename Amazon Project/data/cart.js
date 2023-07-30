export let cart = [
	{
		productID: 'aad29d11-ea98-41ee-9285-b916638cac4a',
		quantity: 5,
	},
	{
		productID: '1c079479-8586-494f-ab53-219325432536',
		quantity: 3,
	},
];

export function addProductToCart(productID) {
	let matchingItem = undefined;
	//check if item is already in cart
	cart.forEach((item) => {
		if (item.productId === productID) {
			matchingItem = item;
		}
	});

	//get item quantity from selector

	const itemQuantity = Number(document.querySelector(`.js-quantity-selector-${productID}`).value);

	//update cart
	if (matchingItem) {
		matchingItem.quantity += itemQuantity;
	} else {
		cart.push({
			productId: productID,
			quantity: itemQuantity,
		});
	}
}

export function removeProductFromCart(productID) {
	//create new cart that doesn't contain productID
	const newCart = [];
	cart.forEach((item) => {
		if (item.productID !== productID) {
			newCart.push(item);
		}
	});
	cart = newCart;
}
