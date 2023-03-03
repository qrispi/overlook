import './css/styles.css';
import getAllPromises from './api-calls';
import Hotel from './classes/Hotel';
import Customer from './classes/Customer';
import './images/turing-logo.png';
import './images/hotel-room.png';

let user;
let hotel;

const filter = document.getElementById('filterButton')
filter.addEventListener('click', filterRooms)

function filterRooms() {
    
    console.log(document.getElementById('bedNum').value)
    console.log(document.getElementById('bedSize').value)
    console.log(document.getElementById('roomType').value)
    console.log(document.getElementById('bidet').value)
}
window.addEventListener('keyup', logKey)

function logKey() {
    console.log(event.key)
    console.log(event.keyCode)
    console.log(event.keyChar)
}

getData();

function getData() {
    let loginID = 34;
    getAllPromises(loginID).then(data => {
        hotel = new Hotel(data[0].rooms, data[1].bookings);
        user = new Customer(data[2]);
    })
    .then(logData);
}

// PURELY FOR TESTING
function logData() {
    console.log("user: ", user);
    console.log("hotel: ", hotel);
}