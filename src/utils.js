import { formatEther } from "ethers/lib/utils"

const convertDate = (unixDate) => {
    let date = new Date(unixDate * 1000)
    return date.toDateString()
}

const getMarketsNames = (markets) => {
    if (markets) {
        return markets.map((market) => market.name)
    }
    return []
}

const _formatEther = (val) => {
    return parseFloat(formatEther(val)).toFixed(2)
}

export {convertDate, getMarketsNames, _formatEther}