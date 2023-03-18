import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants.js';
import axios from 'axios';
import { getToken } from '../../utils/useToken.js';
import bgImage from '../../assets/pages-bg.jpg';

import './FuelQuoteForm.css'

// test data for profile
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

const FuelQuoteForm = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    // const token = getToken();
    const token = true; // test token

    const [gallons, setGallons] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [quoteFormValid, setQuoteFormValid] = useState(false);
    const [quoteValid, setQuoteValid] = useState(false);
    const [fullDeliveryAddress, setFullDeliveryAddress] = useState('');

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
    }

    const onGetQuote = async (e) => {

        e.preventDefault();

        if (quoteFormValid) {

            // await axios.get(`${BASE_URL}/${username}/${gallons}`)
            // .then(res => {
            //     setQuote(res.data);
            // })

            setQuote({
                gallons: gallons,
                deliveryDate: selectedDate,
                price: '1.67', // get from backend
                total: '999.999' // get from backend
            });

            setQuoteValid(true);
        }
    }

    const onQuoteSubmit = async (e) => {
        e.preventDefault();

        const mergedData = { ...profile, ...quote, username }; // data to submit to the backend server

        console.log("submit mergedData:", mergedData);
    }

    useEffect(() => {

        if (!token) {
            localStorage.clear();
            navigate('/login');
            window.location.reload(true);
        } else {
            setProfile(testProfile); // will get from http get call later on
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
    }, [token, profile, fullDeliveryAddress, gallons, selectedDate, quoteFormValid, quoteValid, navigate]);

    return (
        <div className="container">
            <form>

                {/* Date Picker */}
                <div className="row">
                    <div className="col-25">
                        <label for="DatePicker">Date</label>
                    </div>
                    <div className="col-75">
                        <DatePicker
                            selected={selectedDate}
                            onChange={newDate => setSelectedDate(newDate)}
                            minDate={date}
                            filterDate={date => date.getDay() !== 6 && date.getDay() !== 0} //filtered out weekends
                            showYearDropdown
                            scrollableMonthYearDropdown
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

                {/* Request button -> confirm button */}
                <button type="submit" class="btn btn-primary mb-2">Request Quote</button>


            </form>
        </div>
    );
};

export default FuelQuoteForm;