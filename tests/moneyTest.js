import { formatCurrency } from '../scripts/utils/money.js';

if (formatCurrency(2095) === '20.95') {
	console.log('passed');
} else console.log('failed');

if (formatCurrency(0) == '0.00') {
	console.log('passed');
} else console.log('failed');

if (formatCurrency(2000.5) === '20.01') {
	console.log('passed');
} else console.log('failed');

// this is new line to testing using git

if (3 > 5) {
	console / log('....');
}
//this is for test2
