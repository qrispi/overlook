class Booking {
    constructor(bookingData) {
        this.id = bookingData.id;
        this.userID = bookingData.userID;
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
        this.roomType;
        this.bidet;
        this.bedSize;
        this.numBeds;
        this.costPerNight;
    }

    populateRoomInfo(rooms) {
        rooms.forEach(room => {
            if(room.number === this.roomNumber) {
                this.roomType = room.roomType;
                this.bidet = room.roomType;
                this.bedSize = room.bedSize;
                this.numBeds = room.numBeds;
                this.costPerNight = room.costPerNight;
            }
        });
    }
}

export default Booking;