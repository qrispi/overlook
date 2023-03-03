import './css/styles.css';
import getAllPromises from './api-calls';
import Hotel from './classes/Hotel';
import Customer from './classes/Customer';
import './images/turing-logo.png';
import './images/hotel-room.png';

let user;
let hotel;
let today;

const searchRooms = document.getElementById('searchRoomsButton');
const filter = document.getElementById('filterButton');
const clearFilters = document.getElementById('clearButton');

searchRooms.addEventListener('click', displayRooms);
filter.addEventListener('click', filterRooms);
clearFilters.addEventListener('click', clearRoomOptions);

getData();

function getData() {
    today = new Date();
    today.setHours(0,0,0,0);
    let loginID = 5;
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
        futureSection.innerHTML = '<h4>No Upcoming Reservations! Book one now with the Book button!</h4>';
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
        pastSection.innerHTML = "<h4>Looks like you haven't stayed with us before! Change that by using the book button!</h4>";
    }
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userAmountSpent').innerText = user.calculateMoneySpent(hotel.rooms);
}

function displayRooms() {
    const selectedDate = document.getElementById('dateInput').value;
    if(selectedDate) {
        const date = selectedDate.replaceAll('-', '/');
        // This will get sent to method which will return an array of rooms that match
        console.log(date);
    }
    

    // IN CASE REPLACE ALL DOESN"T WORK
    // const selectedDate = new Date(document.getElementById('dateInput').value);
    // let test = new Date("2023-04-11")
    // console.log("test", test)
    // console.log(selectedDate);
}

function filterRooms() {
    const bedNum = parseInt(document.getElementById('bedNum').value);
    const bedSize = document.getElementById('bedSize').value.toLowerCase();
    const roomType = document.getElementById('roomType').value.toLowerCase();
    const bidet = document.getElementById('bidet').value;
    const values = [bedNum, bedSize, roomType, bidet];
    const filters = [];
    values.forEach(value => {if(value) filters.push(value)});
    // This will call the filter method with the tags array
    if(filters.length > 0) console.log(filters);
}

function clearRoomOptions() {
    // Refactor these to be global since function above uses too?
    document.getElementById('bedNum').value = '';
    document.getElementById('bedSize').value = '';
    document.getElementById('roomType').value = '';
    document.getElementById('bidet').value = '';
}

// PURELY FOR TESTING
function logData() {
    user.sortMyBookings(hotel.bookings, today);


    console.log('Today: ', today);
    console.log("hotel: ", hotel);
    console.log("user: ", user);
}

// window.addEventListener('keyup', logKey)

// function logKey() {
//     console.log(event.key)
//     console.log(event.keyCode)
//     console.log(event.keyChar)
// }