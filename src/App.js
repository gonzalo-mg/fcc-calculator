import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";

// storage of strings to build numbers and UI display
let memory = "0";
let display ="0";

function App() {
  // user input
  const [key, setKey] = useState(null);
  // mark displayed number as result of previous calculation to prevent modification by inputing new digits
  const [displayCalculated, setDisplayCalculated] = useState(false);


  // f to recover clicked button value
  const recoverKey = (clickedKey) => {
    setKey(clickedKey);
  };
  // f reset key state
  const resetKey = () => {
    setKey(null);
  };

  // f to compute calculation
  const evaluate = (expresion) => {
    return eval(expresion);
  }

  // f to handle clicked key
  const handleKey = (key) => {
    console.log(`handleKey - called with key: ${key}`);
    console.log(`handleKey - called with memory: ${memory}`);

     // check if second-last input was operator ; allow only 2 consecutive operators
     const lastChar = memory.length-1;
     const secondLastChar = lastChar-1;
     const thirdLastChar = secondLastChar-1;
     const previousOperator = memory.slice(lastChar);
     const previous2Operator = memory.slice(secondLastChar, lastChar);
     const previous3Operator = memory.slice(thirdLastChar, secondLastChar);
     console.log(`previousOperator: ${previousOperator}`)
     console.log(`previous2Operator: ${previous2Operator}`)
     console.log(`previous3Operator: ${previous3Operator}`)

    switch (key) {
      case null:
        return undefined;
      // input "AC"
      case "AC":
        setDisplayCalculated(false);
        memory = "0";
        display = "0";
        break;
      // input "."
      case ".":
        // check if display is calculated and if so prevent modification of the result
        if (displayCalculated) {
          break;
        }
        //check last input type
        switch (display.slice(-1)) {
          // when it is operator or 0 input "." as "0."
          case "+":
          case "-":
          case "*":
          case "/":
          case "0":
            console.log("previous was operator or 0");
            memory = "0.0";
            display = "0.0"
            break;
          // when it is any non-0 number build decimal number
          default:
            console.log("previous was non-0 number");
            // if "." already present do not allow another one "."
            if (display.indexOf(".") !== -1) {
              console.log("decimal . already present: breaking");
              break;
            }
            // otherwise build decimal number
            else {
              display += key;
              memory += key;
              break;
            }
        }
        break;
      // input new digit
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
        console.log(`input ${key}`)
        // check if current output is calculated to prevent modification of the number
        if (displayCalculated) {
          break;
        }
        //check last input
        switch (display) {
          // when it is an operator
          case "+":
          case "-":  
          case "*":
          case "/":
            console.log("previous was operator");
            // reset display to show only new digit and start building number
            display = key;
            memory += key;
            break;
          // when it is 0
          case "0":
            console.log("previous was 0");
            display = key;
            // delete initial 0
            memory = key;
            break;
          // otherwise keep building number
          default:
            console.log("previous was digit");
            // build number pushing new char
            display += key;
            memory += key;
            break;
        }
        break;
      // input operator
      case "+":
      case "*":
      case "/":
        console.log(`input ${key}`)
        if (displayCalculated) {
          // reset state of calculated
          setDisplayCalculated(!displayCalculated);
          // turn previous solution as memory default (resets visual log to previous solution)
          memory = display;
        }
        //check if previous input was an operator
        switch (display) {
          // substitute by new operator
          case "+":
          case "*":
          case "/":
            console.log("previous was operator +*/ ; eliminate and subsitute with new operator");
            display = key;
            // remove previous operator
            memory = memory.slice(0,-1);
            // add current
            memory += key;
            break;
          // AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII  al introducir +- y luego un nuevo operador qeda ++ lo q no es computable
          case "-":
            // +- > +*
            console.log("previous was operator - ; eliminate and subsitute all inmediate operators with new operator");
            display = key;
            // remove previous operators
            if (typeof previous2Operator !== "number"){
              // two if user was building negative number (prevents 2 operators with no -)
              memory = memory.slice(0,-2);
            } else {
              memory = memory.slice(0,-1);
            }
            // add current operatpr
            memory += key;
            break;
          default:
            // when previous was a number keep building expression
            console.log(
              "previous was number"
            );
            display = key;
            memory += key;
            break;
        }
        break;
      // input - operator
      case "-":
        console.log(`input ${key}`)
        if (displayCalculated) {
          // reset state of calculated
          setDisplayCalculated(!displayCalculated);
          // turn previous solution as memory default (resets visual log to previous solution)
          memory = display;
        }
        //check if last input was an operator
        switch (display) {
          // keep both operators to build negative numbers
          case "+":
          case "*":
          case "/":
            console.log(`last input was operator: ${display}`)
            display = key;
            memory += key;
            break;
          case "-":
            console.log(`last input was operator: ${display}`)
            // allow max 2 consecutive operators
            if(typeof previous2Operator === "number"){
              break;
            }
            // allow max 2 consecutive --
            if(previousOperator === "-"){
              break;
            }
            display = key;
            memory += key;
            break;
          default:
            display = key;
            memory += key;
            break;
      }
      break;
      // compute
      case "=":
        console.log(`input ${key}`)
        const solution = evaluate(memory);
        display = solution;
        memory += key+solution
        setDisplayCalculated(true);
        break;
      default:
        break;
    }

    console.log(`handleKey - exits with equation: ${memory}`);

    // reset states so next inputs can be entered
    resetKey();
  };

  // effect to auto run handleKey when user clicks a button
  useEffect(() => handleKey(key), [key]);

  return (
    <>
      <header>Calculator</header>
      <main>
        <article id="calculator">
          <div id="screen">
            <p id="log">{memory}</p>
            <p id="display">{display}</p>
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
