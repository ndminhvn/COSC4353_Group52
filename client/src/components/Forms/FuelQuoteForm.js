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
        <div>
            <form>
                <div class="form-group row">
                    <label for="datePicker" class="col-sm-2 col-form-label">Date</label>
                    <div class="col-sm-10">
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

                <div class="form-group row">
                    <label for="requestAmount" class="col-sm-2 col-form-label">Enter the # of gallons</label>
                    <div class="col-sm-10">
                        <input
                            type="number"
                            class="col-sm-2"
                            id="requestAmount"
                            placeholder="Minimum of 100 gallons"
                            min="100"
                            required />
                    </div>
                </div>

                <div class="form-group row">
                    <label for="staticAddress" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            readonly class="form-control-plaintext"
                            id="staticAddress"
                            value="123 Main St, Houston, TX, 77072" />
                    </div>
                </div>

                <div class="form-group row">
                    <label for="staticPrice" class="col-sm-2 col-form-label">Estimated Price</label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            readonly class="form-control-plaintext"
                            id="staticPrice"
                            value="$750,000" />
                    </div>
                </div>

                <button type="submit" class="btn btn-primary mb-2">Confirm Quote</button>

            </form>
        </div>
    );
};

export default FuelQuoteForm;