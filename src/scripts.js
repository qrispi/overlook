import './css/styles.css';
import apiFunctions from './api-calls';
import Hotel from './classes/Hotel';
import Customer from './classes/Customer';
import Manager from './classes/Manager';
import './images/confetti.gif';
import './images/single-room.png';
import './images/suite.png';
import './images/junior-suite.png';
import './images/residential-suite.png';
import './images/hotel-deck.png';

let user;
let manager;
let hotel;
let today;
let selectedDate;
let userView;
let isManager;

const searchRoomsButton = document.getElementById('searchRoomsButton');
const filterButton = document.getElementById('filterButton');
const clearFiltersButton = document.getElementById('clearButton');
const myReservationsButton = document.getElementById('myReservationsNav');
const customerSearchButton = document.getElementById('searchCustomersButton');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logOutNav');

const userReservations = document.getElementById('myReservations');
const availableRooms = document.getElementById('availableRooms');
const filteredRooms = document.getElementById('filteredRooms');
const modalBg = document.getElementById('modalBg');
const customerInfo = document.getElementById('managerCustomerView');
const managerView = document.getElementById('managerView');
const loginPage = document.getElementById('loginPage');
const loginForm = document.getElementById('loginForm');

searchRoomsButton.addEventListener('click', checkForRooms);
filterButton.addEventListener('click', filterRooms);
clearFiltersButton.addEventListener('click', clearRoomOptions);
myReservationsButton.addEventListener('click', displayUserReservations);
loginButton.addEventListener('click', validateLogin);
loginForm.addEventListener('keyup', () => {if(event.key === 'Enter') validateLogin()});
logoutButton.addEventListener('click', () => location.reload());
filteredRooms.addEventListener('click', generateModal);
modalBg.addEventListener('click', collapseModal);
customerSearchButton.addEventListener('click', displayCustomerInfo);

function validateLogin() {
    event.preventDefault();
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMessage');
    if(!username && !password) errorMsg.innerText = "Please enter your username and password!";
    if(username && !password) errorMsg.innerText = "Please enter your password!";
    if(!username && password) errorMsg.innerText = "Please enter your username!";
    if(username && password) {
        if(!username.includes('customer') && username !== 'manager') {
            errorMsg.innerText = "No user found with that name!";
        } else if(password !== 'overlook2021') {
            errorMsg.innerText = "Incorrect password! Please try again.";
        } else {
            if(username === 'manager') {
                errorMsg.innerText = "Welcome! Please wait while we gather your data...";
                isManager = true;
                getData(1);
            } else {
                const userID = parseInt(username.split('customer')[1]);
                if(userID < 1 || userID > 50 || !userID) {
                    errorMsg.innerText = "No user found with that name!";
                } else {
                    errorMsg.innerText = "Welcome! Please wait while we gather your data...";
                    getData(userID);
                }
            }
        }
    }
}

function getData(loginID) {
    today = new Date();
    today.setHours(0,0,0,0);
    apiFunctions.getAllPromises(loginID).then(data => {
        hotel = new Hotel(data[0].rooms);
        hotel.assignRoomStyles();
        hotel.updateBookings(data[1].bookings);
        user = new Customer(data[2]);
        manager = new Manager(data[3].customers);
        manager.updateCustomers(hotel.bookings, today);
    })
    .then(logData)
    .then(clearLogin);
}

function clearLogin() {
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
    if(isManager) {
        toggleHidden(managerView);
        toggleHidden(availableRooms);
        displayManagerBookings();
    } else {
        displayUserReservations();
    }
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
        user.calculateMoneySpent();
        document.getElementById('userAmountSpent').innerText = user.myMoneySpent;
    }
}

function checkForRooms(event) {
    const dateInput = document.getElementById('dateInput');
    if(dateInput.checkValidity()) {
        event.preventDefault();
        const date = dateInput.value;
        if(userView) {
            userView = false;
            toggleHidden(availableRooms);
            toggleHidden(userReservations);
        }
        selectedDate = date.replaceAll('-', '/');
        hotel.checkDate(selectedDate);
        displayAvailableRooms(hotel.available);
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
            <img src=${thisRoom.image} alt="picture of selected room" class="modal-image">
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
        hotel.checkDate(selectedDate);
        displayAvailableRooms(hotel.available);
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

function displayManagerBookings() {
    document.getElementById('userName').innerText = 'Manager';
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const displayDate = `${month}/${day}/${year}`;
    const searchDate = `${year}/${month}/${day}`;
    // const searchDate = "2022/02/04"
    manager.checkToday(hotel.bookings, searchDate);
    manager.checkTodaysRevenue();
    const managerBookings = manager.todaysBookings;
    const todaysRevenue = manager.todaysRevenue;
    console.log(managerBookings)
    console.log(todaysRevenue)
    const todaysBookings = document.getElementById('todaysBookings');
    document.getElementById('managerDate').innerText = displayDate;
    document.getElementById('managerRevenue').innerText = todaysRevenue;
    todaysBookings.innerHTML = ''
    if(managerBookings.length > 0) {
        managerBookings.forEach(booking => {
            todaysBookings.innerHTML += `
            <article class="past-booking">
                <h5>Room Number: ${booking.roomNumber}</h5>
                <h5 style="text-transform: capitalize"><i>${booking.roomType}</i></h5>
                <h5>Booked by ${manager.customers[booking.userID - 1].name}</h5>
            </article>`;
        });
    } else {
        todaysBookings.innerHTML = "<h4>Looks like you should make some calls! No bookings for today...</h4>";
    }
}

function displayCustomerInfo() {
    event.preventDefault();
    const name = document.getElementById('searchName').value;
    customerInfo.innerHTML = '';
    const customer = manager.searchCustomers(name);
    if(customer) {
        customerInfo.innerHTML += `
        <h4>${customer.name}</h4>
        <h4>Lifetime Spend: $${customer.myMoneySpent}</h4>`
        if(customer.myBookings.futureBookings.length > 0) {
            customerInfo.innerHTML += `<h4>Future Bookings:</h4>`
            customer.myBookings.futureBookings.forEach(booking => {
                customerInfo.innerHTML += `
                <article class="past-booking">
                    <h5>Room Number: ${booking.roomNumber}</h5>
                    <h5 style="text-transform: capitalize"><i>${booking.roomType}</i></h5>
                    <h5>Booked for ${booking.date}</h5>
                    <h5>Booking Amount: $${booking.costPerNight}</h5>
                    <button class="cancelButton" data-booking="${booking.id}">Cancel Booking</button>
                </article>`;
            });
            customerInfo.addEventListener('click', deleteBooking);
        }
        if(customer.myBookings.pastBookings.length > 0) {
            customerInfo.innerHTML += `<h4>Past Bookings:</h4>`
            customer.myBookings.pastBookings.forEach(booking => {
                customerInfo.innerHTML += `
                <article class="past-booking">
                    <h5>Room Number: ${booking.roomNumber}</h5>
                    <h5 style="text-transform: capitalize"><i>${booking.roomType}</i></h5>
                    <h5>Stayed on ${booking.date}</h5>
                    <h5>Booking Amount: $${booking.costPerNight}</h5>
                </article>`;
            });
        }
    } else {
        customerInfo.innerHTML = `<h4>We don't have any customers with that name in our database.</h4>`
    }
}

function deleteBooking(event) {
    const id = event.target.dataset.booking
    const deletePath = `bookings/${id}`
    console.log(deletePath);
    apiFunctions.fetchData(deletePath, 'DELETE');
    apiFunctions.fetchData('bookings', 'GET').then(data => {
        hotel.updateBookings(data.bookings);
        manager.updateCustomers(hotel.bookings, today);
        displayManagerBookings;
        customerInfo.innerHTML = `<h4>Booking successfully deleted!</h4>`
    });
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