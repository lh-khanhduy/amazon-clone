function Cart(localStorageKey) {
	const cart = {
		cartItems: undefined,

		loadCartFromStorage() {
			this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

			if (!this.cartItems) {
				this.cartItems = [
					{
						productID: 'aad29d11-ea98-41ee-9285-b916638cac4a',
						quantity: 5,
						deliveryOptionId: '2',
					},
					{
						productID: '1c079479-8586-494f-ab53-219325432536',
						quantity: 3,
						deliveryOptionId: '3',
					},
				];
			}
		},

		saveToStorage() {
			localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
		},

		addProductToCart(itemId) {
			let matchingItem = undefined;
			//check if item is already in cart
			this.cartItems.forEach((item) => {
				if (item.productID === itemId) {
					matchingItem = item;
				}
			});

			//get item quantity from selector
			const itemQuantity = Number(
				document.querySelector(`.js-quantity-selector-${itemId}`).value
			);

			//update cart
			if (matchingItem) {
				matchingItem.quantity += itemQuantity;
			} else {
				this.cartItems.push({
					productID: itemId,
					quantity: itemQuantity,
					deliveryOptionId: '1',
				});
			}

			this.saveToStorage();
		},

		updateItemQuantity(itemId, quantity) {
			//find item in cart
			let matchingItem = undefined;
			this.cartItems.forEach((item) => {
				if (item.productID === itemId) {
					matchingItem = item;
				}
			});
			//update quantity fot that item
			matchingItem.quantity = quantity;
			this.saveToStorage();
		},

		removeProductFromCart(deletingItemId) {
			//create new cart that doesn't contain productID
			const newCart = [];
			this,
				this.cartItems.forEach((item) => {
					if (item.productID !== deletingItemId) {
						newCart.push(item);
					}
				});
			this.cartItems = newCart;
			this.saveToStorage();
		},

		totalItems() {
			let totalQuantity = 0;
			this.cartItems.forEach((item) => {
				totalQuantity += item.quantity;
			});
			return totalQuantity;
		},

		getItemQuantityById(itemId) {
			//find the item
			let matchingItem = undefined;
			this.cartItems.forEach((item) => {
				if (item.productID === itemId) {
					matchingItem = item;
				}
			});
			return matchingItem.quantity;
		},

		updateDeliveryOption(productID, newDeliveryOptionId) {
			let matchingItem;
			this.cartItems.forEach((item) => {
				if (productID === item.productID) {
					matchingItem = item;
				}
			});

			matchingItem.deliveryOptionId = newDeliveryOptionId;
			this.saveToStorage();
		},
	};

	return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart');

cart.loadCartFromStorage();
businessCart.loadCartFromStorage();

console.log(cart);
console.log(businessCart);
