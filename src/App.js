//import Web3 from "web3";
import { useState, useEffect } from "react";
//import {ethers} from "ethers"
import Lyra from "@lyrafinance/lyra-js";
import LyraContext from "./LyraContext";
import Options from "./components/Options/Options";

function App() {
  const [lyra, setLyra] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      //const w3 = await new ethers.providers.StaticJsonRpcProvider(process.env.REACT_APP_ALCHEMY_LINK, 10)
      setLyra(await new Lyra()); //{provider: w3}
    };
    init();
  }, []);

  return (
    <div className="App">
      <LyraContext.Provider value={lyra}>
        <Options />
      </LyraContext.Provider>
    </div>
  );
}

export default App;
