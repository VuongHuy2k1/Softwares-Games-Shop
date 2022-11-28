import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Grid,
    Box,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
    FormControlLabel,
    Switch
} from '@mui/material';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [reLoad, setReLoad] = useState(1);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await gameServices.getGameTable(1, 100);
            setRowss(result.items);
            if (ro != undefined) {
                setLoading(false);
            }
            setReLoad(2);
        };
        fetchApi();
    }, [reLoad]);
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
        setReLoad(4);
    };

    const handleClick = (event, name, gameID) => {
        if (confirm('Are you sure you want to delete ' + name)) {
            deleteApi(gameID);
        }
    };

    const onClickProfile = (event, id) => {
        navigate('/game-profile/' + id);
    };
    const onClickEdit = (event, id) => {
        navigate('/edit-game/' + id);
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

                                            <TableCell align="right">
                                                <IconButton onClick={(event) => handleClick(event, row.name, row.gameID)}>
                                                    <AiOutlineDelete />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={(event) => onClickProfile(event, row.gameID)}>
                                                    <AiOutlineEye />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={(event) => onClickEdit(event, row.gameID)}>
                                                    <AiOutlineEdit />
                                                </IconButton>
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
                    <Grid item xs={12}>
                        {loading ? (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Grid>
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
