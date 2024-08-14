import { useState } from "react";
import Button from "./Components/Button";
function App() {
  const [count, setCount] = useState(0);

  function handleClick(op) {
    if (op === "+") setCount(count + 1);
    else if (op === "-" && count !== 0) setCount(count - 1);
    else setCount(0);
  }
  return (
    <>
      <div className=" flex items-center justify-center h-screen bg-black">
        <div className="w-[480px] h-[380px] bg-teal-100 rounded-md">
          <p className="text-9xl text-center mb-20 mt-10">{count}</p>
          <div className="flex justify-between p-6">
            <button
              type="button"
              onClick={() => handleClick("+")}
              className="text-white bg-green-400 font-medium rounded-lg text-6xl px-10 text-center me-2 mb-2"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleClick}
              className="text-white bg-green-400 font-medium rounded-lg text-xl font-bold uppercase px-10 text-center me-2 mb-2"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => handleClick("-")}
              className="text-white bg-red-400 font-medium rounded-lg text-6xl px-10 text-center me-2 mb-2"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
