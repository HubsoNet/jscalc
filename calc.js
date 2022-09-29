//  Meme JS-Calculator by Hubson 2022
//  TO DO LIST:
//  1. [ADDED] inserting number, clicking multiply then equal causes multipling in a loop
//  2. [FIXED] error with clicking equal after result then clicking any number
//  3. [FIXED] when 1/x clicked, for value 0 it shows NaN
//  4. [FIXED] 1/x really bugged! 1. any number, 2. click 1/x, 3. any number, 4. click 1/x and then crazy "stuff" happen...
//  5. [FIXED] work with CSS and arrange the keys correctly & DRY
//  6. [ADDED] add negative numbers handling to square root
//  7. [add] handling numpads
//  8. [add] documentation: README & comments
//  9. [fix] number -> multiplication -> equal -> CE -> equal => getting wrong result, too big numbers

// Variables for all the keys
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

//  Number keys
k0.addEventListener('click', () => { keyNr(0); });
k1.addEventListener('click', () => { keyNr(1); });
k2.addEventListener('click', () => { keyNr(2); });
k3.addEventListener('click', () => { keyNr(3); });
k4.addEventListener('click', () => { keyNr(4); });
k5.addEventListener('click', () => { keyNr(5); });
k6.addEventListener('click', () => { keyNr(6); });
k7.addEventListener('click', () => { keyNr(7); });
k8.addEventListener('click', () => { keyNr(8); });
k9.addEventListener('click', () => { keyNr(9); });
kComma.addEventListener('click', () => { commaOn = true; });

//  Variables
let tempNumber = null;
let previousOperation = 0;
let result = null;
let equalPressed = false;
let percentPressed = false;
let percentValue = null;
var commaOn = false; // Used for inserting float numbers.
let orderOfMagnitude = 1; // Used for inserting float numbers.
let lockKeys = false;
let operationString = '';
let operationSymbol = '';

//  Operation keys
kC.addEventListener('click', () => { clearAll(); });
kCE.addEventListener('click', () => { clearEntry(); });
kBackspace.addEventListener('click', () => { keyBackspace(); });
kPlus.addEventListener('click', () => { keyOperation(1); equalPressed = false; });
kMinus.addEventListener('click', () => { keyOperation(2); equalPressed = false; });
kMultiply.addEventListener('click', () => { keyOperation(3); equalPressed = false; });
kDivide.addEventListener('click', () => { keyOperation(4); equalPressed = false; });
kPercent.addEventListener('click', () => { keyPercent(); equalPressed = false; });
kReverse.addEventListener('click', () => { keyReverse(); });
kSqrt.addEventListener('click', () => { keySqrt(); equalPressed = false; });
k1x.addEventListener('click', () => { key1x(); equalPressed = true; });
kEqual.addEventListener('click', () => { equalPressed = true; keyOperation(9); });

//  Functions
function keyNr(nr) {
  if (lockKeys === false) {
    if (equalPressed == true) { tempNumber = null; result = null; equalPressed = false; previousOperation = 0; }
    if (commaOn === false) {
      tempNumber = tempNumber * 10 + nr;
    } else {
      tempNumber += nr / 10 ** orderOfMagnitude;
      orderOfMagnitude++;
      console.log(`oOM: ${orderOfMagnitude}`);
    }
    document.querySelector('#result').innerHTML = tempNumber.toFixed(orderOfMagnitude - 1);
  }
}
function keyBackspace() {
  if (equalPressed === false) {
    if (commaOn === false) {
      tempNumber = Math.floor(tempNumber / 10);
    } else {
      orderOfMagnitude--;
      console.log(`oOM: ${orderOfMagnitude}`);
      tempNumber = (Math.floor(tempNumber * 10 ** (orderOfMagnitude - 1))) * 1 / 10 ** (orderOfMagnitude - 1);
      if (orderOfMagnitude == 1) { commaOn = false; }
    }
    document.querySelector('#result').innerHTML = tempNumber.toFixed(orderOfMagnitude - 1);
  }
}
function keyOperation(opNr) {
  if (lockKeys == false) {
    commaOn = false;
    // orderOfMagnitude = 1;
    if (equalPressed === false || opNr > 8) {
      switch (previousOperation) {
        case 0:
          result = tempNumber;
          break;
        case 1:
          result += tempNumber;
          operationSymbol = '+';
          break;
        case 2:
          result -= tempNumber;
          operationSymbol = '-';
          break;
        case 3:
          if (equalPressed === true && tempNumber === null) {
            tempNumber = result;
            result *= tempNumber;
          } else {
            result *= tempNumber;
          }
          operationSymbol = '*';
          break;
        case 4:
          if (tempNumber === 0) {
            result = "You can't divide by 0!";
            lockKeys = true;
          } else {
            result /= tempNumber;
          }
          operationSymbol = '/';
          break;
        default:
          break;
      }
    }
    if (opNr < 9) {
      previousOperation = opNr;
      tempNumber = null;
    }
    showOperationResult(result);
    orderOfMagnitude = 1;
  }
}

function keySqrt() {
  if (lockKeys === false) {
    if (equalPressed === true && result >= 0) {
      result = Math.sqrt(result);
    } else if (equalPressed === false && tempNumber >= 0) {
      result = Math.sqrt(tempNumber);
    } else { result = 'Invalid input!'; }
    tempNumber = result;
    orderOfMagnitude = 1;
    showOperationResult(result);
  }
}

function keyReverse() {
  if (lockKeys === false) {
    if (equalPressed === true) {
      result *= -1;
      showOperationResult(result);
    } else {
      tempNumber *= -1;
      showOperationResult(tempNumber);
    }
  }
}

function key1x() {
  if (lockKeys === false) {
    if (equalPressed === true || (result != null && tempNumber == null)) {
      if (result === 0 || Number.isNaN(result) || result == null) {
        result = "You can't divide by 0!";
        lockKeys = true;
      } else {
        result = 1 / result;
      }
    } else if (tempNumber === 0 || Number.isNaN(tempNumber) || tempNumber === null) {
      result = "You can't divide by 0!";
      lockKeys = true;
    } else {
      result = 1 / tempNumber;
    }
    tempNumber = result;
    showOperationResult(result);
    orderOfMagnitude = 1;
  }
}

function keyPercent() {
  if (lockKeys === false) {
    if (percentPressed === false) {
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
        alert('error! function keyPercent: case error!!');
        break;
    }
    percentPressed = true;
    tempNumber = null;
    orderOfMagnitude = 1;
    showOperationResult(result);
  }
}

function showOperationResult(res) {
  let operationResultVar = document.querySelector('#result').innerHTML;
  if (typeof res === 'string') {
    operationResultVar = res;
  } else {
    operationResultVar = (Math.round(res * 10 ** 14)) / 10 ** 14;
  }
}

function showOperationString(number, operation) {
  if (previousOperation !== 0) {
    operationString += 'a';
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

//  quick copy to console in web browser
console.log(`tempNumber: ${tempNumber}`);
console.log(`result:  + ${result}`);
