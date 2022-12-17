import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import * as gameServices from 'services/gameServices';

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
    const theme = useTheme();
    const [game, setGame] = useState();
    const [gameName, setGameName] = useState(['', '', '', '', '']);
    const [f, setF] = useState(false);
    const [series, setSeries] = useState([]);
    const [buyCount, setBuyCount] = useState([1, 0, 0, 0, 0]);

    useEffect(() => {
        const profileApi = async () => {
            const result = await gameServices.getGameBestSeller();
            setGame(result.items);
            setBuyCount(fillArrCount(result.items));
            setGameName(fillArrName(result.items));
        };
        profileApi();
        setSeries(buyCount);
        setOptions({
            ...options,
            labels: gameName
        });
    }, [f]);

    const fillArrCount = (arr) => {
        const buy = [];
        arr.map((count, i) => {
            buy.push(Math.round((count.price - (count.price * count.discount) / 100) * count.buyCount));
        });
        setF(true);
        return buy;
    };

    const fillArrName = (arr) => {
        const buy = [];
        arr.map((count, i) => {
            buy.push(count.name);
        });
        setF(true);
        return buy;
    };

    const [options, setOptions] = useState({
        chart: {
            width: 380,
            type: 'pie'
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    });

    return (
        <div id="pie">
            <ReactApexChart options={options} series={series} type="pie" height={378} />
        </div>
    );
};

export default MonthlyBarChart;
