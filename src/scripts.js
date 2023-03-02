import './css/styles.css';
import getAllPromises from './api-calls';
import Hotel from './classes/Hotel';
import Customer from './classes/Customer';
import './images/turing-logo.png';
import './images/hotel-room.png';

let user;
let hotel;
const today = new Date();

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
    console.log('Today: ', today);
    console.log("hotel: ", hotel);
    user.getMyBookings(hotel.bookings, today);
    console.log("user: ", user);
}