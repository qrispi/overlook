import './css/styles.css';
import getAllPromises from './api-calls';
import Hotel from './classes/Hotel';
import Customer from './classes/Customer';
import './images/turing-logo.png';

let user;
let hotel;

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