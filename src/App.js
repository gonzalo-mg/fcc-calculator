import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";

// storage of final numbers and operators
let mainMemory = [];
// storage of strings to build numbers and UI display
let displayMemory = "0";

function App() {
  // user input
  const [key, setKey] = useState(null);
  // mark displayed number as result of previous calculation to prevent modification by inputing new digits
  const [outputCalculated, setOutputCalculated] = useState(false);
  // mark as building negative number
  const [negativeNumber, setNegativeNumber] = useState(false);

  // f to recover clicked button value
  const recoverKey = (clickedKey) => {
    setKey(clickedKey);
  };
  // f reset key state
  const resetKey = () => {
    setKey(null);
  };

  // f to clean mainMemory of operators without numbers to apply to
  const deleteOrphanOperators = () => {
    console.log("deleteOrphanOperators - called");
    switch (mainMemory[mainMemory.length - 1]) {
      // if last element is an operator delete it
      case "+":
      case "-":
      case "*":
      case "/":
        mainMemory.pop();
        break;
      // otherwise do nothing
      default:
        break;
    }
    console.log("deleteOrphanOperators - returns:");
    console.log(mainMemory);
  };

  // f to compute calculation
  const calculate = (digit1, operator, digit2) => {
    console.log("calculate - called");
    // asign and convert to type number
    const a = Number(digit1);
    const b = Number(digit2);
    console.log(
      `calculate parameters; a: ${a}; operator: ${operator}; b: ${b};`
    );
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b !== 0) {
          return a / b;
        } else {
          return Infinity;
        }
      default:
        return undefined;
    }
  };

  // f to solve mainMemory on pressing =
  const solveMainMemory = () => {
    console.log("solveMainMemory - called");

    deleteOrphanOperators();

    // take first 3 elements: digit-operator-digit and compute
    let result = calculate(mainMemory[0], mainMemory[1], mainMemory[2]);
    // while elements in array take next elements 2 by 2: operator-digit
    for (let e = 3; e < mainMemory.length; e += 2) {
      // compute with parcialResult
      result = calculate(result, mainMemory[e], mainMemory[e + 1]);
    }
    console.log(`solveMainMemory - result:${result}`);
    return result;
  };

  // f to handle clicked key
  const handleKey = (key) => {
    console.log(`handleKey - called with key: ${key}`);
    console.log(`handleKey - called with equation ${mainMemory}`);
    console.log(mainMemory);
    switch (key) {
      case null:
        return undefined;
      // input AC
      case "AC":
        setOutputCalculated(false);
        mainMemory = [];
        displayMemory = "0";
        break;
      // input .
      case ".":
        // check if previous output is calculated and prevent modification of the result
        if (outputCalculated) {
          break;
        }
        //check previous input type
        switch (displayMemory) {
          // when previous input was operator or 0 take . as 0.
          case "+":
          case "-":
          case "*":
          case "/":
          case "0":
            console.log("previous was operator or 0");
            displayMemory = "0.";
            break;
          // when previous input was any non-0 number build decimal number
          default:
            console.log("previous was non-0 number");
            // if . already present allow only one .
            if (displayMemory.indexOf(".") !== -1) {
              console.log("decimal . already present: breaking");
              break;
            }
            // otherwise build decimal number
            else {
              displayMemory += key;
              break;
            }
        }
        break;
      // input digit
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        // check if current output is calculated to prevent modification of the number
        if (outputCalculated) {
          break;
        }
        //check previous input type
        switch (displayMemory) {
          // when previous was an operator, except -
          case "+":
          case "*":
          case "/":
            console.log("previous was operator");
            // reset output so only the new digit is shown
            // start number building
            displayMemory = key;
            break;
          case "0":
            console.log("previous was 0");
            displayMemory = key;
            break;
          // when previous was - operator
          case "-":
            if (negativeNumber) {
              console.log("previous was -; building negative number");
              // build number pushing new char
              displayMemory += key;
              setNegativeNumber(false);
            } else {
              displayMemory = key;
            }
            break;
          // otherwise keep building number
          default:
            console.log("previous was digit");
            // build number pushing new char
            displayMemory += key;
            break;
        }
        break;
      // input operator (except -)
      case "+":
      case "*":
      case "/":
        // reset state of calculated if needed
        if (outputCalculated) {
          setOutputCalculated(!outputCalculated);
        }
        //check if previous input was an operator
        switch (displayMemory) {
          // when previous was an operator substitute by new operator
          case "+":
          case "-":
          case "*":
          case "/":
            console.log("previous was operator - eliminate and subsitute");
            mainMemory.pop();
            mainMemory.push(key);
            displayMemory = key;
            break;
          // when previous was 0. complete as 0.0
          case "0.":
            mainMemory.push("0.0");
            mainMemory.push(key);
            displayMemory = key;
            break;
          default:
            // when previous was a number push as operand into equation
            console.log(
              "previous was number; push operand and operator into array"
            );
            mainMemory.push(displayMemory);
            mainMemory.push(key);
            displayMemory = key;
            break;
        }
        break;
      // input - operator
      case "-":
        // reset state of calculated if needed
        if (outputCalculated) {
          setOutputCalculated(!outputCalculated);
        }
        switch (displayMemory) {
          case "+":
          case "-":
          case "*":
          case "/":
            console.log("previous was operator; build negative number");
            // start building negative number
            setNegativeNumber(true);
            console.log("ready to build negative number");
            displayMemory = key;
            break;
          // when previous was 0. complete as 0.0
          case "0.":
            mainMemory.push("0.0");
            mainMemory.push(key);
            displayMemory = key;
            break;
          default:
            // when previous was a number do regular subtract
            console.log(
              "previous was number; push operand and operator into array"
            );
            mainMemory.push(displayMemory);
            mainMemory.push(key);
            displayMemory = key;
            break;
        }
        break;
      // = solveEquation
      case "=":
        console.log("input =");
        // store pending operand
        mainMemory.push(displayMemory);

        // if not enough elements to solve, do nothing and wait
        if (mainMemory.length < 3) {
          console.log(`not enough elements to solve: ${mainMemory}`);
          break;
        }
        // calculate
        const result = solveMainMemory().toString(10);
        console.log(`result: ${result}`);
        displayMemory = result;
        // mark as calculated output to prevent modification, unless its 0
        if (result !== "0") {
          setOutputCalculated(true);
        } else {
          setOutputCalculated(false);
        }
        // reset mainMemory
        mainMemory = [];
        break;
      default:
        break;
    }

    console.log(`handleKey - exits with equation ${mainMemory}`);
    console.log(mainMemory);

    // reset states so next inputs can be entered
    resetKey();
  };

  // ef to auto run handleKey when user clicks a button
  useEffect(() => handleKey(key), [key]);

  return (
    <>
      <header>Calculator</header>
      <main>
        <article id="calculator">
          <div id="screen">
            <p id="log">{mainMemory}</p>
            <p id="display">{displayMemory}</p>
          </div>
          <div id="keypad">
            <Button
              id="zero"
              label="0"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="one"
              label="1"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="two"
              label="2"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="three"
              label="3"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="four"
              label="4"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="five"
              label="5"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="six"
              label="6"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="seven"
              label="7"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="eight"
              label="8"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="nine"
              label="9"
              className="number"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="decimal"
              label="."
              className="operator"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="add"
              label="+"
              className="operator"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="subtract"
              label="-"
              className="operator"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="multiply"
              label="*"
              className="operator"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="divide"
              label="/"
              className="operator"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="equals"
              label="="
              className="intro"
              recoverKey={recoverKey}
            ></Button>
            <Button
              id="clear"
              label="AC"
              className="intro"
              recoverKey={recoverKey}
            ></Button>
          </div>
        </article>
      </main>
      <footer>Gonzalo M.G.</footer>
    </>
  );
}

export default App;
