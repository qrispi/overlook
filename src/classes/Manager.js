import Customer from "./Customer";

class Manager {
    constructor(customersData) {
        this.customers = customersData.map(customer => new Customer(customer));
    }
}

export default Manager;