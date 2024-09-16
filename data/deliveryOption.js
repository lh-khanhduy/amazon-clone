import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
	{
		id: '1',
		deliveryDays: 10,
		priceCents: 0,
	},
	{
		id: '2',
		deliveryDays: 6,
		priceCents: 499,
	},
	{
		id: '3',
		deliveryDays: 2,
		priceCents: 999,
	},
];

export function getDeliveryOption(deliveryOptionId) {
	let deliveryOption;
	deliveryOptions.forEach((option) => {
		if (option.id === deliveryOptionId) {
			deliveryOption = option;
		}
	});

	return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(option) {
	const today = dayjs();
	const deliveryDate = today.add(option.deliveryDays, 'days');
	return deliveryDate;
}

function isWeekend(date) {
	if (date.format('d') === '0' || date.format('d') === '6') return true;
	return false;
}
