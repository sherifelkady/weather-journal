/* Global Variables */
const apiKey = "cc3ec3a23c4496f4abe7546e42065ccb";
const generateBtn = document.getElementById("generate");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");

// entryHolder elements
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Generate data from openweathermap api
generateBtn.addEventListener("click", async (e) => {
  console.log(zip.value);
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${apiKey}&units=metric`;
  const response = await fetch(baseUrl);
  const data = await response.json();
  console.log(newDate);

  // Send data to endpoint
  const allData = {
    date: newDate,
    temp: data.main.temp,
    feelings: feelings.value,
  };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(allData),
  };
  /* POST data */
  await fetch("/store-weather-data", options);


  // Get Data from Endpoint
  const getTodayWeather = async () => {
    const todayData = await fetch("/today-weather-data");
    const responseData = await todayData.json();
    console.log(responseData.feelings);

  // Dynamic Ui
  date.innerHTML = newDate;
  temp.innerHTML = responseData.temp;
  content.innerHTML = responseData.feelings;

  };
  getTodayWeather()
});
