export const cart = [];

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
