import { expect } from 'chai';
import Room from '../src/classes/Room';
import testData from "./test-data";

describe('Room', () => {
    let room1, room2, roomsData;

    beforeEach(() => {
        roomsData = testData.testRooms;
        room1 = new Room(roomsData[0]);
        room2 = new Room(roomsData[1]);
    });

    it('should be a function', () => {
        expect(Room).to.be.a('function');
    });
});