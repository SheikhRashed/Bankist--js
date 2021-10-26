'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Elements
const labelDate = document.querySelector('.date');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const btnSort = document.querySelector('.btn--sort');
const btnLogin = document.querySelector('.login__btn');
const labelWelcome = document.querySelector('.welcome');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const labelBalance = document.querySelector('.balance__value');
const containerMovements = document.querySelector('.movements');
const labelSumIn = document.querySelector('.summary__value--in');
const btnTransfer = document.querySelector('.form__btn--transfer');
const labelSumOut = document.querySelector('.summary__value--out');
const inputClosePin = document.querySelector('.form__input--pin input');
const inputTransferTo = document.querySelector('.form__input--to input');
const inputLoginPin = document.querySelector('.login__input--pin input');
const labelSumInterest = document.querySelector('.summary__value--interest');
const inputCloseUsername = document.querySelector('.form__input--user input');
const inputLoginUsername = document.querySelector('.login__input--user input');
const inputTransferAmount = document.querySelector('.form__input--amount input');
const inputLoanAmount = document.querySelector('.form__input--loan-amount input');

// Users Account
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Display Movements ()
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
		<div class="movements__row movements__row--${type} ">
			<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
			<div class="movements__value movements__value--${type}">${Math.abs(mov)}€</div>
		</div>
		`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

// Display Summery
const calcDisplaySummery = function (movements) {
  const incomes = movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummery(account1.movements);

// Create Username ()
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};

createUsernames(accounts);

// Calculate Balanace()
const calcPrintBalance = (movements) => {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

calcPrintBalance(account2.movements);
