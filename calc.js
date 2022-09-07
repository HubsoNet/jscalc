//___Meme JS-Calculator by Hubson 2022___
//___TO DO LIST:
//___1. [ADDED] inserting number, clicking multiply then equal causes multipling in a loop
//___2. [FIXED] error with clicking equal after result then clicking any number
//___3. [FIXED] when 1/x clicked, for value 0 it shows NaN
//___4. [FIXED] 1/x really bugged! 1. any number, 2. click 1/x, 3. any number, 4. click 1/x and then crazy "stuff" happen... 
//___5. [fix] work with CSS and arrange the keys correctly & DRY
//___6. [ADDED] add negative numbers handling to square root
//___7. [add] handling numpads
//___8. [add] documentation: README & comments
//___9. [fix] number -> multiplication -> equal -> CE -> equal => getting wrong result, too big numbers


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
kCE.addEventListener('click', () => { clearEntry() });
kBackspace.addEventListener('click', () => { keyBackspace(); });
kPlus.addEventListener('click', () => { keyOperation(1); equalPressed = false; });
kMinus.addEventListener('click', () => { keyOperation(2); equalPressed = false; });
kMultiply.addEventListener('click', () => { keyOperation(3); equalPressed = false; });
kDivide.addEventListener('click', () => { keyOperation(4); equalPressed = false; });
kPercent.addEventListener('click', () => { keyPercent(); equalPressed = false; });
kReverse.addEventListener('click', () => { keyReverse(); });
kSqrt.addEventListener('click', () => { keySqrt(); equalPressed = false });
k1x.addEventListener('click', () => { key1x(); equalPressed = true; });
kEqual.addEventListener('click', () => { equalPressed = true; keyOperation(9) });


//___Variables___
var tempNumber = null;
var previousOperation = 0;
var result = null;
var equalPressed = false;
var percentPressed = false;
var percentValue = null;
var commaOn = false;        //Used for inserting float numbers.
var orderOfMagnitude = 1;   //Used for inserting float numbers.
var lockKeys = false;

//___Functions___
function keyNr(nr) {
    if (lockKeys == false) {
        if (equalPressed == true) { tempNumber = null; result = null; equalPressed = false; previousOperation = 0 };
        if (commaOn == false) {
            tempNumber = tempNumber * 10 + nr;
        }
        else {
            tempNumber = tempNumber + nr / Math.pow(10, orderOfMagnitude);
            orderOfMagnitude++;
            console.log("oOM: " + orderOfMagnitude);
        }
        document.querySelector('#result').innerHTML = tempNumber.toFixed(orderOfMagnitude - 1);
    }
}
function keyBackspace() {
    if (equalPressed == false) {
        if (commaOn == false) {
            tempNumber = Math.floor(tempNumber / 10);
        }
        else {
            orderOfMagnitude--;
            console.log("oOM: " + orderOfMagnitude);
            tempNumber = (Math.floor(tempNumber * Math.pow(10, orderOfMagnitude - 1))) * 1 / Math.pow(10, orderOfMagnitude - 1);
            if (orderOfMagnitude == 1) { commaOn = false }
        }
        document.querySelector('#result').innerHTML = tempNumber.toFixed(orderOfMagnitude - 1);
    }
}
function keyOperation(opNr) {
    if (lockKeys == false) {
        commaOn = false;
        // orderOfMagnitude = 1;
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
                    if (equalPressed == true && tempNumber === null) {
                        tempNumber = result;
                        result *= tempNumber;
                    }
                    else {
                        result *= tempNumber;
                    }
                    break;
                case 4:
                    if (tempNumber == 0) {
                        result = "You can't divide by 0!";
                        lockKeys = true;
                    }
                    else {
                        result /= tempNumber;
                    };
                    break;
                default:
                    alert("function keyOperation: case error!!")
                    break;
            }
        }
        if (opNr < 9) {

            previousOperation = opNr;
            tempNumber = null;
        }
        showOperationResult(result);
        console.log("Result: ", result);
        orderOfMagnitude = 1;
    }
}

function keySqrt() {
    if (lockKeys == false) {
        if (equalPressed == true && result >= 0) {
            result = Math.sqrt(result);
        }
        else if (equalPressed == false && tempNumber >= 0) {
            result = Math.sqrt(tempNumber);
        }
        else { result = "Invalid input!" }
        tempNumber = result;
        orderOfMagnitude = 1;
        showOperationResult(result);
    }
}

function keyReverse() {
    if (lockKeys == false) {
        if (equalPressed == true) {
            result *= -1;
            showOperationResult(result);
        }
        else {
            tempNumber *= -1;
            showOperationResult(tempNumber);
        }
    }
}

function key1x() {
    if (lockKeys == false) {
        if (equalPressed == true || (result != null && tempNumber == null)) {
            if (result == 0 || result == NaN || result == null) {
                result = "You can't divide by 0!";
                lockKeys = true;
            }
            else {
                result = 1 / result;
            };
        }
        else {
            if (tempNumber == 0 || tempNumber == NaN || tempNumber == null) {
                result = "You can't divide by 0!";
                lockKeys = true;
            }
            else {
                result = 1 / tempNumber;
            }
        }
        tempNumber = result;
        showOperationResult(result);
        orderOfMagnitude = 1;
    }
}

function keyPercent() {
    if (lockKeys == false) {
        if (percentPressed == false) {
            percentValue = (tempNumber / 100) * result;
        }
        switch (previousOperation) {
            case 0:
                result = 0;
                break;
            case 1:
                result += percentValue;
                break;
            case 2:
                result -= percentValue;
                break;
            case 3:
                result *= percentValue;
                break;
            case 4:
                result /= percentValue;
                break;
            default:
                alert("error! function keyPercent: case error!!")
                break;
        }
        percentPressed = true;
        tempNumber = null;
        orderOfMagnitude = 1;
        showOperationResult(result);
    }
}

function showOperationResult(res) {
    if (typeof res === "string") {
        document.querySelector('#result').innerHTML = res;
    }
    else {
        document.querySelector('#result').innerHTML = (Math.round(res * Math.pow(10, 14))) / Math.pow(10, 14);
    }
}

function clearAll() {
    tempNumber = null;
    previousOperation = 0;
    result = null;
    equalPressed = false;
    commaOn = false;
    orderOfMagnitude = 1;
    lockKeys = false;
    percentPressed = false;
    showOperationResult(result);
}

function clearEntry() {
    tempNumber = null;
    commaOn = false;
    orderOfMagnitude = 1;
    lockKeys = false;
    showOperationResult(0);
}



//___quick copy to console in web browser
console.log("tempNumber: " + tempNumber)
console.log("result: " + result)