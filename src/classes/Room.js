class Room {
    constructor(roomObject) {
        this.number = roomObject.number;
        this.roomType = roomObject.roomType;
        this.bidet = roomObject.bidet;
        this.bedSize = roomObject.bedSize;
        this.numBeds = roomObject.numBeds;
        this.costPerNight = roomObject.costPerNight;
    };
};

export default Room;