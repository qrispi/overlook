import {expect} from 'chai';
import Customer from '../src/classes/Customer';
import testData from './test-data';

describe('Customer', () => {
    let customerData, customer1, customer2, bookingsData;
    const today = new Date();
    today.setHours(0,0,0,0);

    beforeEach(() => {
        customerData = testData.testCustomers;
        customer1 = new Customer(customerData[0]);
        customer2 = new Customer(customerData[1]);
        bookingsData = testData.testBookings;
        bookingsData.forEach(booking => booking.costPerNight = 500.01);
    });

    it('should be a function', () => {
        expect(Customer).to.be.a('function');
    });

    it('should be an instance of Customer', () => {
        expect(customer1).to.be.an.instanceOf(Customer);
    });

    it('should have a unique ID', () => {
        expect(customer1.id).to.equal(1);
        expect(customer2.id).to.equal(2);

        expect(customer1.id).to.equal(customerData[0].id);
        expect(customer2.id).to.equal(customerData[1].id);
    });

    it('should have a unique name', () => {
        expect(customer1.name).to.equal('Leatha Ullrich');
        expect(customer2.name).to.equal('Rocio Schuster');

        expect(customer1.name).to.equal(customerData[0].name);
        expect(customer2.name).to.equal(customerData[1].name);
    });

    it('should be able to sort and store their bookings', () => {
        customer1.sortMyBookings(bookingsData, today);
        customer2.sortMyBookings(bookingsData, today);

        expect(customer1.myBookings).to.be.a('object');
        expect(customer1.myBookings.pastBookings.length).to.equal(1);
        expect(customer1.myBookings.futureBookings.length).to.equal(1);

        expect(customer2.myBookings).to.be.a('object');
        expect(customer2.myBookings.pastBookings.length).to.equal(0);
        expect(customer2.myBookings.futureBookings.length).to.equal(0);
    });

    it('should be able to calculate and store their total amount spent', () => {
        customer1.sortMyBookings(bookingsData, today);
        customer2.sortMyBookings(bookingsData, today);
        customer1.calculateMoneySpent();
        customer2.calculateMoneySpent();

        expect(customer1.myMoneySpent).to.be.a('number');
        expect(customer1.myMoneySpent).to.equal(1000);
        expect(customer2.myMoneySpent).to.be.a('number');
        expect(customer2.myMoneySpent).to.equal(0);
    });
});