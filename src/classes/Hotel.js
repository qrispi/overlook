import Room from "./Room.js";
import Booking from "./Booking.js";

class Hotel {
    constructor(roomsData) {
        this.rooms = roomsData.map(room => new Room(room));
        this.bookings;
        this.available;
    }

    assignRoomStyles() {
        this.rooms.forEach(room => room.assignStyles());
    }

    updateBookings(bookingData) {
        this.bookings = bookingData.map(booking => new Booking(booking));
        this.bookings.forEach(booking => booking.populateRoomInfo(this.rooms));
    }

    checkDate(date) {
        const unavailable = [];
        this.bookings.forEach(booking => {
            if(booking.date === date) {
                unavailable.push(booking.roomNumber);
            }
        });
        this.available = this.rooms.filter(room => !unavailable.includes(room.number));
        return this.available;
    }

    filterAvailable(tags) {
        let filtered = this.available;
        tags.forEach(tag => {
            filtered = filtered.filter(room => {
                let values = Object.values(room);
                values.splice(0, 1);
                if(values.includes(tag)) return room;
            });
        });
        return filtered;
    }
}

export default Hotel;