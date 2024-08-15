import { useEffect, useState } from "react";
import TextField from "./Components/TextField";

export default function App() {
  const [list, setList] = useState([]);
  const [showKeys, setShowKeys] = useState(false);
  const [privateKey, setPrivateKey] = useState(false);
  const [publicKey, setPublicKey] = useState(false);
  const [copyPrivateKey, setCopyPrivateKey] = useState(false);
  const [copyPublicKey, setCopyPublicKey] = useState(false);
  const serverUrl = "https://react-labs-qmwx.vercel.app/";
  async function handleClick() {
    try {
      const response = await fetch(`${serverUrl}/getMnemonics`);
      if (!response.ok) {
        throw new Error("Network response failed.");
      }
      const data = await response.json();
      setList(data.list);
      setShowKeys(true);
      console.log(data.privateKey);
      setPrivateKey(data.privateKey);
      setPublicKey(data.publicKey);
    } catch (e) {
      console.log(e);
    }
  }

  function handleBtnClick(btn) {
    if (btn === "private") {
      setCopyPrivateKey(true);
      navigator.clipboard.writeText(privateKey).then(
        () => {
          console.log("Text copied to clipboard");
        },
        (err) => {
          console.error("Error copying text: ", err);
        }
      );
    } else if (btn === "public") {
      setCopyPublicKey(true);
      navigator.clipboard.writeText(publicKey).then(
        () => {
          console.log("Text copied to clipboard");
        },
        (err) => {
          console.error("Error copying text: ", err);
        }
      );
    }
  }

  useEffect(() => {
    setTimeout(() => setCopyPrivateKey(false), 2000);
  }, [copyPrivateKey]);

  useEffect(() => {
    setTimeout(() => setCopyPublicKey(false), 2000);
  }, [copyPublicKey]);

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center mt-4 min-w-[500px]">
        <p className="text-center text-3xl px-5 py-4 w-3/5 rounded-xl font-bold bg-red-100/20 shadow-md text-slate-100">
          Private and Public Key Generator
        </p>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={handleClick}
          type="button"
          className="text-white hover:bg-blue-600 focus:ring-4 rounded-lg text-lg font-bold px-5 py-2.5 me-2 mb-2 dark:bg-blue-500 focus:outline-none "
        >
          {showKeys ? "Re-generate Keys" : "Generate Keys"}
        </button>
      </div>

      {showKeys && (
        <div className="flex justify-center mt-20 w-full">
          <div className="grid grid-cols-3 gap-6 max-w-2xl w-3/5 px-4">
            {list.map((word, index) => (
              <TextField key={index} value={word} />
            ))}
          </div>
        </div>
      )}

      {privateKey && (
        <div className="flex justify-center mt-10 ">
          <div className="flex items-center bg-gray-600 text-white font-semibold border-2 border-gray-600 w-[57.2%] max-w-[864px] px-2">
            <p className="whitespace-nowrap pr-4">Private Key</p>
            <TextField key={0} value={privateKey} />
            <button
              onClick={() => handleBtnClick("private")}
              className="flex items-center pl-4 text-white rounded-lg"
            >
              <svg
                class="w-3.5 h-3.5 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"></path>
                <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"></path>
              </svg>
              {copyPrivateKey ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {publicKey && (
        <div className="flex justify-center mt-10 ">
          <div className="flex items-center bg-gray-600 text-white font-semibold border-2 border-gray-600 w-[57.2%] max-w-[864px] px-2">
            <p className="whitespace-nowrap pr-4">Public Key</p>
            <TextField key={0} value={publicKey} />
            <button
              onClick={() => handleBtnClick("public")}
              className="flex items-center pl-4 text-white p-1 rounded-lg"
            >
              <svg
                class="w-3.5 h-3.5 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"></path>
                <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"></path>
              </svg>
              {copyPublicKey ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
