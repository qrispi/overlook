import {expect} from 'chai';
import Manager from '../src/classes/Manager';
import testData from "./test-data";

describe('Manager', () => {
    let manager;

    beforeEach(() => {
        manager = new Manager();
    });

    it('should be a function', () => {
        expect(Manager).to.be.a('function');
    });

    it('should be an instance of Manager', () => {
        expect(manager).to.be.an.instanceOf(Manager);
    });
});