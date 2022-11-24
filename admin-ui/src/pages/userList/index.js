import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { getComparator, stableSort, EnhancedTableHead } from './component/index';
import * as userServices from 'services/userServices';
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from 'react-icons/ai';

function createData(id, firstName, lastName, phoneNumber, roleAssign, userName) {
    return {
        id,
        firstName,
        lastName,
        phoneNumber,
        roleAssign,
        userName
    };
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default function UserTable() {
    const [ro, setRo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await userServices.getUserTable(1, 10);
            // setTitle(`Genre: ${result.name} - Page ${page || 1}`);
            setRo(result.resultObj.items);
        };
        fetchApi();
    }, []);

    const rows = ro.map((value) => {
        return createData(value.id, value.firstName, value.lastName, value.phoneNumber, value.roleAssign, value.userName);
    });

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const deleteApi = async (id) => {
        const result = await userServices.deleteUser(id);
    };

    const onChangeProfile = (event, id) => {
        navigate('/user-profile/' + id);
    };

    const handleClick = (event, userName, id) => {
        if (confirm('Are you sure you want to delete ' + userName + '?')) {
            deleteApi(id);
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.firstName}</TableCell>
                                            <TableCell align="right">{row.lastName}</TableCell>
                                            <TableCell align="right">{row.userName}</TableCell>
                                            <TableCell align="right">{row.phoneNumber}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={(event) => handleClick(event, row.userName, row.id)}>
                                                    <AiOutlineDelete />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={(event) => onChangeProfile(event, row.id)}>
                                                    <AiOutlineEye />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton>
                                                    <AiOutlineEdit />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell></TableCell>
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
                    rowsPerPageOptions={[5, 10, 25]}
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
