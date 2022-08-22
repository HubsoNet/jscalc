// var screen = document.getElementById('operations').innerHTML = "test123";

var prompterString = "";
var tempString = "";
var tempNumber = 0;
var result = 0;
var numberA = 0;
var numberB = 0;
var inQueue = false;

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

k0.addEventListener('click', function () { keyShow("0") });
k1.addEventListener('click', function () { keyShow(1) });
k2.addEventListener('click', function () { keyShow(2) });
k3.addEventListener('click', function () { keyShow(3) });
k4.addEventListener('click', function () { keyShow(4) });
k5.addEventListener('click', function () { keyShow(5) });
k6.addEventListener('click', function () { keyShow(6) });
k7.addEventListener('click', function () { keyShow(7) });
k8.addEventListener('click', function () { keyShow(8) });
k9.addEventListener('click', function () { keyShow(9) });
kPlus.addEventListener('click', () => { keyShow(" + "); keyOperation(" + ", 1); });
kMinus.addEventListener('click', () => { keyShow(" - "); keyOperation(" - ", 2); });

function keyShow(keySymbol) {
    if (!isNaN(keySymbol)) {
        tempString += keySymbol;
        // console.log("string = " + tempString);
        document.querySelector('#result').innerHTML = tempString;
        tempNumber = parseFloat(tempString);
    }
    // prompterString += keySymbol;
    // document.querySelector('#operations').innerHTML = prompterString;

}

function keyOperation(operationSymbol, operationNr) {
    // console.log('execute operation!');
    // console.log("temp string = " + tempString);
    if (tempString == "" && inQueue == true) {
        prompterString = "0" + tempString + operationSymbol;
    }
    else prompterString += tempString + operationSymbol;

    document.querySelector('#operations').innerHTML = prompterString;
    // tempNumber = parseFloat(tempString);
    tempString = "";

    // console.log(tempNumber);
    if (inQueue == true) {
        numberB = tempNumber;
        if (operationNr == 1) {
            result += (tempNumber + numberA);
        }
        if (operationNr == 2) {
            result -= tempNumber;
        }
        tempNumber = 0;
        resultShow(result);
        console.log("inQueue: ", inQueue);
        numberA = 0;
    }
    else {
        numberA = tempNumber;
        inQueue = true;
        console.log("inQueue: ", inQueue);
    };
    tempNumber = 0;
}

function resultShow(r) {
    document.querySelector('#result').innerHTML = r;
}

//___Clear Prompter___
kC.addEventListener('click', function () {
    document.querySelector('#operations').innerHTML = "";
    prompterString = "";
    tempString = "";
    result = 0;
    document.querySelector('#result').innerHTML = result;
    numberA = 0;
    inQueue = false;
});