import './css/styles.css';
import getAllPromises from './api-calls';
import Hotel from './classes/Hotel';
import Customer from './classes/Customer';
// import './images/turing-logo.png';
import './images/hotel-room.png';

let user;
let hotel;
let today;

const searchRoomsButton = document.getElementById('searchRoomsButton');
const filterButton = document.getElementById('filterButton');
const clearFiltersButton = document.getElementById('clearButton');
const myReservationsButton = document.getElementById('myReservationsNav');

const userReservations = document.getElementById('myReservations');
const availableRooms = document.getElementById('availableRooms');
const filteredRooms = document.getElementById('filteredRooms');
const modalBg = document.getElementById('modalBg');

searchRoomsButton.addEventListener('click', checkForRooms);
filterButton.addEventListener('click', filterRooms);
clearFiltersButton.addEventListener('click', clearRoomOptions);
myReservationsButton.addEventListener('click', displayUserReservations);
filteredRooms.addEventListener('click', generateModal);
modalBg.addEventListener('click', collapseModal);

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
    toggleHidden(availableRooms);
    toggleHidden(userReservations);
    user.sortMyBookings(hotel.bookings, today);
    futureSection.innerHTML = '';
    pastSection.innerHTML = '';
    if(user.futureBookings.length > 0) {
        user.futureBookings.forEach(booking => {
            futureSection.innerHTML += `
            <article class="future-booking">
                <img src="./images/hotel-room.png" alt="picture of booked room" class="booking-image">
                <h5><i>ADD ROOM TYPE</i></h5>
                <h5>Reserved on ${booking.date}</h5>
            </article>`;
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
            </article>`;
        });
    } else {
        pastSection.innerHTML = "<h4>Looks like you haven't stayed with us before! Change that by using the book button!</h4>";
    }
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userAmountSpent').innerText = user.calculateMoneySpent();
}

function checkForRooms() {
    const selectedDate = document.getElementById('dateInput').value;
    if(selectedDate) {
        toggleHidden(availableRooms);
        toggleHidden(userReservations);
        const date = selectedDate.replaceAll('-', '/');
        const rooms = hotel.checkDate(date);
        displayAvailableRooms(rooms);
    }
}

function displayAvailableRooms(rooms) {
    filteredRooms.innerHTML = '';
    rooms.forEach(room => {
        filteredRooms.innerHTML += `
        <article class="future-booking" data-room="${room.number}">
            <img src="./images/hotel-room.png" alt="picture of booked room" class="booking-image" data-room="${room.number}">
            <h5 style="text-transform: capitalize" data-room="${room.number}"><i>${room.roomType}</i></h5>
            <h5 data-room="${room.number}">Total Price $${room.costPerNight.toFixed(2)}</h5>
        </article>`;
    });
    if(rooms.length < 1) {
        filteredRooms.innerHTML = `<h4 class="no-rooms-msg">Oh No! We don't have any rooms available that match that date and filter! Try a different search!</h4>`;
    }
}

function filterRooms() {
    const bedNum = parseInt(document.getElementById('bedNum').value);
    const bedSize = document.getElementById('bedSize').value.toLowerCase();
    const roomType = document.getElementById('roomType').value.toLowerCase();
    const bidetString = document.getElementById('bidet').value;
    const bidet = (bidetString === 'true');
    const values = [bedNum, bedSize, roomType, bidet];
    const filters = [];
    values.forEach(value => {if(value) filters.push(value)});
    if(filters.length > 0) {
        let filteredRooms = hotel.filterAvailable(filters);
        displayAvailableRooms(filteredRooms);
    }
}

function clearRoomOptions() {
    // Refactor these to be global since function above uses too?
    document.getElementById('bedNum').value = '';
    document.getElementById('bedSize').value = '';
    document.getElementById('roomType').value = '';
    document.getElementById('bidet').value = '';
    if(hotel.available) {
        displayAvailableRooms(hotel.available);
    }
}

function generateModal(event) {
    if(event.target.className !== 'filtered-rooms') {
        toggleHidden(modalBg);
        const roomNum = +(event.target.dataset.room);
        const thisRoom = hotel.rooms.find(room => room.number === roomNum);
        let bedsMsg = `One ${thisRoom.bedSize} Bed`;
        if(thisRoom.numBeds === 2) bedsMsg = `Two ${thisRoom.bedSize} Beds`;
        let bidetMsg = "For Butts who Like Paper 🧻";
        if(thisRoom.bidet) bidetMsg = "For Butts who like Water 🚿";
        modalBg.innerHTML = '';
        modalBg.innerHTML += `
        <article class="clicked-room">
            <img src="./images/hotel-room.png" alt="picture of booked room" class="modal-image">
            <h5 style="text-transform: capitalize"><i>${thisRoom.roomType}</i></h5>
            <h5 style="text-transform: capitalize">${bedsMsg}</h5>
            <h5>${bidetMsg}</h5>
            <button>Book now for $${thisRoom.costPerNight.toFixed(2)}</button>
        </article>`;
    }
}

function collapseModal(event) {
    if(event.target.className === 'modal-bg') {
        toggleHidden(modalBg);
    }
}

function toggleHidden(element) {
    element.classList.toggle('hidden');
}

// PURELY FOR TESTING
function logData() {
    // THIS PART IS IMPORTANT
    hotel.updateBookings();


    console.log('Today: ', today);
    console.log("hotel: ", hotel);
    console.log("user: ", user);
}