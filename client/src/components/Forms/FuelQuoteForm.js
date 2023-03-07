import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants.js';
import axios from 'axios';
import { getToken } from '../../utils/useToken.js';
import './FuelQuoteForm.css'

const testProfile = {
    address1: '123 Main Street',
    address2: '',
    city: 'Houston',
    state: 'TX',
    zipcode: '77072',
}

const getMinDeliveryDays = () => {
    let curDate = new Date();
    const minDate = curDate.setDate(curDate.getDate() + 3);
    return(new Date(minDate));
}

const FuelQuoteForm = (props) => {
    const navigate = useNavigate();
    // const username = localStorage.getItem('username');
    // const token = getToken();
    const token = true;
    const username = "randomUsername";

    const [gallons, setGallons] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [quoteFormValid, setQuoteFormValid] = useState(false);
    const [quoteValid, setQuoteValid] = useState(false);

    // is this needed?
    // const [data, setData] = useState({
    //     gallonsReq: 0,
    //     deliveryAddress: '',
    //     deliveryDate: '',
    //     suggestedPPG: 0,
    //     totalDue: 0,
    //     userId: 0,
    //     username: ""
    // })

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
        price: '0',
        total: '0',
    });

    const handleGallonsReq = (e) => {
        setGallons(e.target.value);
        // setData({ ...data, gallonsReq: gallons });
    }

    const handleSelectedDate = (e) => {
        const day = new Date(e.target.value).getUTCDay();
        if ([6, 0].includes(day)) {
            e.preventDefault();
            e.target.value = '';
            alert('Weekends not allowed');
        }

        setSelectedDate(e.target.value);
        // setData({ ...data, deliveryDate: selectedDate });
    }

    const handleGetQuote = async (e) => {

        e.preventDefault();

        if (quoteFormValid === true) {

            // console.log("get quote gallons:", gallons)
            // console.log("get quote selectedate:", selectedDate);

            // setData({ ...data, deliveryDate: selectedDate, gallonsReq: gallons });

            // console.log("get quote data:", data)

            // const options = {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(value)
            // };
            // const response = await fetch(`${BASE_URL}/${username}/${gallons}`, options);
            // const quote = await response.json();
            // console.log(quote);

            // await axios.get(`${BASE_URL}/${username}/${gallons}`)
            // .then(res => {
            //     setQuote(res.data);
            // })

            // setData({
            //     Gal_Req: gallons,
            //     Del_Add: profile.address1,
            //     Del_Dat: selectedDate,
            //     Sug_Pri: quote.price,
            //     Tot_Amo: quote.total,
            //     // Users_Id: backendDetails.id,
            //     // username: backendDetails.username
            //     Users_id: 12345,
            //     username: "username1"
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

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();

        // probably redundant check due to having button disabled if invalid anyways
        // if (quoteValid === false) {
        //     alert("Form is incomplete");
        //     return;
        // }

        // console.log("submit profile:", profile);
        // console.log("submit quote:", quote);

        const mergedData = { ...profile, ...quote, username };

        console.log("submit mergedData:", mergedData);
    }

    useEffect(() => {
        // console.log("token:", token);

        if (!token) {
            localStorage.clear();
            navigate('/login');
            window.location.reload(true);
        } else {
            // console.log(BASE_URL);
            // axios.get(`${BASE_URL}/account/${username}`, {
            // headers: {
            // Authorization: localStorage.getItem("token")
            // }
            // })
            // .then(res => {
            // setProfile(res.data);
            // setProfile(prevProfile => testProfile);

            setProfile(testProfile);

            // testing (possibly not necessary)
            // setData(prevState => {
            //     return {
            //         ...prevState,
            //         deliveryAddress: profile.address1 + "," + profile.city + "," + profile.state + "," + profile.zipcode
            //     }
            // });
            // console.log("profile:",profile);
            // console.log("data:", data)
            // })
            // .catch((err) => {
            //     console.error(err);
            //     alert("Something went wrong fetching profile data");
            // });
            console.log("gallons effect:", gallons);
            console.log("selectedDate effect:", selectedDate);
            console.log("quoteformvalid effect:", quoteFormValid);
            // console.log("data:", data);

            const handleCheckFormValid = () => {
                if (gallons !== '' && selectedDate !== '') {
                    setQuoteFormValid(true);
                } else {
                    setQuoteFormValid(false);
                }
            }

            handleCheckFormValid();
        }
    }, [token, gallons, selectedDate, quoteFormValid, quoteValid, navigate]);

    return (
        <>
            <br />
            <center>
                <h1>Fuel Quote Form</h1>
            </center>
            <div className='form-container'>
                <div className='container'>
                    <form onSubmit={handleGetQuote} style={{ 'padding': '10px' }}>
                        <label className='label' htmlFor='requestedGallons' style={{ 'paddingTop': '0px' }}>
                            Gallons Requested
                        </label>
                        <input
                            type='number'
                            id='requestedGallons'
                            name='requestedGallons'
                            placeholder='# of Gallons (100 min.)'
                            min='100'
                            onChange={(e) => handleGallonsReq(e)}
                            required
                        />
                        <br />
                        <label className='label' htmlFor='deliveryDate'>
                            Delivery Date
                        </label>
                        <input
                            type='date'
                            id='deliveryDate'
                            name='deliveryDate'
                            min={getMinDeliveryDays().toISOString().slice(0, 10)}
                            onChange={handleSelectedDate}
                            required
                        />
                        <label className='label' htmlFor='staticAddress'>
                            Address
                        </label>
                        <input
                            type='text'
                            id='staticAddress'
                            name='staticAddress'
                            placeholder='Address'
                            value={profile.address1}
                            readOnly
                            style={{ 'backgroundColor': '#d4d6d8b4' }}
                        />
                        <br />
                        <label className='label' htmlFor='staticCity'>
                            City
                        </label>
                        <input
                            type='text'
                            id='staticCity'
                            name='staticCity'
                            placeholder='City'
                            value={profile.city}
                            readOnly
                            style={{ 'backgroundColor': '#d4d6d8b4' }}
                        />
                        <br />
                        <label className='label' htmlFor='staticState'>
                            State
                        </label>
                        <input
                            type='text'
                            id='staticState'
                            name='staticState'
                            placeholder='State'
                            value={profile.state}
                            readOnly
                            style={{ 'backgroundColor': '#d4d6d8b4' }}
                        />
                        <br />
                        <label className='label' htmlFor='staticZip'>
                            ZIP Code
                        </label>
                        <input
                            type='text'
                            id='staticZip'
                            name='staticZip'
                            placeholder='ZIP Code'
                            value={profile.zipcode}
                            readOnly
                            style={{ 'marginBottom': '10px', 'backgroundColor': '#d4d6d8b4' }}
                        />
                        <br />
                        <button type='submit' disabled={!quoteFormValid} onSubmit={handleGetQuote}>
                            Request Quote
                        </button>
                        <br />
                    </form>
                </div>
                <div className='container'>
                    <form onSubmit={handleQuoteSubmit} style={{ 'padding': '10px' }}>
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
                        </label >
                        <input
                            type='text'
                            id='staticPriceDue'
                            name='staticPriceDue'
                            placeholder='$'
                            value={`$ ${parseFloat(quote.total).toFixed(2)}`}
                            readOnly className='form-control-plaintext'
                            style={{ 'padding': '0px', 'margin': '0px', 'textAlign': 'center' }}
                        />
                        <button type='submit' disabled={!quoteValid} onSubmit={handleQuoteSubmit}>
                            Submit Quote
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FuelQuoteForm