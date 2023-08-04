import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";

function App() {
  const [key, setKey] = useState(null);
  const [output, setOutput] = useState("0");
  const [log, setLog] = useState("0");

  // f to recover clicked button value
  const recoverKey = (k) => {
    setKey(k);
  };

  // f to handle clicked key
  const handleKey = (key) => {
    //switch
    switch (key) {
      case "AC":
        setLog(0);
        setOutput(0);
        setKey(null);
        break;
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
        // only one initial 0
        if (output[0] === "0") {
          setOutput(key);
          setKey(null);
          // general case
        } else {
          //build equation pushing new char
          setOutput(output + key);
          // reset state so same char can be consecutively entered
          setKey(null);
        }
        break;
      case ".":
        if (!output.includes(".")) {
          setOutput(output + key);
        }
        break;
      default:
        break;
    }
  };
  // ef to auto run handleKey when user clicks a button
  useEffect(() => handleKey(key), [key]);

  // f to update log by pushing current output char

  // ef to auto run X

  return (
    <>
      <header>Calculator</header>
      <main>
        <article className="calculator">
          <div id="display">
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
