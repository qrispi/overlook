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

    // it('should store an array of Bookings', () => {
    //     expect(hotel.bookings).to.be.a('array');
    //     expect(hotel.bookings.length).to.equal(5);
    //     expect(hotel.bookings[0]).to.be.an.instanceOf(Booking);
    //     expect(hotel.bookings[3]).to.deep.equal(bookings[3]);
    // });
});