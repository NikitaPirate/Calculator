import { _formatEther } from "../../utils.js"
import {buy, sell, call, put} from "../../constants"
import { useEffect, useState } from "react"


const BoardTable = ({board, selectedOptions, setSelectedOptions }) => {

    
    const [boardData, setBoardData] = useState()
    
    useEffect(() => {
        let boardData = assembleBoardData()
        setBoardData(boardData)
        if (!selectedOptions) {
            initSelectedOptions(boardData)
        }
    }, [board])



    const assembleBoardData = () => {

        const assembleStrikeData = (strike) => {
            let strikePrice = _formatEther(strike.strikePrice)
            let optionPriceCall = _formatEther(strike.option(true).price)
            let optionPricePut = _formatEther(strike.option(false).price)
            return {
                strikeID: strike.id,
                strikePrice: strikePrice,
                optionPriceCall: optionPriceCall,
                optionPricePut: optionPricePut
            }
        }
        let strikes = board.strikes().filter(strike => strike.isDeltaInRange).sort((a, b) => a.strikePrice - b.strikePrice)
        let strikesData = strikes.map(strike => assembleStrikeData(strike))

        return strikesData
    }

    const handleTableInput = (event) => {
        
        const { name, value } = event.target
        const buy = event.target.dataset.buy
        const call = event.target.dataset.call
        
        let strike = selectedOptions.get(name)
        strike[call][buy] = value
        setSelectedOptions(new Map(selectedOptions.set(name, strike)))
    }

    const initSelectedOptions = (boardData) => {

        let selectedOptions = new Map()

        boardData.forEach(strike => {
            selectedOptions.set(
                strike.strikeID.toString(),
                {
                    strikePrice: strike.strikePrice,
                    call: { price: strike.optionPriceCall, buy: 0, sell: 0 },
                    put: { price: strike.optionPricePut, buy: 0, sell: 0 }
                })
        })

        setSelectedOptions(selectedOptions)
    }
    


    if (boardData) {    
        return (
            <div>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <th rowSpan={2}>STRIKE</th>
                                <th colSpan={3}>CALL</th>
                                <th colSpan={3}>PUT</th>
                            </tr>
                            <tr>
                                <th>PRICE*</th>
                                <th >BUY</th>
                                <th >SELL</th>
                                <th>PRICE*</th>
                                <th >BUY</th>
                                <th >SELL</th>
                            </tr>
                            {boardData.map(strikeData => <tr key={strikeData.strikeID}>
                                <th>{strikeData.strikePrice}</th>
                                <th>{strikeData.optionPriceCall}</th>
                                <th><input name={strikeData.strikeID} data-buy={buy} data-call={call} onChange={handleTableInput} /></th>
                                <th><input name={strikeData.strikeID} data-buy={sell} data-call={call} onChange={handleTableInput} /></th>
                                <th>{strikeData.optionPricePut}</th>
                                <th><input name={strikeData.strikeID} data-buy={buy} data-call={put} onChange={handleTableInput} /></th>
                                <th><input name={strikeData.strikeID} data-buy={sell} data-call={put} onChange={handleTableInput} /></th>
                            </tr>)}
                        </tbody>


                    </table>
                </form>
            </div>
        )
        }
}

export default BoardTable
