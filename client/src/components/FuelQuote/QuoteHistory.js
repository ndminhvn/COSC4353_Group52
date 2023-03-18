import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../../utils/constants.js';
import { getToken } from '../../utils/useToken.js';

import './QuoteHistory.css';

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

    useEffect(() => {
        fetchHistory();
    }, []);

    // check if user has logged in
    useEffect(() => {
        if (!username) {
            setMessage('Our system detected that you are not logged in yet. Redirecting to the login screen ...');
            setTimeout(() => {
                navigate('/login', { replace: true });
                window.location.reload(true);
            }, 1500);
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
                <div className="quote-history-container md-5">
                    <table className="table table-striped caption-top">
                        <caption className="text-center">Fuel Quote History</caption>
                        <thead>
                            <tr>
                                <th scope="col">Order Date</th>
                                <th scope="col">Gallons Requested</th>
                                <th scope="col">Delivery Address</th>
                                <th scope="col">Delivery Date</th>
                                <th scope="col">Suggested Price/Gallon</th>
                                <th scope="col">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map(quote => (
                                <tr key={quote.order_id}>
                                    <td>{formatDate(quote.purchase_date)}</td>
                                    <td>{quote.gallons_amount}</td>
                                    <td>{quote.delivery_address}</td>
                                    <td>{formatDate(quote.delivery_date)}</td>
                                    <td>${parseFloat(quote.unit_cost).toFixed(2)}</td>
                                    <td>${parseFloat(quote.total_cost).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        {quotes.length === 0 && <p className="ps-2 m-auto">No History</p>}
                    </table>
                </div>
            </>
        );
    }
}

export default QuoteHistory;