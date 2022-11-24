import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { getComparator, stableSort, EnhancedTableHead } from './component/index';
import * as gameServices from 'services/gameServices';
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from 'react-icons/ai';

function createData(gameID, name, price, discount, description, genreName) {
    return {
        gameID,
        name,
        price,
        discount,
        description,
        genreName
    };
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default function GameTable() {
    const [ro, setRowss] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await gameServices.getGameTable(1, 100);
            // setTitle(`Genre: ${result.name} - Page ${page || 1}`);
            setRowss(result.items);
        };
        fetchApi();
    }, []);
    const rows = ro.map((value, index) => {
        return createData(
            value.gameID,
            value.name,
            value.price,
            value.discount + ' %',
            value.description,
            value.genreName.map((genre, index) => {
                return genre + ', ';
            })
        );
    });

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const deleteApi = async (id) => {
        const result = await gameServices.deleteGame(id);
    };

    const handleClick = (event, name, gameID) => {
        if (confirm('Are you sure you want to delete ' + name + ' + ' + gameID + '?')) {
            deleteApi(gameID);
        } else {
            console.log('Thing was not saved to the database.');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length} />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.gameID}>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{row.discount}</TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="right">{row.genreName}</TableCell>
                                            <TableCell align="right" onClick={(event) => handleClick(event, row.name, row.gameID)}>
                                                <AiOutlineDelete />
                                            </TableCell>
                                            <TableCell align="right">
                                                <AiOutlineEye />
                                            </TableCell>
                                            <TableCell align="right">
                                                <AiOutlineEdit />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[8, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        </Box>
    );
}
