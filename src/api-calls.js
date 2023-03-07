function fetchData(path, method, body) {
    return fetch(`http://localhost:3001/api/v1/${path}`, {
        method: method,
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        } else {
            return response.json();
        }
    })
    .catch(error => console.log(`Fetch was unsuccessful for *${path}* due to ${error}!`));
}

function getAllPromises(customerID) {
    const customerPath = 'customers/' + customerID;
    return Promise.all([fetchData('rooms', 'GET'), fetchData('bookings', 'GET'), fetchData(customerPath, 'GET'), fetchData('customers', 'GET')]);
}

export default {getAllPromises, fetchData};