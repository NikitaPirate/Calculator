import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import calcRows from "../../calcPNL"
import { Line } from 'react-chartjs-2'



const BuildChart = ({selectedOptions}) => {
    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )



    // console.log('*', Array.from(selectedOptions.values()))
    if (selectedOptions) {
        let strikes = Array.from(selectedOptions.values()).map(value => value.strikePrice)


        let step = (strikes[1] - strikes[0]) / 2

        let min = strikes[0] - step * 10
        let max = Number(strikes[strikes.length - 1]) + step * 10

        let pricePoints = Array.from({ length: (max - min) / step + 1 }, (_, i) => min + (i * step));
        let PNLs = pricePoints.map(point => calcRows(point, selectedOptions))


        let options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                },
            },
        };

        let data = {
            labels: pricePoints,
            datasets: [{
                label: "PNL",
                data: PNLs
            }]
        }


        return (<Line data={data} options={options} />)
    }

}

export default BuildChart
