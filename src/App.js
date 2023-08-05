import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";

let equation = [];

function App() {
  const [key, setKey] = useState("key");
  const [output, setOutput] = useState("output");
  const [log, setLog] = useState("log");
  const [operand, setOperand] = useState("operand");
  //const [operator, setOperator] = useState("+");

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
  // f reset opernad state
  const updateOperand = async () => {
    console.log("updateOperand - called");
    // if output is operator do not update
    switch (output) {
      case "+":
      case "-":
      case "*":
      case "/":
        break;
    // if output is number update
      default:
        await setOperand(output);
        break;
    }
  };
  // f to handle clicked key
  const handleKey = (key) => {
    console.log("handleKey - called");
    //recoverKey(key);
    //switch
    switch (key) {
      // clear calculator
      case "AC":
        console.log("case AC:");
        setLog("0");
        setOutput("0");
        setOperand("0");
        equation = [];
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
        console.log("numbers case 0-9:");
        //check previous input type
        switch (output) {
          // when previous was an operator reset output so only the new digit is shown
          case "+":
          case "-":
          case "*":
          case "/":
            console.log("case 0-9: previous data was operator");
            setOutput(key);
            setOperand(key);
            break;
          // when previous was not an operator build number
          default:
            console.log("case 0-9: previous data was digit");
            // allow only one initial 0
            if (output === "0") {
              console.log(
                "case 0-9: previous data was digit: allow only one initial 0"
              );
              setOutput(key);
              setOperand(key);
            }
            // allow multiple digits number
            else {
              console.log(
                "case 0-9: previous data was digit: allow multiple digits number"
              );
              // build number pushing new char
              setOutput(output + key);
              setOperand(output + key);
            }
            //setOperand(output);
            break;
        }
        break;
      /* case ".":
        // allow only one . per number
        // if not . present add it
        if (!output.indexOf(".")) {
          console.log("if not . present add it");
          setOutput(output + key);
          // if . already present do not add
        } else {
          console.log("if . already present do not add");
        }
        break; */
      // operators
      case "+":
      case "-":
      case "*":
      case "/":
        //check if previous input was an operator
        switch (output) {
          // when previous was an operator substitute by new operator
          case "+":
          case "-":
          case "*":
          case "/":
            console.log(
              "apply operators - previous was operator - eliminate and subsitute"
            );
            equation.pop();
            equation.push(key);
            break;
          default:
            // when previous was a number push as operand into equation
            console.log(
              "apply operators - previous was number . push operand and operator into array"
            );
            equation.push(operand);
            equation.push(key);
            break;
        }
        // finally update output to show only operator
        console.log("finally - push current output into array");
        setOutput(key);
        break;
      default:
        break;
    }
    // reset states so next digits can be entered
    resetKey();
  };
  // ef to auto run handleKey when user clicks a button
  useEffect(() => handleKey(key), [key]);
  //useEffect(() => updateOperand, [output]);

  useEffect(() => console.log(equation), [key]);

  // f to update log by pushing current output char

  // ef to auto run X

  return (
    <>
      <header>Calculator</header>
      <main>
        <article className="calculator">
          <div id="display">
            <p>{equation}</p>
            <p id="log">{log}</p>
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
              id="eigth"
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
              id="substract"
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
