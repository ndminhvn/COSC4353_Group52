import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants.js';
import axios from 'axios';
import { getToken } from '../../utils/useToken.js';
import './FuelQuoteForm.css'

const testProfile = {
    address: '12345 Kingstone Boulevard',
    address2: '',
    city: 'Houston',
    state: 'TX',
    zip: '77072',
}

const getMinDeliveryDays = () => {
    let curDate = new Date();
    const minDate = curDate.setDate(curDate.getDate() + 3);
    return (new Date(minDate));
}

const FuelQuoteForm = (props) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    // const token = getToken();
    const token = true;

    const [gallons, setGallons] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [quoteFormValid, setQuoteFormValid] = useState(false);
    const [quoteValid, setQuoteValid] = useState(false);
    const [fullDeliveryAddress, setFullDeliveryAddress] = useState('');

    // is this needed?
    // const [data, setData] = useState({
    //     gallonsReq: 0,
    //     deliveryAddress: '',
    //     deliveryDate: '',
    //     suggestedPPG: 0,
    //     totalDue: 0,
    //     username: ""
    // })

    const [profile, setProfile] = useState({
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
    });

    const [quote, setQuote] = useState({
        gallons: '0',
        deliveryDate: '',
        price: '0',
        total: '0',
    });

    const onSelectedDate = (e) => {
        const day = new Date(e.target.value).getUTCDay();

        if ([6, 0].includes(day)) {
            e.preventDefault();
            e.target.value = '';
            alert('Weekends not allowed');
        }

        setSelectedDate(e.target.value);
        // setData({ ...data, deliveryDate: selectedDate });
    }

    const onGetQuote = async (e) => {

        e.preventDefault();

        if (quoteFormValid) {
            // setData({ ...data, deliveryDate: selectedDate, gallonsReq: gallons });

            // await axios.get(`${BASE_URL}/${username}/${gallons}`)
            // .then(res => {
            //     setQuote(res.data);
            // })

            // setData({
            //     gallonsReq: gallons,
            //     deliveryAddress: profile.address,
            //     deliveryDate: selectedDate,
            //     suggestedPPG: quote.price,
            //     totalDue: quote.total,
            //     username: username
            // });

            setQuote({
                gallons: gallons,
                deliveryDate: selectedDate,
                price: '1.675', // get from backend
                total: '999.99' // get from backend
            });

            setQuoteValid(true);
        }
    }

    const onQuoteSubmit = async (e) => {
        e.preventDefault();

        // probably redundant check due to having button disabled if invalid anyways
        // if (quoteValid === false) {
        //     alert("Form is incomplete");
        //     return;
        // }

        const mergedData = { ...profile, ...quote, username };

        console.log("submit mergedData:", mergedData);
    }

    useEffect(() => {

        if (!token) {
            localStorage.clear();
            navigate('/login');
            window.location.reload(true);
        } else {
            setProfile(testProfile);
            setFullDeliveryAddress(`${profile.address}, ${profile.city}, ${profile.state}, ${profile.zip}`);

            const checkFormValidity = () => {
                if (gallons !== '' && selectedDate !== '') {
                    setQuoteFormValid(true);
                } else {
                    setQuoteFormValid(false);
                }
            }
            checkFormValidity();
        }
    }, [token, fullDeliveryAddress, gallons, selectedDate, quoteFormValid, quoteValid, navigate]);

    return (
        <>
            <br />
            <center>
                <h1>Fuel Quote Form</h1>
            </center>
            <div className='form-container'>
                <div className='container'>
                    <form onSubmit={onGetQuote} style={{ 'padding': '10px' }}>
                        <label className='label' htmlFor='requestedGallons' style={{ 'paddingTop': '0px' }}>
                            Gallons Requested
                        </label>
                        <input
                            type='number'
                            id='requestedGallons'
                            name='requestedGallons'
                            placeholder='# of Gallons (100 min.)'
                            min='100'
                            onChange={(e) => setGallons(e.target.value)}
                            required
                        />
                        <label className='label' htmlFor='deliveryDate'>
                            Delivery Date
                        </label>
                        <input
                            type='date'
                            id='deliveryDate'
                            name='deliveryDate'
                            min={getMinDeliveryDays().toISOString().slice(0, 10)}
                            onChange={(e) => onSelectedDate(e)}
                            required
                        />
                        <label className='label' htmlFor='staticFullAddress'>
                            Delivery Address
                        </label>
                        <textarea
                            id='statiFullAddress'
                            name='staticFullAddress'
                            placeholder='Address'
                            value={fullDeliveryAddress}
                            readOnly
                        />
                        <button type='submit' disabled={!quoteFormValid} onSubmit={onGetQuote}>
                            Request Quote
                        </button>
                    </form>
                </div>
                <div className='container'>
                    <form onSubmit={onQuoteSubmit} style={{ 'padding': '10px' }}>
                        <label className='label' htmlFor='staticGallons' style={{ 'padding': '0px', 'margin': '0px' }}>
                            Gallons Requested
                        </label>
                        <input
                            type='text'
                            id='staticGallons'
                            name='staticGallons'
                            value={quote.gallons}
                            readOnly className='form-control-plaintext'
                            style={{ 'padding': '0px', 'margin': '0px', 'textAlign': 'center' }}
                        />
                        {quote.deliveryDate !== '' && <><label className='label' htmlFor='staticDate' style={{ 'padding': '0px', 'margin': '0px' }}>
                            Delivery Date
                        </label>
                            <input
                                type='text'
                                id='staticDate'
                                name='staticDate'
                                value={quote.deliveryDate}
                                readOnly className='form-control-plaintext'
                                style={{ 'padding': '0px', 'margin': '0px', 'textAlign': 'center' }}
                            /></>}
                        <label className='label' htmlFor='staticPricePerGallon' style={{ 'padding': '0px', 'margin': '0px' }}>
                            Suggested Price Per Gallon
                        </label>
                        <input
                            type='text'
                            id='staticPricePerGallon'
                            name='staticPricePerGallon'
                            value={`$ ${parseFloat(quote.price).toFixed(2)}`}
                            readOnly className='form-control-plaintext'
                            style={{ 'padding': '0px', 'margin': '0px', 'textAlign': 'center' }}
                        />
                        <label className='label' htmlFor='staticPriceDue' style={{ 'padding': '0px', 'margin': '0px' }}>
                            Estimated Price Due
                        </label>
                        <input
                            type='text'
                            id='staticPriceDue'
                            name='staticPriceDue'
                            placeholder='$'
                            value={`$ ${parseFloat(quote.total).toFixed(2)}`}
                            readOnly className='form-control-plaintext'
                            style={{ 'padding': '0px', 'margin': '0px', 'textAlign': 'center' }}
                        />
                        <button type='submit' disabled={!quoteValid} onSubmit={onQuoteSubmit}>
                            Submit Quote
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FuelQuoteForm