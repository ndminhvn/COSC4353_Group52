import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants.js';
import axios from 'axios';
import { getToken } from '../../utils/useToken.js';
import bgImage from '../../assets/pages-bg.jpg';

import './FuelQuoteForm.css'

const getMinDeliveryDays = () => {
    let curDate = new Date();
    const minDate = curDate.setDate(curDate.getDate() + 3);
    return (new Date(minDate));
}

const FuelQuoteForm = () => {
    const navigate = useNavigate();
    const username = getToken();

    const [gallons, setGallons] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [quoteFormValid, setQuoteFormValid] = useState(false);
    const [quoteValid, setQuoteValid] = useState(false);
    const [fullDeliveryAddress, setFullDeliveryAddress] = useState('');

    const [profile, setProfile] = useState({
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
    });

    const [quote, setQuote] = useState({
        gallons: '0',
        deliveryDate: '',
        unitCost: '0',
        totalCost: '0',
    });

    const onSelectedDate = (e) => {
        const day = new Date(e.target.value).getUTCDay();

        if ([6, 0].includes(day)) {
            e.preventDefault();
            e.target.value = '';
            alert('Weekends not allowed');
        }

        setSelectedDate(e.target.value);
    }

    const onGetQuote = async (e) => {

        e.preventDefault();

        if (quoteFormValid) {
            try {
                // baseurl/quote/?username=eli&gallons=500
                const res = await axios.get(`${BASE_URL}/quote/?username=${username}&gallons=${gallons}`)
                if (res.status === 200) {
                    // console.log("res:", res.data);
                    setQuote({ ...res.data, deliveryDate: selectedDate });
                    setQuoteValid(true);
                }
            } catch (error) {
                alert("Failed to get quote");
                console.log(error);
                setQuoteValid(false);
            }
        }
    }

    const onQuoteSubmit = async (e) => {
        e.preventDefault();

        try {
            const mergedData = {
                username: username,
                deliveryDate: quote.deliveryDate,
                deliveryAddress: fullDeliveryAddress,
                unitCost: quote.unitCost,
                gallons: quote.gallons,
                totalCost: quote.totalCost,
            }

            // console.log("submit mergedData:", mergedData);

            const res = await axios.post(`${BASE_URL}/quote`, mergedData);

            if (res.status === 201) {
                alert(res.data);
                setTimeout(() => {
                    navigate('/history');
                    window.location.reload(true);
                }, 1000);
            }
        } catch (error) {
            alert("Failed to submit quote");
            console.log(error);
        }
    }

    // fetch user profile
    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/account/${username}`);
            if (res.status === 201) {
                setProfile(Object.assign(profile, res.data));
                setFullDeliveryAddress(`${profile.address1}, ${profile.city}, ${profile.state}, ${profile.zipcode}`);
            }
        } catch (error) {
            alert("Failed to fetch data");
            console.log(error);
        }
    };

    useEffect(() => {
        if (!username) {
            localStorage.clear();
            navigate('/login');
            window.location.reload(true);
        } else {
            fetchProfile();

            const checkFormValidity = () => {
                if (gallons !== '' && selectedDate !== '') {
                    setQuoteFormValid(true);
                } else {
                    setQuoteFormValid(false);
                }
            }
            checkFormValidity();
        }
    }, [username, profile, fullDeliveryAddress, gallons, selectedDate, quoteFormValid, quoteValid, navigate]);

    return (
        <div id='quote-page'>
            <img src={bgImage} alt='bgImage' id='bgImage' />
            <h1>Fuel Quote Form</h1>
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
                            value={`$ ${parseFloat(quote.unitCost).toFixed(2)}`}
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
                            value={`$ ${parseFloat(quote.totalCost).toFixed(2)}`}
                            readOnly className='form-control-plaintext'
                            style={{ 'padding': '0px', 'margin': '0px', 'textAlign': 'center' }}
                        />
                        <button type='submit' disabled={!quoteValid} onSubmit={onQuoteSubmit}>
                            Submit Quote
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FuelQuoteForm;