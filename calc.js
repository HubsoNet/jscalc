//  JS-Calculator by Hubson 2022
//  TO DO LIST:
//  1. [add] Handling numpads on PC/notebook keyboard.

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

//  Variables
let tempNumber = null;
let previousOperation = 0;
let result = null;
let equalPressed = false;
let percentPressed = false;
let percentValue = null;
let commaOn = false;
let orderOfMagnitude = 1;
let lockKeys = false;
let operationString = '';
let operationSymbol = null;
let sqrtPressed = false;
let commaPassResult = null;
let pressedNr = null;
let operationActive = false;
let tempOperation = null;
let preSqrtResult = null;
let reciprocalPressed = false;

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
kComma.addEventListener('click', () => {
  commaOn = true;
  if (tempNumber === null) {
    showOperationResult('0.');
  } else {
    commaPassResult = `${tempNumber}.`;
    showOperationResult(commaPassResult);
  }
});

//  Operation keys
kC.addEventListener('click', () => { clearAll(); });
kCE.addEventListener('click', () => { clearEntry(); });
kBackspace.addEventListener('click', () => { keyBackspace(); });
kPlus.addEventListener('click', () => { operationSymbol = ' + '; keyOperation(1); equalPressed = false; });
kMinus.addEventListener('click', () => { operationSymbol = ' - '; keyOperation(2); equalPressed = false; });
kMultiply.addEventListener('click', () => { operationSymbol = ' * '; keyOperation(3); equalPressed = false; });
kDivide.addEventListener('click', () => { operationSymbol = ' / '; keyOperation(4); equalPressed = false; });
kPercent.addEventListener('click', () => { operationSymbol = ' % '; keyPercent(); equalPressed = false; });
kReverse.addEventListener('click', () => { operationSymbol = 'reverse'; keyReverse(); });
kSqrt.addEventListener('click', () => { sqrtPressed = true; operationSymbol = 'sqrt'; keySqrt(); equalPressed = false; });
k1x.addEventListener('click', () => { reciprocalPressed = true; operationSymbol = 'reciprocal'; key1x(); operationSymbol = null; equalPressed = true; });
kEqual.addEventListener('click', () => { equalPressed = true; keyOperation(9); operationSymbol = null; document.querySelector('#operations').innerHTML = ''; operationString = ''; });

//  Functions
function keyNr(nr) {
  if (lockKeys === false) {
    operationActive = false;
    pressedNr = nr;
    if (equalPressed === true) {
      tempNumber = null;
      result = null;
      percentPressed = false;
      equalPressed = false;
      previousOperation = 0;
    }
    if (percentPressed === true) {
      percentPressed = false;
      operationString = '';
      document.querySelector('#operations').innerHTML = '';
      tempNumber = null;
      result = null;
    }
    if (commaOn === false) {
      tempNumber = tempNumber * 10 + nr;
    } else {
      if (tempNumber === null) tempNumber = 0;
      tempNumber += nr / 10 ** orderOfMagnitude;
      orderOfMagnitude += 1;
    }
    document.querySelector('#result').innerHTML = tempNumber.toFixed(orderOfMagnitude - 1);
  }
}

function keyBackspace() {
  if (equalPressed === false) {
    if (commaOn === false) {
      tempNumber = Math.floor(tempNumber / 10);
    } else {
      orderOfMagnitude -= 1;
      tempNumber = (Math.floor(tempNumber * 10 ** (orderOfMagnitude - 1)));
      tempNumber *= (1 / (10 ** (orderOfMagnitude - 1)));
      if (orderOfMagnitude === 1) { commaOn = false; }
    }
    document.querySelector('#result').innerHTML = tempNumber.toFixed(orderOfMagnitude - 1);
  }
}

function keyOperation(opNr) {
  if (lockKeys === false) {
    commaOn = false;
    if (percentPressed === true) {
      tempNumber = percentValue;
      operationString = '';
    }
    if (reciprocalPressed === true && equalPressed === true) {
      tempNumber = result;
      reciprocalPressed = false;
      showOperationResult(result);
      return;
    }
    if (equalPressed === false || opNr > 8) {
      if (operationActive === true && equalPressed === false) {
        tempOperation = previousOperation;
        previousOperation = 7;
      }
      switch (previousOperation) {
        case 0:
          result = tempNumber;
          break;
        case 1:
          if (equalPressed === true && tempNumber === null) {
            tempNumber = result;
          }
          result += tempNumber;
          break;
        case 2:
          if (equalPressed === true && tempNumber === null) {
            tempNumber = result;
          }
          result -= tempNumber;
          break;
        case 3:
          if (equalPressed === true && tempNumber === null) {
            tempNumber = result;
          }
          result *= tempNumber;
          break;
        case 4:
          if (tempNumber === 0) {
            result = "You can't divide by 0!";
            lockKeys = true;
            operationSymbol = '';
          } else {
            if (equalPressed === true && tempNumber === null) {
              tempNumber = result;
            }
            result /= tempNumber;
          }
          break;
        default:
          previousOperation = tempOperation;
          break;
      }
    }
    if (tempNumber !== null) tempNumber = (Math.round(tempNumber * 10 ** 14)) / 10 ** 14;
    if (result !== null) result = (Math.round(result * 10 ** 14)) / 10 ** 14;
    showOperationString();
    if (opNr < 9) {
      previousOperation = opNr;
      tempNumber = null;
    }
    showOperationResult(result);
    orderOfMagnitude = 1;
    if (opNr < 9) operationActive = true;
    percentPressed = false;
  }
}

function keySqrt() {
  if (lockKeys === false) {
    preSqrtResult = tempNumber;
    if (equalPressed === true) preSqrtResult = result;
    if (result === null) preSqrtResult = tempNumber;
    if (equalPressed === true && result >= 0) {
      result = Math.sqrt(result);
    } else if (equalPressed === false && tempNumber >= 0) {
      result = Math.sqrt(tempNumber);
    } else { result = 'Invalid input!'; }
    showOperationString();
    tempNumber = result;

    orderOfMagnitude = 1;
    showOperationResult(result);
    sqrtPressed = false;
  }
}

function keyReverse() {
  let reversedOutput;
  if (lockKeys === false) {
    if (equalPressed === true) {
      result *= -1;
      reversedOutput = result;
    } else {
      tempNumber *= -1;
      reversedOutput = tempNumber;
    }
    showOperationResult(reversedOutput);
    showOperationString();
  }
}

function key1x() {
  if (lockKeys === false) {
    if (equalPressed === true || (result !== null && tempNumber === null)) {
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
    showOperationResult(result);
    orderOfMagnitude = 1;
    showOperationString();
  }
}

function keyPercent() {
  if (lockKeys === false) {
    if (percentPressed === false) {
      percentValue = (Math.round(((tempNumber / 100) * result) * 10 ** 14)) / 10 ** 14;
    } else return;
    percentPressed = true;
    showOperationString();
    tempNumber = null;
    orderOfMagnitude = 1;
    showOperationResult(percentValue);
  }
}

function showOperationResult(res) {
  if (typeof res === 'string') {
    document.querySelector('#result').innerHTML = res;
  } else {
    document.querySelector('#result').innerHTML = (Math.round(res * 10 ** 14)) / 10 ** 14;
  }
}

function showOperationString() {
  if (tempNumber === null && result === null) {
    switch (previousOperation) {
      case 0:
        operationString = 0 + operationSymbol;
        break;
      default:
        return;
    }
  }
  if (equalPressed === true && sqrtPressed === false && previousOperation < 9 && operationSymbol !== 'reciprocal') {
    operationString = result + operationSymbol;
  } else {
    switch (operationSymbol) {
      case ' + ':
      case ' - ':
      case ' * ':
      case ' / ':
        if (sqrtPressed === true) {
          operationString = tempNumber + operationSymbol;
        } else if (tempNumber != null && pressedNr != null) {
          operationString += tempNumber + operationSymbol;
        } else if (percentPressed === true) {
          operationString = result + operationSymbol;
        } else {
          operationString = (operationString.slice(0, -3)) + operationSymbol;
          tempNumber = null;
        }
        break;
      case 'sqrt':
        if (tempNumber === null) { preSqrtResult = 0; }
        operationString = `sqrt(${preSqrtResult})`;
        break;
      case 'reciprocal':
        if (result === "You can't divide by 0!") {
          operationString = `${operationSymbol}(0)`;
        } else {
          operationString = `${operationSymbol}(${1 / result})`;
        }
        break;
      case ' % ':
        operationString += percentValue;
        break;
      case 'reverse':
        break;
      default:
        operationString = '';
        break;
    }
  }
  document.querySelector('#operations').innerHTML = operationString;
  operationSymbol = null;
  pressedNr = null;
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
  percentValue = null;
  operationSymbol = null;
  operationString = '';
  pressedNr = null;
  operationActive = false;
  sqrtPressed = false;
  commaPassResult = null;
  tempOperation = null;
  preSqrtResult = null;
  reciprocalPressed = false;
  showOperationResult(result);
  document.querySelector('#operations').innerText = '';
}

function clearEntry() {
  tempNumber = null;
  commaOn = false;
  orderOfMagnitude = 1;
  lockKeys = false;
  equalPressed = false;
  result = null;
  showOperationResult(0);
}
