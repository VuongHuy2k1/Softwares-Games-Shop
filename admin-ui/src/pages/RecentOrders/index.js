import * as React from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { getOrder } from 'services/clientServices';

export default function CollapsibleTable() {
    const [open, setOpen] = useState(false);
    const [orderRecent, setOrderRecent] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getOrder();
            setOrderRecent(result.resultObj);
        };
        fetchApi();
    }, []);
    console.log(orderRecent);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>User name</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        <TableCell align="right">Game</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderRecent.map((order) => (
                        <>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell>
                                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                        {open ? <SlArrowUp /> : <SlArrowDown />}
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {order.userName}
                                </TableCell>
                                <TableCell align="right">{order.price}</TableCell>
                                <TableCell align="right">{order.purchaseDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Game
                                            </Typography>
                                            <Table size="small" aria-label="purchases">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell>Price</TableCell>
                                                        <TableCell align="right">Amount</TableCell>
                                                        <TableCell align="right">Total price ($)</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {order.game.map((gameRow) => (
                                                        <TableRow key={gameRow.date}>
                                                            <TableCell component="th" scope="row">
                                                                {gameRow.date}
                                                            </TableCell>
                                                            <TableCell>{gameRow.customerId}</TableCell>
                                                            <TableCell align="right">{gameRow.amount}</TableCell>
                                                            <TableCell align="right">
                                                                {Math.round(gameRow.amount * row.price * 100) / 100}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
