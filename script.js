'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
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
  movements: [],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//DISPLAY MOVEMENMTS

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
          i + 1
        } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcdisplaybalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

/// SUMMARY

const calcDisplaySummary = function (acc) {
  const deposites = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const withdrawls = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposites => (deposites * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, cur) => acc + cur);
  labelSumOut.textContent = `${Math.abs(withdrawls)} €`;
  labelSumIn.textContent = `${deposites} €`;
  labelSumInterest.textContent = `${interest} €`;
};

// CREATEING USERNAMES

const createusername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createusername(accounts);

//LOGIN

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplaySummary(acc);
  calcdisplaybalance(acc);
};

let currentaccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentaccount = accounts.find(
    acc => acc.username === inputLoginUsername.value,
  );
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome Back ${currentaccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentaccount);
  }
});

// AMOUNT TRANSFER

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value,
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAccount &&
    recieverAccount.username !== currentaccount.username &&
    currentaccount.balance >= amount
  ) {
    currentaccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    updateUI(currentaccount);
  }
});

// REQUEST LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    loanAmount >= currentaccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    currentaccount.movements.push(loanAmount);
    updateUI(currentaccount);
  }

  inputLoanAmount.value = '';
});

// Delete Account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentaccount.username &&
    Number(inputClosePin.value) === currentaccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentaccount.username,
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// SORTING

let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentaccount.movements, !sort);
  sort = !sort;
});
