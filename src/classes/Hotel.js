import Room from "./Room.js";
import Booking from "./Booking.js";

class Hotel {
    constructor(roomsData, bookingData) {
        this.rooms = roomsData.map(room => new Room(room));
        this.bookings = bookingData.map(booking => new Booking(booking));
    }

    updateBookings() {
        this.bookings.forEach(booking => booking.populateRoomInfo(this.rooms));
    }

    checkDate(date) {
        const unavailable = [];
        this.bookings.forEach(booking => {
            if(booking.date === date) {
                unavailable.push(booking.roomNumber);
            }
        });
        return this.rooms.filter(room => !unavailable.includes(room.number));
    }
}

export default Hotel;