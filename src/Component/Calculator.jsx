import React, { useState, useCallback, useEffect } from "react";


const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`p-4 rounded-xl text-white font-semibold text-lg 
    backdrop-blur-md bg-white/10 border border-white/10
    hover:bg-white/20 active:scale-95 transition duration-200 ${className}`}
  >
    {children}
  </button>
);

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = useCallback((value) => {
    setInput((prev) => prev + value);
  }, []);

  const clearInput = useCallback(() => {
    setInput("");
    setResult("");
  }, []);

  const deleteLast = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  const calculate = useCallback(() => {
    try {
      const evalResult = eval(input);
      setResult(evalResult.toString());
    } catch {
      setResult("Error");
    }
  }, [input]);

  useEffect(() => {
    if (input === "") setResult("");
  }, [input]);

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-2xl w-80">

        {/* Title */}
        <h1 className="text-white text-center text-xl mb-4 font-bold tracking-wide">
          Smart Calculator
        </h1>
        <div className="bg-black/40 text-white p-4 rounded-xl mb-4 text-right backdrop-blur-md">
          <div className="text-gray-400 text-sm break-words">{input || "0"}</div>
          <div className="text-3xl font-bold">{result || "0"}</div>
        </div>
        <div className="grid grid-cols-4 gap-3">

          <Button onClick={clearInput} className="col-span-2 bg-red-500/70 hover:bg-red-500">
            AC
          </Button>

          <Button onClick={deleteLast} className="bg-yellow-500/70 hover:bg-yellow-500">
            DEL
          </Button>

          <Button onClick={() => handleClick("/")} className="bg-blue-500/70 hover:bg-blue-500">
            /
          </Button>

          {buttons.map((btn, i) => (
            <Button
              key={i}
              onClick={() =>
                btn === "=" ? calculate() : handleClick(btn)
              }
              className={`${
                btn === "="
                  ? "bg-green-500/70 hover:bg-green-500"
                  : "bg-white/10"
              }`}
            >
              {btn}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;