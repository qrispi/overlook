import {expect} from 'chai';
// import { describe } from 'mocha';
import testData from "./test-data";
import Booking from '../src/classes/Booking';

describe('Booking', () => {
    let bookingData, booking1, booking2;

    beforeEach(() => {
        bookingData = testData.testBookings;
        booking1 = new Booking(bookingData[0]);
        booking2 = new Booking(bookingData[1]);
    });

    it('should be a function', () => {
        expect(Booking).to.be.a('function');
    });
});