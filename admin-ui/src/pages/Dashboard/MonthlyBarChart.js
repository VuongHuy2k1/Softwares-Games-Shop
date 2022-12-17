import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import * as gameServices from 'services/gameServices';
import { Typography } from '@mui/material';

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
        setSeries([{ name: 'Lượt mua', data: buyCount }]);
        setOptions({
            chart: {
                type: 'bar',
                height: 365,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    borderRadius: 4
                }
            },
            dataLabels: {
                enabled: true
            },
            xaxis: {
                categories: gameName,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                show: false
            },
            grid: {
                show: false
            }
        });
    }, [f]);
    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    const fillArrCount = (arr) => {
        const buy = [];
        arr.map((count, i) => {
            buy.push(count.buyCount);
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
            type: 'bar',
            height: 365,
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
                borderRadius: 4
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['', '', '', '', ''],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false
        },
        grid: {
            show: false
        }
    });

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, info, secondary]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={365} />
        </div>
    );
};

export default MonthlyBarChart;
