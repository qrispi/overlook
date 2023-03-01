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
});