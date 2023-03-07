import Customer from "./Customer";

class Manager {
    constructor(customersData) {
        this.customers = customersData.map(customer => new Customer(customer));
    }

    updateCustomers(bookings, today) {
        this.customers.forEach(customer => {
            customer.sortMyBookings(bookings, today);
            customer.calculateMoneySpent();
        }); 
    }

    searchCustomers(name) {
        return this.customers.find(customer => name.toLowerCase() === customer.name.toLowerCase());
    }

    checkToday(bookings, date) {
        return bookings.filter(booking => booking.date === date);
    }
}

export default Manager;