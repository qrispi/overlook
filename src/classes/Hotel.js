import Room from "./Room.js";

class Hotel {
    constructor(roomsData) {
        this.rooms = roomsData.map(roomData => new Room(roomData));
    }
}

export default Hotel;