import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './FuelQuoteForm.css'

const FuelQuoteForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    // //Fastest delivey takes three days
    let date = new Date();
    date.setDate(date.getDate() + 3);

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
                    </div>
                </div>

                {/* Enter gallons field */}
                <div className="row">
                    <div className="col-25">
                        <label for="requestAmount">Enter number of gallons</label>
                    </div>
                    <div className="col-25">
                        <input
                            type="number"
                            className="col-50"
                            id="requestAmount"
                            placeholder="Minimum of 100 gallons"
                            min="100"
                            required />
                    </div>
                </div>

                {/* Non-editable address */}
                <div className="row">
                    <div className="col-25">
                        <label for="staticAddress">Address</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            readonly class="form-control-plaintext"
                            id="staticAddress"
                            value="123 Main St, Houston, TX, 77072" />
                    </div>
                </div>

                {/* Non-editable price */}
                <div className="row">
                    <div className="col-25">
                        <label for="staticPrice" >Estimated Price</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            readonly class="form-control-plaintext"
                            id="staticPrice"
                            value="$750,000" />
                    </div>
                </div>

                {/* Non-editable price per gallon */}
                <div className="row">
                    <div className="col-25">
                        <label for="staticPricePerGallon" >Per gallon cost</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            readonly class="form-control-plaintext"
                            id="staticPricePerGallon"
                            value="$1.76 per gallon" />
                    </div>
                </div>

                {/* Request button -> confirm button */}
                <button type="submit" class="btn btn-primary mb-2">Request Quote</button>


            </form>
        </div>
    );
};

export default FuelQuoteForm;