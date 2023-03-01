import {expect} from 'chai';
import Customer from '../src/classes/Customer';
import testData from './test-data';

describe('Customer', () => {
    let customerData, customer1, customer2;

    beforeEach(() => {
        customerData = testData.testCustomers;
        customer1 = new Customer(customerData[0]);
        customer2 = new Customer(customerData[1]);
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
});