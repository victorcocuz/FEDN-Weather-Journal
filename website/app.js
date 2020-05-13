/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const zipQuery = "zip="
// Personal API Key for OpenWeatherMap API
const apiKey = "&APPID=9672bdd858eab69a9aa84f57672e4305";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const kelvin = 273.15;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    // const userResponse = document.getElementById('feelings').value;
    getWeather(baseUrl, zipQuery, zipCode, apiKey)
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipQuery, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipQuery + zipCode + apiKey)
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        newRequest = {
            temperature: Math.round(data.main.temp - kelvin),
            date: newDate,
            userResponse: document.getElementById('feelings').value
        };
        postData('/add', newRequest);
        updateUI();
    });
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerText = `Date: ${allData.date}`;
        document.getElementById('temp').innerText = `Temperature: ${allData.temperature}`;
        document.getElementById('content').innerText = `Content: ${allData.content}`;
    } catch(error) {
        console.log('error', error);
    }
}