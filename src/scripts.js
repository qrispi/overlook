import './css/styles.css';
import getAllData from './api-calls';
import './images/turing-logo.png';



function logData() {
    let currentUser = 34
    getAllData(currentUser).then(data => console.log(data));
}

logData();
