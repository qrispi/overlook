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

    it('should be an instance of Room', () => {
        expect(room1).to.be.an.instanceOf(Room);
    });

    it('should have a unique number', () => {
        expect(room1.number).to.equal(1);
        expect(room2.number).to.equal(2);

        expect(room1.number).to.equal(roomsData[0].number);
        expect(room2.number).to.equal(roomsData[1].number);
    });

    it('should have a type', () => {
        expect(room1.roomType).to.equal('residential suite');
        expect(room2.roomType).to.equal('suite');

        expect(room1.roomType).to.equal(roomsData[0].roomType);
        expect(room2.roomType).to.equal(roomsData[1].roomType);
    });

    it('should know if there is a bidet', () => {
        expect(room1.bidet).to.equal(true);
        expect(room2.bidet).to.equal(false);

        expect(room1.bidet).to.equal(roomsData[0].bidet);
        expect(room2.bidet).to.equal(roomsData[1].bidet);
    });

    it('should have a bed size', () => {
        expect(room1.bedSize).to.equal('queen');
        expect(room2.bedSize).to.equal('full');

        expect(room1.bedSize).to.equal(roomsData[0].bedSize);
        expect(room2.bedSize).to.equal(roomsData[1].bedSize);
    });

    it('should know how many beds there are', () => {
        expect(room1.numBeds).to.equal(1);
        expect(room2.numBeds).to.equal(2);

        expect(room1.numBeds).to.equal(roomsData[0].numBeds);
        expect(room2.numBeds).to.equal(roomsData[1].numBeds);
    });

    it('should know the cost per night to book it', () => {
        expect(room1.costPerNight).to.equal(358.4);
        expect(room2.costPerNight).to.equal(477.38);

        expect(room1.costPerNight).to.equal(roomsData[0].costPerNight);
        expect(room2.costPerNight).to.equal(roomsData[1].costPerNight);
    });
});