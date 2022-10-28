/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = `&appid=7699888812ddd206b2ad73e85cacb50d`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', myAction);

function myAction(event) {
  let zipCode = document.getElementById('zip').value;
  let feeling = document.getElementById('feelings').value;
  let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  console.log(isValidZip.test(10001))
    // alert trriger on invalid zip code -works only for US zip code-

    function isValid() {
      isValidZip.test(zipCode)
        ? true
        : window.alert('404 ,kindly enter a valid zip code');
    }
    
  isValid();

  getWeather(baseURL, zipCode, apiKey)
    //chain promises
    .then((data) => {
      // Add data
      console.log(data.name);
      postData('/add', {
        date: newDate,
        city: data.name,
        weather: data.main.temp,
        feeling: feeling,
      });
    })
    .then(updateUI());
}

// get the weather data from our api using async get function
const getWeather = async (baseURL, zip, key) => {
  const response = await fetch(`${baseURL}${zip}${key}&units=metric`);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// our async function that will post all our data to the route

const postData = async (url = '', data = {}) => {
  let res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match the header
  });

  try {
    const myData = await res.json();
    return myData;
  } catch (error) {
    console.log('error', error);
  }
};

// update ui function
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById(
      'temp'
    ).innerHTML = ` the weather today: ${allData.weather}`;
    document.getElementById(
      'content'
    ).innerHTML = `I am feeling  ${allData.feeling} today`;
    document.getElementById(
      'city'
    ).innerHTML = `your City is : ${allData.city}`;
  } catch (error) {
    console.log('error', error);
  }
};
