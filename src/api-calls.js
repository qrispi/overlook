function fetchData(path, method, body) {
    return fetch(`http://localhost:3001/api/v1/${path}`, {
        Method: method,
        Body: body,
        Headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .catch(error => console.log("Caught Error: ", error));
}

function getAllData(customerID) {
    const customerPath = 'customers/' + customerID;
    return Promise.all([fetchData('rooms', 'GET'), fetchData('bookings', 'GET'), fetchData(customerPath, 'GET')]);
}

export default getAllData;