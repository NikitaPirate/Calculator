
import lyraContext from "../../LyraContext.ts"
import { useState, useEffect, useContext } from "react"
import SelectedBoard from "./SelectBoard"
import BoardTable from "./BoardTable"
import BuildChart from "./BuildChart"


function Options() {
    const [markets, setMarkets] = useState(undefined)
    const [market, setMarket] = useState(undefined)
    const [boards, setBoards] = useState([])
    const [board, setBoard] = useState(undefined)
    const [selectedOptions, setSelectedOptions] = useState(undefined)

    const lyra = useContext(lyraContext)

    useEffect(() => {


        const initMarkets = async (lyra) => {

            if (lyra) {
                let markets = await lyra.markets()

                
                let market = markets[0]
                let boards = await market.liveBoards()
                let board = boards[0]
                setMarkets(markets)
                setMarket(market)
                setBoards(boards)
                setBoard(board)
                // debug
                window.lyra = lyra
                window.board = board

            }
        }
        initMarkets(lyra)


    }, [lyra])

    


    if (market) {

        return (
            <div>
                <SelectedBoard markets={markets}
                                setMarkets={setMarkets}
                                market={market}
                                setMarket={setMarket}
                                boards={boards}
                                setBoards={setBoards}
                                board={board}
                                setBoard={setBoard}
                                lyra={lyra}
                
                />
                <BoardTable board={board}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                            />
               <BuildChart selectedOptions={selectedOptions}/>
            </div>
        )
    }
    return (
        <div />
    )
}

export default Options
