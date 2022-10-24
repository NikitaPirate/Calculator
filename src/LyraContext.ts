import { createContext } from "react";
import Lyra from "@lyrafinance/lyra-js"



export default createContext<Lyra | null>(null)