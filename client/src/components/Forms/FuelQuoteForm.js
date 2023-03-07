import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants.js';
import axios from 'axios';
import './FuelQuoteForm.css'

const testProfile = {
    address1: '123 Main Street',
    city: 'Houston',
    state: 'TX',
    zipcode: '77072',
}

const FuelQuoteForm = (props) => {
    const navigate = useNavigate();
    // const username = localStorage.getItem('username');
    // const token = localStorage.getItem('token');
    const token = true;
    const [gallons, setGallons] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [quoteFormValid, setQuoteFormValid] = useState(false);

    const [profile, setProfile] = useState({
        address1: '',
        city: '',
        state: '',
        zipcode: '',
    });

    const [quote, setQuote] = useState({
        price: '0',
        total: '0',
    });

    const handleCheckFormValid = async () => {
        if (gallons !== '' && selectedDate !== '') {
            await setQuoteFormValid(true);
        } else {
            await setQuoteFormValid(false);
        }
    }

    const handleGallonsReq = (e) => {
        setGallons(e.target.value);
    }

    const handleSelectedDate = (e) => {
        setSelectedDate(e.target.value);
    }

    const handleGetQuote = async (e) => {
        e.preventDefault();

        // testing vals
        setQuote({
            price: '1.657',
            total: '999.99'
        });
    }

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();

        if (quoteFormValid === false) {
            alert("Form is incomplete");
            return;
        }
    }


    useEffect(() => {

        if (!token) {
            localStorage.clear();
            navigate('/login');
            window.location.reload(true);
        } else {
            // axios.get(`${BASE_URL}/account/${username}`, {
            //     headers: {
            //         Authorization: localStorage.getItem("token")
            //     }
            // })
            // .then(res => {
            //     setProfile(res.data);
            // })
            // .catch((err) => {
            //     console.error(err);
            //     alert("Something went wrong fetching profile data");
            // });

            // test profile

            setProfile(testProfile);

            handleCheckFormValid();
        }
    }, [token, gallons, selectedDate, quoteFormValid]);

    return (
        <>
            <br />
            <center>
                <h1>Fuel Quote Form</h1>
            </center>
            <div className='form-container'>
                <div className='container'>
                    <form onSubmit={handleGetQuote}>
                        <label className='label' htmlFor='requestedGallons'>
                            Gallons Requested:
                        </label>
                        <input
                            type='number'
                            id='requestedGallons'
                            name='requestedGallons'
                            placeholder='Enter # of Gallons (100 min.)'
                            min='100'
                            onChange={(e) => handleGallonsReq(e)}
                            required
                        />
                        <br />
                        <label className='label' htmlFor='deliveryDate'>
                            Delivery Date:
                        </label>
                        <input
                            type='date'
                            id='deliveryDate'
                            name='deliveryDate'
                            min={new Date().toISOString().slice(0, 10)}
                            onChange={handleSelectedDate}
                            required
                        />
                        <label className='label' htmlFor='staticAddress'>
                            Address:
                        </label>
                        <input
                            type='text'
                            id='staticAddress'
                            name='staticAddress'
                            placeholder='Address'
                            value={profile.address1}
                            readOnly
                        />
                        <br />
                        <label className='label' htmlFor='staticCity'>
                            City:
                        </label>
                        <input
                            type='text'
                            id='staticCity'
                            name='staticCity'
                            placeholder='City'
                            value={profile.city}
                            readOnly
                        />
                        <br />
                        <label className='label' htmlFor='staticState'>
                            State:
                        </label>
                        <input
                            type='text'
                            id='staticState'
                            name='staticState'
                            placeholder='State'
                            value={profile.state}
                            readOnly
                        />
                        <br />
                        <label className='label' htmlFor='staticZip'>
                            ZIP Code:
                        </label>
                        <input
                            type='text'
                            id='staticZip'
                            name='staticZip'
                            placeholder='ZIP Code'
                            value={profile.zipcode}
                            readOnly
                        />
                        <br />
                        <button type='submit' disabled={!quoteFormValid} onSubmit={handleGetQuote}>
                            Request Quote
                        </button>
                        <br />
                    </form>
                </div>
                <div className='container'>
                    <form onSubmit={handleQuoteSubmit}>
                        <label className='label' htmlFor='staticPricePerGallon' style={{ 'paddingBottom': '0px', 'margin': '0px' }}>
                            Suggested Price Per Gallon:
                        </label>
                        <input
                            type='text'
                            id='staticPricePerGallon'
                            name='staticPricePerGallon'
                            value={`$ ${parseFloat(quote.price).toFixed(2)}`}
                            readOnly className='form-control-plaintext'
                            style={{ 'padding': '0px', 'margin': '0px' }}
                        />
                        <label className='label' htmlFor='staticPriceDue' style={{ 'padding': '0px', 'margin': '0px' }}>
                            Estimated Price Due:
                        </label >
                        <input
                            type='text'
                            id='staticPriceDue'
                            name='staticPriceDue'
                            placeholder='$'
                            value={`$ ${parseFloat(quote.total).toFixed(2)}`}
                            readOnly className='form-control-plaintext'
                            style={{ 'padding': '0px', 'margin': '0px' }}
                        />
                        <button type='submit' disabled={!quoteFormValid} onSubmit={handleQuoteSubmit}>
                            Submit Quote
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FuelQuoteForm