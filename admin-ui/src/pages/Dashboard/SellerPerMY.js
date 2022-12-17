import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

import * as chartServices from 'services/chartServices';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

// ==============================|| MONTHLY BAR CHART ||============================== //
var today = new Date();

const MonthlyBarChart = () => {
    const theme = useTheme();
    const [game, setGame] = useState();
    const [gameName, setGameName] = useState(['', '', '', '', '']);
    const [f, setF] = useState(false);
    const [series, setSeries] = useState([]);
    const [buyCount, setBuyCount] = useState([1, 0, 0, 0, 0]);
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());
    const [options, setOptions] = useState({
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
        const profileApi = async () => {
            const result = await chartServices.getBestSellerPerMonthSortbyBuy(year, month, 100);
            setGame(result);
            setBuyCount(fillArrCount(result));
            setGameName(fillArrName(result));
        };
        profileApi();
        setSeries([{ name: 'Lượt mua', data: buyCount }]);
        setOptions({
            ...options,
            xaxis: {
                labels: {
                    style: {
                        colors: [m1, m2, m3, m4, m5, m6, m7, m8, m9]
                    }
                },
                categories: gameName,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            }
        });
    }, [f, year, month]);

    const handleChangeMonth = (event) => {
        setMonth(event.target.value);
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const { m1, m2, m3, m4, m5, m6, m7, m8, m9 } = theme.palette.custom;
    const info = theme.palette.chart.m1;

    const fillArrCount = (arr) => {
        const buy = [];
        arr.map((count, i) => {
            if (count.buyCount > 0) {
                buy.push(count.buyCount);
            }
        });
        setF(true);
        return buy;
    };

    const fillArrName = (arr) => {
        const buy = [];
        arr.map((count, i) => {
            if (count.buyCount > 0) {
                buy.push(count.name);
            }
        });
        setF(true);
        return buy;
    };

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [m1, m2, m3, m4, m5, m6, m7, m8, m9],
            xaxis: {
                labels: {
                    style: {
                        colors: [m1, m2, m3, m4, m5, m6, m7, m8, m9]
                    }
                }
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [info, m1, m2, m3, m4, m5, m6, m7, m8, m9]);

    return (
        <div id="chart">
            <FormControl sx={{ m: 1, minWidth: 120, ml: 4 }} size="small">
                <InputLabel id="demo-select-small">Tháng</InputLabel>
                <Select labelId="demo-select-small" id="demo-select-small" value={month} label="month" onChange={handleChangeMonth}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Tháng 1</MenuItem>
                    <MenuItem value={2}>Tháng 2</MenuItem>
                    <MenuItem value={3}>Tháng 3</MenuItem>
                    <MenuItem value={4}>Tháng 4</MenuItem>
                    <MenuItem value={5}>Tháng 5</MenuItem>
                    <MenuItem value={6}>Tháng 6</MenuItem>
                    <MenuItem value={7}>Tháng 7</MenuItem>
                    <MenuItem value={8}>Tháng 8</MenuItem>
                    <MenuItem value={9}>Tháng 9</MenuItem>
                    <MenuItem value={10}>Tháng 10</MenuItem>
                    <MenuItem value={11}>Tháng 11</MenuItem>
                    <MenuItem value={12}>Tháng 12</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-medium">Năm</InputLabel>
                <Select labelId="demo-select-medium" id="demo-select-medium" value={year} label="year" onChange={handleChangeYear}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                </Select>
            </FormControl>
            <ReactApexChart options={options} series={series} type="bar" height={365} />
        </div>
    );
};

export default MonthlyBarChart;
