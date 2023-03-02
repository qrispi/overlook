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
    .then(logData)
    .then(displayUserReservations);
}

function displayUserReservations() {
    const futureSection = document.getElementById('userFutureBookings');
    const pastSection = document.getElementById('userPastBookings');
    futureSection.innerHTML = '';
    pastSection.innerHTML = '';
    user.futureBookings.forEach(booking => {
        futureSection.innerHTML += `
        <article class="future-booking">
            <img src="./images/hotel-room.png" alt="picture of booked room" class="booking-image">
            <h5><i>ADD ROOM TYPE</i></h5>
            <h5>Reserved on ${booking.date}</h5>
        </article>`
    });
    user.pastBookings.forEach(booking => {
        pastSection.innerHTML += `
        <article class="past-booking">
            <h5><i>ADD ROOM TYPE</i></h5>
            <h5>Stayed in ${booking.date}</h5>
        </article>`
    });
    document.getElementById('userAmountSpent').innerText = user.calculateMoneySpent(hotel.rooms);
}

// PURELY FOR TESTING
function logData() {
    console.log('Today: ', today);
    console.log("hotel: ", hotel);
    user.sortMyBookings(hotel.bookings, today);
    console.log("money spent: ", user.calculateMoneySpent(hotel.rooms));
    console.log("user: ", user);
}