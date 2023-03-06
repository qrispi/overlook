import './css/styles.css';
import apiFunctions from './api-calls';
import Hotel from './classes/Hotel';
import Customer from './classes/Customer';
import './images/confetti.gif';
import './images/single-room.png';
import './images/suite.png';
import './images/junior-suite.png';
import './images/residential-suite.png';
import './images/hotel-deck.png';

let user;
let hotel;
let today;
let selectedDate;
let userView;

const searchRoomsButton = document.getElementById('searchRoomsButton');
const filterButton = document.getElementById('filterButton');
const clearFiltersButton = document.getElementById('clearButton');
const myReservationsButton = document.getElementById('myReservationsNav');
const loginButton = document.getElementById('loginButton');

const userReservations = document.getElementById('myReservations');
const availableRooms = document.getElementById('availableRooms');
const filteredRooms = document.getElementById('filteredRooms');
const modalBg = document.getElementById('modalBg');
const loginPage = document.getElementById('loginPage');

searchRoomsButton.addEventListener('click', checkForRooms);
filterButton.addEventListener('click', filterRooms);
clearFiltersButton.addEventListener('click', clearRoomOptions);
myReservationsButton.addEventListener('click', displayUserReservations);
loginButton.addEventListener('click', validateLogin);
filteredRooms.addEventListener('click', generateModal);
modalBg.addEventListener('click', collapseModal);

// getData();

function validateLogin() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMessage');
    if(!username && !password) {
        errorMsg.innerText = "Please enter your username and password!";
    }
    if(username && !password) {
        errorMsg.innerText = "Please enter your password!";
    }
    if(!username && password) {
        errorMsg.innerText = "Please enter your username!";
    }
    if(username && password) {
        if(!username.includes('customer')) {
            errorMsg.innerText = "No user found with that name!";
        } else if(password !== 'overlook2021') {
            errorMsg.innerText = "Incorrect password! Please try again.";
        } else {
            const userID = parseInt(username.split('customer')[1]);
            if(userID < 1 || userID > 50) {
                errorMsg.innerText = "No user found with that name!";
            } else {
                errorMsg.innerText = "Welcome! Please wait while we gather your data...";
                getData(userID);
                console.log("ID: ", userID)
                console.log("Password: ", password)
            }
        }
    }
}

function getData(loginID) {
    today = new Date();
    today.setHours(0,0,0,0);
    // let loginID = 5;
    apiFunctions.getAllPromises(loginID).then(data => {
        hotel = new Hotel(data[0].rooms);
        hotel.assignRoomStyles();
        hotel.updateBookings(data[1].bookings);
        user = new Customer(data[2]);
    })
    .then(logData)
    .then(clearLogin);
}

function clearLogin() {
    // Global vars???
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
    displayUserReservations();
    toggleHidden(loginPage);
}

function displayUserReservations() {
    if(!userView) {
        userView = true;
        const futureSection = document.getElementById('userFutureBookings');
        const pastSection = document.getElementById('userPastBookings');
        toggleHidden(availableRooms);
        toggleHidden(userReservations);
        user.sortMyBookings(hotel.bookings, today);
        futureSection.innerHTML = '';
        pastSection.innerHTML = '';
        if(user.myBookings.futureBookings.length > 0) {
            user.myBookings.futureBookings.forEach(booking => {
                futureSection.innerHTML += `
                <article class="future-booking" style="background-color:${booking.color}">
                    <img src=${booking.image} alt="picture of booked room" class="booking-image">
                    <h5 style="text-transform: capitalize"><i>${booking.roomType}</i></h5>
                    <h5>Reserved on ${booking.date}</h5>
                </article>`;
            });
        } else {
            futureSection.innerHTML = '<h4>No Upcoming Reservations! Book one now with the Book button!</h4>';
        }
        if(user.myBookings.pastBookings.length > 0) {
            user.myBookings.pastBookings.forEach(booking => {
                pastSection.innerHTML += `
                <article class="past-booking">
                    <h5 style="text-transform: capitalize"><i>${booking.roomType}</i></h5>
                    <h5>Stayed on ${booking.date}</h5>
                </article>`;
            });
        } else {
            pastSection.innerHTML = "<h4>Looks like you haven't stayed with us before! Change that by using the book button!</h4>";
        }
        document.getElementById('userName').innerText = user.name;
        document.getElementById('userAmountSpent').innerText = user.calculateMoneySpent();
    }
}

function checkForRooms() {
    const date = document.getElementById('dateInput').value;
    if(date) {
        if(userView) {
            userView = false;
            toggleHidden(availableRooms);
            toggleHidden(userReservations);
        }
        selectedDate = date.replaceAll('-', '/');
        const rooms = hotel.checkDate(selectedDate);
        displayAvailableRooms(rooms);
    }
}

function displayAvailableRooms(rooms) {
    filteredRooms.innerHTML = '';
    rooms.forEach(room => {
        filteredRooms.innerHTML += `
        <article class="future-booking" data-room="${room.number}" style="background-color:${room.color}">
            <img src=${room.image}  alt="picture of booked room" class="booking-image" data-room="${room.number}">
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
        <article class="clicked-room" style="background-color:${thisRoom.color}">
            <img src="./images/hotel-room.png" alt="picture of booked room" class="modal-image">
            <h5 style="text-transform: capitalize"><i>${thisRoom.roomType}</i></h5>
            <h5 style="text-transform: capitalize">${bedsMsg}</h5>
            <h5>${bidetMsg}</h5>
            <div id="bookBox">
                <button id="modalBookButton">Book now for $${thisRoom.costPerNight.toFixed(2)}</button>
            </div>
        </article>`;
        document.getElementById('modalBookButton').addEventListener('click', () => bookRoom(roomNum, thisRoom));
    }
}

function collapseModal(event, command) {
    if(command || event.target.className === 'modal-bg') {
        toggleHidden(modalBg);
    }
}

function bookRoom(roomNumber, thisRoom) {
    const bookBox = document.getElementById('bookBox');
    bookBox.innerHTML = `<h5>Booking in progress! Please wait...</h5>`;
    const body = {"userID": user.id, "date": selectedDate, "roomNumber": roomNumber};
    apiFunctions.fetchData('bookings', 'POST', body);
    apiFunctions.fetchData('bookings', 'GET').then(data => {
        hotel.updateBookings(data.bookings);
        checkForRooms();
        confirmationModal(thisRoom);
    });
}

function confirmationModal(thisRoom) {
    modalBg.innerHTML = '';
    modalBg.innerHTML += `
        <article class="clicked-room" style="background-color:${thisRoom.color}">
            <img src="./images/confetti.gif" alt="picture of exploding confetti" class="confetti-image">
            <h5>Success!</h5>
            <h5>You have booked the <i style="text-transform: capitalize">${thisRoom.roomType}</i> on ${selectedDate}!</h5>
            <h5>We are so excited to have you for the whole night!</h5>
        </article>`;
    setTimeout(collapseModal, 3000, null, true);
}

function toggleHidden(element) {
    element.classList.toggle('hidden');
}

// PURELY FOR TESTING
function logData() {
    console.log('Today: ', today);
    console.log("hotel: ", hotel);
    console.log("user: ", user);
}