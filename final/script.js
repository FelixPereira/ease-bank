'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
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
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const displayMovements = (movements) => {
  movements.forEach((movement, idx) => {
    const type = movement > 1 ? 'deposit' : 'withdrawal';
    
    const html = `
      <div class="movements__row">
        <div class='movements__type movements__type--${type}'>
          ${idx + 1} ${type}
        </div>
        <div class="movements__value">${movement}€</div>
  
      </div>
    `;
    
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  
  labelBalance.textContent = movements.reduce((acc, mov) => acc + mov, 0) + '€';
  
  const displaySummaryIn = movements => {
    const inComes = movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${inComes}€`;
  };
  
  const displaySummaryOut = movements => {
    const out = movements
      .filter(mov => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;
  }
  
  const interest = movements => {
    const interestRate = movements
      .filter(deposit => deposit > 0)
      .map(deposit => (deposit * 1.2) / 100)
      .filter(interest => interest >= 1)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumInterest.textContent = `${interestRate}€`;
  }
  
  displaySummaryIn(movements);
  displaySummaryOut(movements);
  interest(movements);

};

displayMovements(account1.movements);


/*

const creatUserName = accounts => {
  accounts.forEach(account => {
  
    account.username = account.owner.toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
      console.log(account);
  });
};
creatUserName(accounts);


const movements = [430, -1000, 700, -50, 90];

const euroToUsd = 1.1;
const movementsDollar = movements.map(movement => movement * euroToUsd);

for(const movement of movementsDollar) {
  console.log(Math.trunc(movement) + ' USD');
};


const movementDescription = movements.map((mov, idx, arr) => {
  return `Movement ${idx + 1}: You ${mov > 0 ? 'deposit' : 'withdrew'} ${Math.abs(mov)}`;
  }
);

for(const desc of movementDescription) {
  console.log(desc);
};

COMPUTING USERNAMES

const allMovs = [-300, 246, -200, 106, 2395,  -209, -3467];
const totalAmount = allMovs.reduce((accumul, allMov) => accumul + allMov, 0);
// console.log(totalAmount);

const max = allMovs.reduce((acc, mov) => acc > mov ? acc : mov, allMovs[0]);

console.log(max);

*/
