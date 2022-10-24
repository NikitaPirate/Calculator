
const calcBuyCall = (currentBasePrice, strike, optionPrice) => {
    return Math.max(-optionPrice, Number(currentBasePrice) - Number(strike) - Number(optionPrice))
}

const calcSellCall = (currentBasePrice, strike, optionPrice) => {
    return Math.min(optionPrice, Number(strike) - Number(currentBasePrice) + Number(optionPrice))
}

const calcBuyPut = (currentBasePrice, strike, optionPrice) => {
    return Math.max(-optionPrice ,Number(strike) - Number(currentBasePrice) - Number(optionPrice))
}

const calcSellPut = (currentBasePrice, strike, optionPrice) => {
    return Math.min(optionPrice, Number(currentBasePrice) - Number(strike)  + Number(optionPrice))
}

const calcRow = (currentBasePrice, row) => {

    let buyCallPNL = row.call.buy * calcBuyCall(currentBasePrice, row.strikePrice, row.call.price)
    let sellCallPNL = row.call.sell * calcSellCall(currentBasePrice, row.strikePrice, row.call.price)
    let buyPutPNL = row.put.buy * calcBuyPut(currentBasePrice, row.strikePrice, row.put.price)
    let sellPutPNL = row.put.sell * calcSellPut(currentBasePrice, row.strikePrice, row.put.price)
    return buyCallPNL + sellCallPNL + buyPutPNL + sellPutPNL
}
const calcRows = (currentBasePrice, rows) => {
    let result = 0
    rows.forEach(row => result += calcRow(currentBasePrice, row))
    return result
}

export default calcRows
