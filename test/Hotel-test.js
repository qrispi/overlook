import {expect} from 'chai';
import Room from '../src/classes/Room';
import Booking from '../src/classes/Booking';
import Hotel from '../src/classes/Hotel';
import testData from "./test-data";

describe('Hotel', () => {
    let hotel, room, rooms, booking, bookings;

    beforeEach(() => {
        rooms = testData.testRooms;
        room = new Room(rooms[0]);
        bookings = testData.testBookings;
        booking = new Booking(bookings[0]);
        hotel = new Hotel(rooms, bookings);
    });

    it('should be a function', () => {
        expect(Hotel).to.be.a('function');
    });

    it('should be an instance of Hotel', () => {
        expect(hotel).to.be.an.instanceOf(Hotel);
    });

    it('should store an array of Rooms', () => {
        expect(hotel.rooms).to.be.a('array');
        expect(hotel.rooms.length).to.equal(5);
        expect(hotel.rooms[1]).to.be.an.instanceOf(Room);
        expect(hotel.rooms[3]).to.deep.equal(rooms[3]);
    });

    it('should start with no bookings', () => {
        expect(hotel.bookings).to.equal(undefined);
    });

    it('should update and store an array of Bookings', () => {
        hotel.updateBookings(bookings);
        expect(hotel.bookings).to.be.a('array');
        expect(hotel.bookings.length).to.equal(5);
        expect(hotel.bookings[0]).to.be.an.instanceOf(Booking);
    });

    it('should be able to find rooms available by date', () => {
        hotel.updateBookings(bookings);
        hotel.checkDate('2022/02/05');
        expect(hotel.available.length).to.equal(1);
        expect(hotel.available[0]).to.deep.equal(room);
    });

    it('should be able to filter available rooms by attribute', () => {
        hotel.updateBookings(bookings);
        hotel.checkDate('2022/02/05');
        const bidet = true;
        const bedSize = 'queen';
        const roomType = 'residential suite';
        const numBeds = 1;
        const tags = [bidet, bedSize, roomType, numBeds];
        const available = hotel.filterAvailable(tags);
        expect(available[0]).to.deep.equal(room);
    });
});