import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";

let equation = [];

function App() {
  const [key, setKey] = useState(null);
  const [output, setOutput] = useState("0");
  const [operand, setOperand] = useState("0");
  const [outputCalculated, setOutputCalculated] = useState(false);

  // f to recover clicked button value
  const recoverKey = (k) => {
    console.log("recoverKey - called");
    setKey(k);
  };
  // f reset key state
  const resetKey = () => {
    console.log("resetKey - called");
    setKey(null);
  };
  // f to handle clicked key
  const handleKey = (key) => {
    console.log("handleKey - called");
    switch (key) {
      // clear calculator
      case "AC":
        console.log("input AC:");
        setOutput("0");
        setOperand("0");
        setOutputCalculated(false);
        equation = [];
        break;
      // decimal
      case ".":
        console.log("input .:");
        // check if previous output is calculated and prevent modification of the result
        if (outputCalculated) {
          break;
        }
        //check previous input type
        switch (output) {
          // when previous was operator or 0 take . as 0.
          case "+":
          case "-":
          case "*":
          case "/":
          case "0":
            console.log("input .: previous data was operator or 0");
            setOutput("0.");
            setOperand("0.");
            break;
          // when previous is any non-0 number build decimal number
          default:
            console.log("input .: previous data was non-0 number");
            // if . already present allow only one .
            if (output.indexOf(".") !== -1) {
              console.log(
                "input .: previous data was non-0 number; . already present - breaking"
              );
              break;
            } else {
              setOutput(output + key);
              setOperand(output + key);
              break;
            }
        }
        break;
      // numbers
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
        console.log("input 0-9:");
        // check if previous output is calculated to prevent modification of the number
        if (outputCalculated) {
          break;
        }
        //check previous input type
        switch (output) {
          // when previous was an operator reset output so only the new digit is shown
          case "+":
          case "-":
          case "*":
          case "/":
            console.log("input 0-9: previous data was operator");
            setOutput(key);
            setOperand(key);
            break;
          // when previous was not an operator build number
          default:
            console.log("input 0-9: previous data was digit");
            // allow only one initial 0
            if (output === "0") {
              console.log(
                "input 0-9: previous data was digit: allow only one initial 0"
              );
              setOutput(key);
              setOperand(key);
            }
            // allow multiple digits number
            else {
              console.log(
                "input 0-9: previous data was digit: allow multiple digits number"
              );
              // build number pushing new char
              setOutput(output + key);
              setOperand(output + key);
            }
        }
        break;
      // operators
      case "+":
      case "-":
      case "*":
      case "/":
        console.log("input operator:");
        // reset state of calculated if needed
        if (outputCalculated) {
          setOutputCalculated(!outputCalculated);
        }

        //check if previous input was an operator
        switch (output) {
          // when previous was an operator substitute by new operator
          case "+":
          case "-":
          case "*":
          case "/":
            console.log(
              "input operator: previous was operator - eliminate and subsitute"
            );
            equation.pop();
            equation.push(key);
            break;
          // when previous was 0. complete as 0.0
          case "0.":
            equation.push("0.0");
            equation.push(key);
            break;
          default:
            // when previous was a number push as operand into equation
            console.log(
              "input operator: previous was number . push operand and operator into array"
            );
            equation.push(operand);
            equation.push(key);
            break;
        }
        // finally update output to show only operator
        console.log("input operator: finally - push current output into array");
        setOutput(key);
        break;
      // = solveEquation
      case "=":
        console.log("input =");
        // store pending output
        equation.push(output);
        // clean orphaned operators
        cleanEquation();
        // calculate
        const result = solveEquation().toString(10);
        console.log(`result: ${result}`);
        setOutput(result);
        setOperand(result);
        // mark as calculated output to prevent modification, unless its 0
        if (result !== "0") {
          setOutputCalculated(true);
        } else {
          setOutputCalculated(false);
        }
        // reset eq
        equation = [];
        break;
      default:
        break;
    }
    // reset states so next digits can be entered
    resetKey();
  };

  // f to clean eq array
  const cleanEquation = () => {
    console.log("cleanEquation - called");
    switch (equation[equation.length - 1]) {
      // if last element is an operator delete it
      case "+":
      case "-":
      case "*":
      case "/":
        console.log("cleanEquation - last element orphan operator");
        equation.pop();
        break;
      // otehrwise break
      default:
        console.log("cleanEquation - break");
        break;
    }
  };

  // f to solve eq on pressing =
  const solveEquation = () => {
    console.log("solveEquation - called");
    // asign and convert to type number
    const a = Number(equation[0]);
    const op = equation[1];
    const b = Number(equation[2]);
    console.log(`a: ${a}; op: ${op}; b: ${b};`);
    if (equation.length === 3) {
      console.log("solveEquation: equation length is 3; calculating");
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return a / b;
        default:
          return 0;
      }
    }
    console.log("solveEquation: equation length is NOT 3; returning 0");
    return 0;
  };

  // ef to auto run handleKey when user clicks a button
  useEffect(() => handleKey(key), [key]);

  useEffect(() => console.log(equation), [key, outputCalculated]);
  // ef to solve as user inputs new operands

  return (
    <>
      <header>Calculator</header>
      <main>
        <article className="calculator">
          <div id="display">
            <p id="log">{equation}</p>
            <p id="output">{output}</p>
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
