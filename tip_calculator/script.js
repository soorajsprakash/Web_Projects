const add = document.querySelector('#add-btn');
const subtract = document.querySelector('#remove-btn');

const numOfPersons = document.querySelector('#num-of-persons');

const billAmount = document.querySelector('.bill-amount');
const tipAmount = document.querySelector('.tip-amount');

const splitAmount = document.querySelector('#split-amount');

let persons = numOfPersons.textContent;
let perHeadBill = 0;

let changeEvents = [billAmount, tipAmount]
for (each of changeEvents) {
    each.addEventListener('keyup', () => {
        calculate();
    })
};

add.addEventListener('click', () => {
    persons = Number(persons) + 1
    numOfPersons.textContent = persons;
    calculate();
});

subtract.addEventListener('click', () => {
    if (persons > 1) {
        persons = Number(persons) - 1;
        numOfPersons.textContent = persons;
    }
    calculate();
});


const calculate = () => {
    bill = Number(billAmount.value);
    tip = Number(tipAmount.value);
    totalBill = bill + (bill * tip / 100);

    perHeadBill = (totalBill / persons).toFixed(2);
    splitAmount.textContent = perHeadBill;
}
