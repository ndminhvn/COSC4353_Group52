import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../../utils/constants.js';
import { getToken, removeToken } from '../../utils/useToken.js';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import './QuoteHistory.css';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#c1c9d4cc",
        color: "black",
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }
}));

const formatDate = (given_date) => {
    const date = new Date(given_date);
    const options = { year: 'numeric', month: '2-digit', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}

const QuoteHistory = () => {
    const username = getToken();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [quotes, setQuotes] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // fetch user quote history
    const fetchHistory = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/history/${username}`);
            if (res.status === 201) {
                const quoteHistory = res.data;
                setQuotes(quoteHistory);
            }
        } catch (error) {
            alert("Failed to fetch history");
            console.log(error);
        }
    };

    // check if user has logged in
    useEffect(() => {
        if (!username) {
            removeToken();
            setMessage('Our system detected that you are not logged in yet. Redirecting to the login screen ...');
            setTimeout(() => {
                navigate('/login', { replace: true });
                window.location.reload(true);
            }, 1500);
        } else {
            fetchHistory();
        }
    }, [username, navigate]);

    if (!username) {
        return (
            <h3 className='text-center' style={{ marginTop: '20vh' }}>
                {message && <p>{message}</p>}
            </h3>
        )
    }
    else {

        return (
            <>
                <h1>Fuel Quote History</h1>
                <Paper sx={{ width: '97%', margin: 'auto', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Order Date</StyledTableCell>
                                    <StyledTableCell align="center">Gallons Requested</StyledTableCell>
                                    <StyledTableCell align="center">Delivery Address</StyledTableCell>
                                    <StyledTableCell align="center">Delivery Date</StyledTableCell>
                                    <StyledTableCell align="center">Suggested Price/Gallon</StyledTableCell>
                                    <StyledTableCell align="center">Total Price</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(quote => (
                                    <StyledTableRow key={quote.order_id}>
                                        <StyledTableCell align="center">{formatDate(quote.purchase_date)}</StyledTableCell>
                                        <StyledTableCell align="center">{quote.gallons_amount}</StyledTableCell>
                                        <StyledTableCell align="center">{quote.delivery_address}</StyledTableCell>
                                        <StyledTableCell align="center">{formatDate(quote.delivery_date)}</StyledTableCell>
                                        <StyledTableCell align="center">{parseFloat(quote.unit_cost).toFixed(2)}</StyledTableCell>
                                        <StyledTableCell align="center">{parseFloat(quote.total_cost).toFixed(2)}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            {quotes.length === 0 && <p className="ps-2 m-auto">No History</p>}
                        </Table>
                    </TableContainer>
                    {quotes.length > 0 && <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={quotes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
                </Paper>
            </>
        );
    }
}

export default QuoteHistory;
