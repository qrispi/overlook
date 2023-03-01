import { expect } from 'chai';
import Room from '../src/classes/Room';
import Hotel from '../src/classes/Hotel';
import testData from "./test-data";

describe('Hotel', () => {
    let hotel, room, rooms;

    beforeEach(() => {
        rooms = testData.testRooms
        room = new Room(rooms[0])
        hotel = new Hotel(rooms)
    });

    it('should be a function', () => {
        expect(Hotel).to.be.a('function');
    });

    it('should be an instance of Hotel', () => {
        expect(hotel).to.be.an.instanceOf(Hotel);
    });

    it('should store an array of rooms', () => {
        expect(hotel.rooms).to.be.a('array');
        expect(hotel.rooms.length).to.equal(5);
        expect(hotel.rooms[1]).to.be.an.instanceOf(Room);
    });
});