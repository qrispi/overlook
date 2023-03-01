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
});