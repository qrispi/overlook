import {expect} from 'chai';
import testData from "./test-data";
import Booking from '../src/classes/Booking';

describe('Booking', () => {
    let bookingData, booking1, booking2, roomsData;

    beforeEach(() => {
        bookingData = testData.testBookings;
        roomsData = testData.testRooms;
        booking1 = new Booking(bookingData[0]);
        booking2 = new Booking(bookingData[1]);
    });

    it('should be a function', () => {
        expect(Booking).to.be.a('function');
    });

    it('should be an instance of Booking', () => {
        expect(booking1).to.be.an.instanceOf(Booking);
    });

    it('should have a unique ID', () => {
        expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz');
        expect(booking2.id).to.equal('5fwrgu4i7k55hl6t5');

        expect(booking1.id).to.equal(bookingData[0].id);
        expect(booking2.id).to.equal(bookingData[1].id);
    });

    it('should store the user ID of who booked it', () => {
        expect(booking1.userID).to.equal(1);
        expect(booking2.userID).to.equal(43);

        expect(booking1.userID).to.equal(bookingData[0].userID);
        expect(booking2.userID).to.equal(bookingData[1].userID);
    });

    it('should store the date it is booked for', () => {
        expect(booking1.date).to.equal('2023/04/22');
        expect(booking2.date).to.equal('2022/01/24');

        expect(booking1.date).to.equal(bookingData[0].date);
        expect(booking2.date).to.equal(bookingData[1].date);
    });

    it('should store the room number it is booked for', () => {
        expect(booking1.roomNumber).to.equal(1);
        expect(booking2.roomNumber).to.equal(2);

        expect(booking1.roomNumber).to.equal(bookingData[0].roomNumber);
        expect(booking2.roomNumber).to.equal(bookingData[1].roomNumber);
    });

    it('should be able to add room data to booking', () => {
        booking1.populateRoomInfo(roomsData);
        expect(booking1.roomType).to.equal('residential suite');
        expect(booking1.bidet).to.equal(true);
        expect(booking1.bedSize).to.equal('queen');
        expect(booking1.numBeds).to.equal(1);
        expect(booking1.costPerNight).to.equal(358.4);

        booking2.populateRoomInfo(roomsData);
        expect(booking2.roomType).to.equal('suite');
        expect(booking2.bidet).to.equal(false);
        expect(booking2.bedSize).to.equal('full');
        expect(booking2.numBeds).to.equal(2);
        expect(booking2.costPerNight).to.equal(477.38);
    });
});