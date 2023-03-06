import {expect} from 'chai';
import Manager from '../src/classes/Manager';
import Customer from '../src/classes/Customer';
import Hotel from '../src/classes/Hotel';
import testData from "./test-data";

describe('Manager', () => {
    let manager, hotel, customersData, customer1, customer2, bookingsData, roomsData;
    const today = new Date();
    today.setHours(0,0,0,0);

    beforeEach(() => {
        customersData = testData.testCustomers;
        bookingsData = testData.testBookings;
        roomsData = testData.testRooms;
        hotel = new Hotel(roomsData);
        hotel.updateBookings(bookingsData);
        manager = new Manager(customersData);
        customer1 = new Customer(customersData[0]);
        customer2 = new Customer(customersData[1]);
    });

    it('should be a function', () => {
        expect(Manager).to.be.a('function');
    });

    it('should be an instance of Manager', () => {
        expect(manager).to.be.an.instanceOf(Manager);
    });

    it('should store an array of Customers', () => {
        expect(manager.customers).to.be.a('array');
        expect(manager.customers.length).to.equal(3);
        expect(manager.customers[0]).to.be.a.instanceOf(Customer);
        expect(manager.customers[0]).to.deep.equal(customer1);
    });
});