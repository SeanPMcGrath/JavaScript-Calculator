//Currently not passing all the tests, but the calculator gives the right results when each test is done manually and seems to function correctly in general.

//Might consider making the calculator actually look like a simple angled desk calculator using transform in the css

//Initial Variable Declarations
let inProssNum = "";
let prevNum = "";
let currNum = "";
let nextOpp = "";
let inProssCalc = "";
let equalProcessDisplay = "";

function inputButton(buttonContent) {
  if (buttonContent === 0) {
    if (inProssNum.length > 0) {
      if (inProssNum[0] === "0") {
        //prohibit consecutive starting zeros        
        if (inProssNum.length > 1 && inProssNum[1] === ".") {
          //allow consecutive zeros after decimal if first digit is 0          
          inProssNum += "0";
        }
      } else {
        inProssNum += "0";
      }
    } else {
      inProssNum = "0";
    }
  } else if (buttonContent === ".") {
    if (inProssNum.indexOf(".") === -1) {
      //check for decimal points
      if (inProssNum === "") {
        //put 0 before decimal if decimal is pressed first
        inProssNum += "0";
      }
      inProssNum += ".";
    }
  } else {
    if (inProssNum === "0") {
      //prohibit number from starting with 0 (0. still allowed with the code above)
      inProssNum = "";
    }
    inProssNum += buttonContent; //concat pressed number if allowed
    if (equalProcessDisplay !== "") {
      //clear in process display after equal button if not operating on answer
      equalProcessDisplay = "";
      $("#processDisplay").attr("placeholder", "");
    }
  }
  $("#display").attr("placeholder", inProssNum); //display new in process number
}

function oppButton(buttonOpp) {
  if (inProssNum === "") {//Do nothing if no numbers inputted
    if (nextOpp !== "" || prevNum !== "") {//Switch operation if two op buttons pressed in a row (1st condition) / do opperation to previous equal button answer (2nd condition)
      nextOpp = buttonOpp;
      inProssCalc = inProssCalc.slice(0, inProssCalc.length - 1 - prevNum.length); //trim string of previous operator and avoid reprinting calculated answer 
      equalProcessDisplay = "";
      displayPross(prevNum + buttonOpp);
    }
  } else
  if (nextOpp === "") {
    //for the first operator press on the first inputed number after start, or after an inouted number after a calculated answer
    nextOpp = buttonOpp;
    prevNum = parseFloat(inProssNum);
    displayPross(inProssNum + buttonOpp);
    inProssNum = "";
  } else
  if (prevNum !== "") {
    //for subsequent operator presses on inputed numbers. Does math and logs next operator
    displayPross(inProssNum + buttonOpp);
    currNum = parseFloat(inProssNum);
    prevNum = mathOpps(nextOpp);
    nextOpp = buttonOpp;
  }
}

function equalButton() {
  if (inProssNum !== "" && nextOpp !== "" && prevNum !== "") {
    currNum = parseFloat(inProssNum);
    displayPross(inProssNum);
    prevNum = mathOpps(nextOpp);
    equalProcessDisplay = inProssCalc + "=" + prevNum; //allows calculation to stay displayed until new buttons are pressed. Lets inProssCalc get cleared here instead of in the different buttton press functions
    $("#processDisplay").attr("placeholder", equalProcessDisplay);
    inProssCalc = "";
    nextOpp = "";
  }
}

function mathOpps(nextOpp) {
  let answer = "";
  if (nextOpp === "+") {
    answer = prevNum + currNum;
  }
  if (nextOpp === "-") {
    answer = prevNum - currNum;
  }
  if (nextOpp === "*") {
    answer = prevNum * currNum;
  }
  if (nextOpp === "/") {
    answer = prevNum / currNum;
  }
  $("#display").attr("placeholder", answer);
  inProssNum = "";
  return answer;
}

function displayPross(addition) {
  inProssCalc += addition;
  $("#processDisplay").attr("placeholder", inProssCalc);
}

function clearCurrent() {
  inProssNum = "";
  $("#display").attr("placeholder", "0");
}

function clearEverything() {
  clearCurrent();
  prevNum = "";
  currNum = "";
  nextOpp = "";
  inProssCalc = "";
  equalProcessDisplay = "";
  $("#processDisplay").attr("placeholder", "");
}