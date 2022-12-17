import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import * as gameServices from 'services/gameServices';
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

    useEffect(() => {
        const profileApi = async () => {
            const result = await chartServices.getBestSellerPerMonthSortbyTotal(year, month, 100);
            setGame(result);
            setBuyCount(fillArrCount(result));
            setGameName(fillArrName(result));
        };
        profileApi();
        setSeries(buyCount);
        setOptions({
            ...options,
            labels: gameName
        });
    }, [f, year, month]);

    const handleChangeMounth = (event) => {
        setF(!f);
        setMonth(event.target.value);
        setF(!f);
    };

    const handleChangeYear = (event) => {
        setF(!f);
        setYear(event.target.value);
        setF(!f);
    };

    const fillArrCount = (arr) => {
        const buy = [];

        arr.map((count, i) => {
            if (count.buyCount > 0) {
                buy.push(count.total);
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
            <FormControl sx={{ m: 1, minWidth: 120, ml: 4 }} size="small">
                <InputLabel id="demo-select-small">Tháng</InputLabel>
                <Select labelId="demo-select-small" id="demo-select-small" value={month} label="month" onChange={handleChangeMounth}>
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
            <ReactApexChart options={options} series={series} type="pie" height={378} />
        </div>
    );
};

export default MonthlyBarChart;
