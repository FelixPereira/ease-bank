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

let currentUser;
let sort = false;


/////////////////////////////////////////////////
// Functions


const displayMovements = (account, sortState) => { 
  const movements = sortState ? account.movements.slice(0).sort((a, b) => b - a) : account.movements;
  
  
  movements.forEach((movement, idx) => {
      const type = movement > 1 ? 'deposit' : 'withdrawal';
  
      const html = `
        <div class="movements__row">
          <div class='movements__type movements__type--${type}'>
            ${idx + 1} ${type}
          </div>
          <div class="movements__value">${((Math.abs(movement))).toFixed(2)} €</div>
        </div>
      `;
  
      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
  
const displayBalance = account => {
  account.balance = account.movements.reduce((accumulator, movement) => accumulator + movement, 0);
    
  labelBalance.textContent = (account.balance).toFixed(2) + ' €';
};

const displaySummary = account => {
  const inComes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = (inComes).toFixed(2) + ' €';
        
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = (Math.abs(out)).toFixed(2) + ' €';;
    
  const interestRate = account.movements
    .filter(deposit => deposit > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, mov) => acc + mov, 0);
    labelSumInterest.textContent = (interestRate).toFixed(2) + ' €';;
};

const updateUI = (account, sortState) => {
  containerMovements.innerHTML = '';

  displayMovements(account, sortState);
  displayBalance(account);
  displaySummary(account);
};

const creatUserName = accounts => {
  accounts.forEach(account => {
  
    account.username = account.owner.toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
creatUserName(accounts);

// EVENT HANDLERS
btnLogin.addEventListener('click', function(e) {
  e.preventDefault();
  currentUser = accounts.find(acc => acc.username === inputLoginUsername.value)

  if(currentUser?.pin === Number(inputLoginPin.value)) {
    
    // Display UI and wellcome message
    containerApp.style.opacity = 1;

    labelWelcome.textContent = `Wellcome, ${    currentUser.owner.split(' ')[0]}`;
    
    // Update UI
    updateUI(currentUser, sort);
    
    //Clear fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
  };
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  if(amount > 0 && recieverAcc.username && currentUser.balance >= amount) {
    
    recieverAcc.movements.push(amount);
    currentUser.movements.push(-amount);
    
    updateUI(currentUser, sort);
  };
  
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  
  const amount = Math.floor(inputLoanAmount.value);
  if(amount > 0 && currentUser.movements.some(mov => mov / 10)) {
    currentUser.movements.push(amount);
    
    // Update UI
    updateUI(currentUser, sort);
  };
  
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  
  if(
    currentUser.username === inputCloseUsername.value 
    && currentUser.pin === Number(inputClosePin.value)) {
      const accountIndex = accounts.findIndex(acc => acc.username === currentUser.username);
    accounts.splice(accountIndex, 1);
    containerApp.style.opacity = 1;
  };
});

btnSort.addEventListener('click', function() {
  const sortMovements = sortState => {
  return !sortState;
  };
  
  sort = sortMovements(sort);

  updateUI(currentUser, sort);
});


/*
const euroToUsd = 1.1;
const movementsDollar = movements.map(movement => movement * euroToUsd);

for(const movement of movementsDollar) {
  console.log(Math.trunc(movement) + ' USD');
};
*/
