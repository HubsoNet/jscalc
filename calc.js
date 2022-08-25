//___Meme-Calculator by Hubson 2022___
//___TO DO LIST:
//___1. [add] clicking multiply then equal causes multipling in a loop
//___2. [fix] error with clicking equal after result then clicking any number
//___3. 
//___4.


//___Variables for all the keys___
const kBackspace = document.getElementById('k_backspace');
const kCE = document.getElementById('k_CE');
const kC = document.getElementById('k_C');
const kReverse = document.getElementById('k_reverse');
const kSqrt = document.getElementById('k_sqrt');
const k7 = document.getElementById('k_7');
const k8 = document.getElementById('k_8');
const k9 = document.getElementById('k_9');
const kDivide = document.getElementById('k_divide');
const kPercent = document.getElementById('k_percent');
const k4 = document.getElementById('k_4');
const k5 = document.getElementById('k_5');
const k6 = document.getElementById('k_6');
const kMultiply = document.getElementById('k_multiply');
const k1x = document.getElementById('k_1/x');
const k1 = document.getElementById('k_1');
const k2 = document.getElementById('k_2');
const k3 = document.getElementById('k_3');
const kMinus = document.getElementById('k_minus');
const kEqual = document.getElementById('k_equal');
const k0 = document.getElementById('k_0');
const kComma = document.getElementById('k_comma');
const kPlus = document.getElementById('k_plus');

//___Number keys___
k0.addEventListener('click', function () { keyNr(0) });
k1.addEventListener('click', function () { keyNr(1) });
k2.addEventListener('click', function () { keyNr(2) });
k3.addEventListener('click', function () { keyNr(3) });
k4.addEventListener('click', function () { keyNr(4) });
k5.addEventListener('click', function () { keyNr(5) });
k6.addEventListener('click', function () { keyNr(6) });
k7.addEventListener('click', function () { keyNr(7) });
k8.addEventListener('click', function () { keyNr(8) });
k9.addEventListener('click', function () { keyNr(9) });
kComma.addEventListener('click', () => { commaOn = true });


//___Operation keys___
kC.addEventListener('click', () => { clearAll() });
kPlus.addEventListener('click', () => { keyOperation(1); equalPressed = false });
kMinus.addEventListener('click', () => { keyOperation(2); equalPressed = false });
kMultiply.addEventListener('click', () => { keyOperation(3); equalPressed = false });
kDivide.addEventListener('click', () => { keyOperation(4); equalPressed = false });
kReverse.addEventListener('click', () => { keyReverse(); });
kSqrt.addEventListener('click', () => { keySqrt(); equalPressed = false });
k1x.addEventListener('click', () => { key1x(); });
kEqual.addEventListener('click', () => { keyOperation(9); equalPressed = true });


//___Variables___
var tempNumber = 0;
var previousOperation = 0;
var result = 0;
var equalPressed = false;
var commaOn = false;        //Used for inserting float numbers.
var orderOfMagnitude = 1;   //Used for inserting float numbers.


//___Functions___
function keyNr(nr) {
    if (equalPressed == true) { tempNumber = 0; result = 0; equalPressed = false };
    if (commaOn == false) {
        tempNumber = tempNumber * 10 + nr;
    }
    else {
        tempNumber = tempNumber + nr / Math.pow(10, orderOfMagnitude);
        orderOfMagnitude++;
    }
    document.querySelector('#result').innerHTML = tempNumber.toFixed(orderOfMagnitude - 1);
}

function keyOperation(opNr) {

    commaOn = false;
    orderOfMagnitude = 1;
    // if (equalPressed == true && opNr < 5) { }
    // else {
    if (equalPressed == false || opNr > 8) {
        switch (previousOperation) {
            case 0:
                result = tempNumber;
                break;
            case 1:
                result += tempNumber;
                break;
            case 2:
                result -= tempNumber;
                break;
            case 3:
                result *= tempNumber;
                break;
            case 4:
                result /= tempNumber;
                break;
            case 5:

                break;
            default:
                console.log("keyOperation case error!!")
                break;
        }
    }

    if (opNr < 9) {

        previousOperation = opNr;
        tempNumber = 0;
    }

    document.querySelector('#result').innerHTML = result;
    console.log("Result: ", result);
}

function keySqrt() {
    result = Math.sqrt(tempNumber);
    tempNumber = result;
    document.querySelector('#result').innerHTML = result;
}

function keyReverse() {
    if (equalPressed == true) {
        result *= -1;
        document.querySelector('#result').innerHTML = result;
        console.log(tempNumber);
    }
    else {
        tempNumber *= -1;
        document.querySelector('#result').innerHTML = tempNumber;
    }
    console.log("equalPressed: :", equalPressed);

}

function key1x() {
    // result = tempNumber;
    result = 1 / result;
    document.querySelector('#result').innerHTML = result;

}

function clearAll() {
    tempNumber = 0;
    previousOperation = 0;
    result = 0;
    equalPressed = false;
    commaOn = false;
    orderOfMagnitude = 1;
    document.querySelector('#result').innerHTML = result;
}