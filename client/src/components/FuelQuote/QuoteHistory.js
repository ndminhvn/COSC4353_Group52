import React from 'react';
import './QuoteHistory.css';

export default function QuoteHistory() {
    // const [quotes, setQuotes] = React.useState([{
    //     order_date: "02/10/2023",
    //     gallons_requested: 1500,
    //     address_1: '123 Main Street, Houston, TX',
    //     delivery_date: '02/11/2023',
    //     suggested_price: '$1.695',
    //     total_amount_due: '$1.695'
    // }]);

    const [quotes, setQuotes] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3001/getquotes')
            .then(res => res.json())
            .then(data => setQuotes(data));
    }, []);
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
                        {/* {quotes.map((quote, idx) => (
                            <tr key={idx}>
                                <td>{quote.order_date}</td>
                                <td>{quote.gallons_requested}</td>
                                <td>{quote.address_1}</td>
                                <td>{quote.delivery_date}</td>
                                <td>${quote.suggested_price}</td>
                                <td>${quote.total_amount_due}</td>
                            </tr>
                        ))} */}
                        <tr >
                            <td>01/20/2023</td>
                            <td>900</td>
                            <td>4414 My Drive, Garden City, NY</td>
                            <td>01/25/2023</td>
                            <td>${(1.50 + (.04 - .00 + .03 + .1)).toFixed(2)}</td>
                            <td>${(1.50 + (.04 - .00 + .03 + .1))*900}</td>
                        </tr>
                        <tr >
                            <td>01/24/2023</td>
                            <td>1500</td>
                            <td>123 Main Street, Houston, TX</td>
                            <td>01/27/2023</td>
                            <td>${1.695.toFixed(2)}</td>
                            <td>$2542.50</td>
                        </tr>
                        <tr >
                            <td>01/26/2023</td>
                            <td>1200</td>
                            <td>3584 Sampson Street, Denver, CO</td>
                            <td>01/30/2023</td>
                            <td>${(1.50 + (.04 - .01 + .02 + .1)).toFixed(2)}</td>
                            <td>${(1.50 + (.04 - .01 + .02 + .1))*1200}</td>
                        </tr>
                        <tr >
                            <td>01/30/2023</td>
                            <td>1000</td>
                            <td>111 Kidd Avenue, Venetie, AK</td>
                            <td>02/04/2023</td>
                            <td>${(1.50 + (.04 - .01 + .02 + .1)).toFixed(2)}</td>
                            <td>${(1.50 + (.04 - .01 + .02 + .1))*1000}</td>
                        </tr>
                        <tr >
                            <td>02/01/2023</td>
                            <td>651</td>
                            <td>123 Main Street, Houston, TX</td>
                            <td>02/05/2023</td>
                            <td>${(1.50 + (.02 - .01 + .03 + .1)).toFixed(2)}</td>
                            <td>${(1.50 + (.02 - .01 + .03 + .1))*651}</td>
                        </tr>
                    </tbody>
                </table>
                {/* {quotes.length === 0 && <p>No history</p>} */}
            </div>
        </>
    );
}