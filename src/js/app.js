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
// const labelWelcome = document.querySelector('.welcome');
const userInfo = document.querySelector('.user__info span');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const labelBalance = document.querySelector('.balance__value');
const containerMovements = document.querySelector('.movements');
const labelSumIn = document.querySelector('.summary__value--in');
const btnTransfer = document.querySelector('.form__btn--transfer');
const labelSumOut = document.querySelector('.summary__value--out');
const inputClosePin = document.querySelector('.form__input--pin input');
const inputTransferTo = document.querySelector('.form__input--to input');
const inputLoginPin = document.querySelector('.login__input--pin');
const labelSumInterest = document.querySelector('.summary__value--interest');
const inputCloseUsername = document.querySelector('.form__input--user input');
const inputLoginUsername = document.querySelector('.login__input--user');
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

// Display Summery
const calcDisplaySummery = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${parseFloat(interest).toFixed(2)}€`;
};

// Calculate Balanace()
const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${parseFloat(acc.balance).toFixed(2)}€`;
};

// Update UI
function updateUI(acc) {
  // 2. Display movements
  displayMovements(acc.movements);

  // 3. Display Balance
  calcDisplayBalance(acc);

  // 4. Display Summary
  calcDisplaySummery(acc);
}

let currentAccount;

// Event Handler() :
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);

  // Login
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Show UI

    // show UI
    containerApp.classList.add('active');

    //  Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // 1. Display UI & Message
    userInfo.textContent = currentAccount.owner;

    // 2. Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);

  // Clear Input
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing The transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// Loan Request
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Delete Account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // Find Index of currentAccount
    const index = accounts.findIndex((acc) => acc.username === currentAccount.username);

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.classList.remove('active');

    //  Display UI & Message
    userInfo.textContent = 'Log In to get started';
  }
});

// Flat & FlatMaps

// Flat technique

// const overAllBalance = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(overAllBalance);

// FlatMap technique
const overAllBalance = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(overAllBalance);
