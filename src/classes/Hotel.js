import Room from "./Room.js";
import Booking from "./Booking.js";

class Hotel {
    constructor(roomsData, bookingData) {
        this.rooms = roomsData.map(room => new Room(room));
        this.bookings = bookingData.map(booking => new Booking(booking));
    };
};

export default Hotel;