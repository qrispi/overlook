# Overlook
[//]: <>
This is a hotel booking site where a user can login in with their unique username and see a dashboard of their reservations (sorted between past and future) and their total amount spent. The user can also search for available rooms to book by date and then filter those results by one or more room attributes. Site navigation is enhanced with a custom modal that generates on click for available rooms and turns into a congratulations message once a successful reservation is made. All data is fetched through a local server and classes are fully tested with Mocha and Chai. Careful consideration was also given to accessibility - 000000000000000000000

---

## Installation Instructions:
[//]: <>
1. Fork and clone [this repo](https://github.com/qrispi/overlook) and [this repo (backend API)](https://github.com/turingschool-examples/overlook-api).
1. Copy the SSH key from the green "Code" button within each repo.
1. In your terminal, use the command `git clone git@github.com:[the link to each repo]`.
1. Run `npm install` in both local repositories.
1. Do NOT run `npm audit fix --force` when prompted.
1. Run `npm start` in your terminal for both repos.
1. You will see a bunch of lines output to your terminal. One of those lines in the front-end repo will be something like:
  `Project is running at http://localhost:8080/`
1. Go to `http://localhost:8080/` in your browser to view your code running in the browser.

## Context:
[//]: <>
This was a solo project we were given one week to complete. Total time spent on this project was about 35 hours.

## Learning Goals:
[//]: <>
1. Use OOP to drive the design of the application and the code
1. Work with an API to send and receive data
1. Solidify the code review process
1. Create a robust test suite that thoroughly tests all functionality of a client-side application

## Technologies Used:
[//]: <>
- Fetch API
- Webpack
- Mocha & Chai
- LightHouse
- Wave Evaluation
- GitHub Issues & Project Board
- JavaScript
- CSS
- HTML

## Wins + Challenges:
[//]: <>
- Wins:
  - Getting rooms to filter by multiple attributes
  - Condensing all fetch requests into one function
  - Dynamicaly assigning unqiue images and colors to rooms as they are generated
  - Error handling with login page
- Challenges:
  - Utilizing the required attribute in form inputs in combination with event.preventDefault() to stop a page reload. This was solved by putting event.preventDefault() inside a conditional that first checks for valid input.
  - Keeping up with the deadline/knowing where to focus my time
  - Learning how to semantically write HTML to be accessible
  - Timing of fetch requests and DOM changes
