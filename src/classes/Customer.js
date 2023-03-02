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
            resDate > today ? this.futureBookings.push(booking) : this.pastBookings.push(booking);
        });
    }

    calculateMoneySpent(rooms) {
        const moneySpent = this.myBookings.reduce((acc, booking) => {
            rooms.forEach(room => {
                if(room.number === booking.roomNumber) {
                    acc += room.costPerNight;
                }
            });
            return acc;
        }, 0);
        return Math.round(moneySpent)
    }
}

export default Customer;