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
    if(user.futureBookings.length > 0) {
        user.futureBookings.forEach(booking => {
            futureSection.innerHTML += `
            <article class="future-booking">
                <img src="./images/hotel-room.png" alt="picture of booked room" class="booking-image">
                <h5><i>ADD ROOM TYPE</i></h5>
                <h5>Reserved on ${booking.date}</h5>
            </article>`
        });
    } else {
        futureSection.innerHTML = '<h4>No Upcoming Reservations! Book one now with the Book button!</h4>'
    }
    if(user.pastBookings.length > 0) {
        user.pastBookings.forEach(booking => {
            pastSection.innerHTML += `
            <article class="past-booking">
                <h5><i>ADD ROOM TYPE</i></h5>
                <h5>Stayed in ${booking.date}</h5>
            </article>`
        });
    } else {
        pastSection.innerHTML = "<h4>Looks like you haven't stayed with us before! Change that by using the book button!</h4>"
    }
    document.getElementById('userName').innerText = user.name;
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