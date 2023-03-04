class Customer {
    constructor(customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
        this.myBookings;
    }

    sortMyBookings(bookings, today) {
        const allBookings = bookings.filter(booking => this.id === booking.userID);
        this.myBookings = allBookings.reduce((acc, booking) => {
            let resDate = new Date(booking.date);
            resDate >= today ? acc.futureBookings.push(booking) : acc.pastBookings.push(booking);
            return acc;
        }, {futureBookings: [], pastBookings: []});
    }

    calculateMoneySpent() {
        const keys = Object.keys(this.myBookings);
        const moneySpent = keys.reduce((total, key) => {
            this.myBookings[key].forEach(booking => total += booking.costPerNight);
            return total;
        }, 0);
        return Math.round(moneySpent);
    }
}

export default Customer;