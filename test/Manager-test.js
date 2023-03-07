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

    it('should be able to update Customer data', () => {
        expect(manager.updateCustomers).to.be.a('function');
    });

    it('should update customers to store only their bookings and sort by past or future', () => {
        manager.updateCustomers(hotel.bookings, today);

        expect(manager.customers[0].myBookings).to.be.a('object');
        expect(manager.customers[0].myBookings.pastBookings.length).to.equal(1);
        expect(manager.customers[0].myBookings.futureBookings.length).to.equal(1);

        expect(manager.customers[1].myBookings).to.be.a('object');
        expect(manager.customers[1].myBookings.pastBookings.length).to.equal(0);
        expect(manager.customers[1].myBookings.futureBookings.length).to.equal(0);
    });

    it('should update customers to store their total amount spent', () => {
        manager.updateCustomers(hotel.bookings, today);

        expect(manager.customers[0].myMoneySpent).to.be.a('number');
        expect(manager.customers[0].myMoneySpent).to.equal(699);

        expect(manager.customers[1].myMoneySpent).to.be.a('number');
        expect(manager.customers[1].myMoneySpent).to.equal(0);
    });

    it('should be able to find and return a customer by name', () => {
        const search1 = manager.searchCustomers('Leatha Ullrich');
        const search2 = manager.searchCustomers('Rocio Schuster');

        expect(search1).to.deep.equal(customer1);
        expect(search2).to.deep.equal(customer2);
    });

    it('should not be capitalization dependent for customer search', () => {
        const search1 = manager.searchCustomers('leATha ullriCH');
        const search2 = manager.searchCustomers('rocio SCHUSTER');

        expect(search1).to.deep.equal(customer1);
        expect(search2).to.deep.equal(customer2);
    });

    it('should return undefined if a customer is not found', () => {
        const search1 = manager.searchCustomers('potato');
    
        expect(search1).to.equal(undefined);
    });

    it('should be able to find all rooms booked for a date', () => {
        manager.checkToday(hotel.bookings, '2022/02/05');
        expect(manager.todaysBookings.length).to.equal(4);

        manager.checkToday(hotel.bookings, today);
        expect(manager.todaysBookings.length).to.equal(0);
    });

    it('should be able to calculate and store all of the days revenue', () => {
        manager.checkToday(hotel.bookings, '2022/02/05');
        manager.checkTodaysRevenue();
        expect(manager.todaysRevenue).to.equal(1738);

        manager.checkToday(hotel.bookings, today);
        manager.checkTodaysRevenue();
        expect(manager.todaysRevenue).to.equal(0);
    })
});