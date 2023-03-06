class Room {
    constructor(roomData) {
        this.number = roomData.number;
        this.roomType = roomData.roomType;
        this.bidet = roomData.bidet;
        this.bedSize = roomData.bedSize;
        this.numBeds = roomData.numBeds;
        this.costPerNight = roomData.costPerNight;
        this.image;
        this.color;
    }

    assignStyles() {
        const images = ['./images/single-room.png', './images/junior-suite.png', './images/suite.png', './images/residential-suite.png'];
        const colors = ['#1e96fc', '#a2d6f9', '#60b6fb', '#1360e2'];
        if(this.roomType === 'single room') {
            this.image = images[0];
            this.color = colors[0];
        }
        if(this.roomType === 'junior suite') {
            this.image = images[1];
            this.color = colors[1];
        }
        if(this.roomType === 'suite') {
            this.image = images[2];
            this.color = colors[2];
        } 
        if(this.roomType === 'residential suite') {
            this.image = images[3];
            this.color = colors[3];
        }
    }
}

export default Room;