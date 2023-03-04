class Customer {
    constructor(customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
        this.myBookings;
        this.futureBookings = [];
        this.pastBookings = [];
    }

    sortMyBookings(bookings, today) {
        this.myBookings = bookings.filter(booking => this.id === booking.userID);
        this.myBookings.forEach(booking => {
            let resDate = new Date(booking.date);
            resDate >= today ? this.futureBookings.push(booking) : this.pastBookings.push(booking);
        });
    }

    calculateMoneySpent() {
        const moneySpent = this.myBookings.reduce((acc, booking) => {
                    acc += booking.costPerNight;
                    return acc;
                }, 0);
        return Math.round(moneySpent);
    }
}

export default Customer;