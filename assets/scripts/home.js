// Home DOM
const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");
const welcome = document.querySelector(".welcome");
const weatherImg = document.querySelector(".weather-img");
const weatherText = document.querySelector(".weather-text");
const tempDetails = document.querySelector(".temp-details");
const cityName = document.querySelector(".city-name");
const date = document.querySelector(".date");
const next = document.querySelector(".next");
const windText = document.querySelector(".wind-text");
const humidityText = document.querySelector(".humidity-text");

// Forecast DOM
const hours = document.querySelectorAll(".hours");
const descImgs = document.querySelectorAll(".desc-img");
const descTexts = document.querySelectorAll(".desc-text");
const temps = document.querySelectorAll(".temp");
const forecast = document.querySelector(".forecast");

//Display Forecast
next.addEventListener("click", () => {
  forecast.classList.remove("hide");
});

//get day added
function updateDateAndTime() {
  //Today's Date and Time
  let now = new Date();
  const option = {
    weekday: "long",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  let currentDateAndTime = new Intl.DateTimeFormat(
    navigator.language,
    option
  ).format(now);
  date.textContent = currentDateAndTime;
}
//update date and time every second
setInterval(updateDateAndTime, 1000);

async function checkWeather() {
  const apiKey = "b2cb252543663a659353a544189d62a4";
  const apiKeyF = "2af28d613aa092544224590151c6bacb";
  // const apiGeo = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const city = searchInput.value;

  //Home Data
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    weatherText.innerHTML = data.weather[0].main;
    weatherImg.src = `../assets/images/${data.weather[0].description}.png`;
    weatherImg.alt = data.weather[0].description;
    cityName.innerHTML = `${data.name}, ${data.sys.country}`;
    tempDetails.innerHTML = `${Math.round(data.main.temp)} <span>℃</span>`;
    windText.innerHTML = `${data.wind.speed}m/s`;
    humidityText.innerHTML = `${data.main.humidity}%`;

    if (!response.ok) {
      throw new Error(`${data.message}`);
    }
  } catch (error) {
    alert(error);
  }

  //Forecast Data
  const apiForecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKeyF}&units=metric`;
  try {
    const response = await fetch(apiForecast);
    const data = await response.json();

    for (let i = 0; i < hours.length; i++) {
      let time = data.list[i].dt_txt.split(" ")[1].split(":")[0];
      if (time > 12) {
        time = `${time - 12} pm`;
      } else if (time < 12) time = `${time} am`;
      else time = `${time} pm`;
      hours[i].innerHTML = time;
      descImgs[
        i
      ].src = `../assets/images/${data.list[i].weather[0].description}.png`;
      descImgs[i].alt = data.list[i].weather[0].description;
      descTexts[i].innerHTML = data.list[i].weather[0].description;
      temps[i].innerHTML = Math.round(data.list[i].main.temp);
      hours[0].innerHTML = "Now";
    }

    if (!response.ok) {
      throw new Error(`${data.message}`);
    }
  } catch (error) {
    alert(error);
  } finally {
    searchInput.value = "";
  }
}

searchIcon.addEventListener("click", checkWeather);

//Get Username
document.addEventListener("DOMContentLoaded", () => {
  let param = new URLSearchParams(window.location.search);
  let username = param.get("username");
  welcome.querySelector("span").innerText = username;
});
