class Customer {
    constructor(customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
        this.futureBookings = [];
        this.pastBookings = [];
    }

    getMyBookings(bookings, today) {
        const myBookings = bookings.filter(booking => this.id === booking.userID);
        myBookings.forEach(booking => {
            let resDate = new Date(booking.date);
            resDate > today ? this.futureBookings.push(booking) : this.pastBookings.push(booking);
        });
    }
}

export default Customer;