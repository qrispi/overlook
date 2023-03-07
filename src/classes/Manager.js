import Customer from "./Customer";

class Manager {
    constructor(customersData) {
        this.customers = customersData.map(customer => new Customer(customer));
        this.todaysBookings;
        this.todaysRevenue;
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
        this.todaysBookings = bookings.filter(booking => booking.date === date);
    }

    checkTodaysRevenue() {
        this.todaysRevenue = Math.round(this.todaysBookings.reduce((total, booking) => total += booking.costPerNight, 0));
    }
}

export default Manager;