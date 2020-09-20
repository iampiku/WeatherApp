let loc = document.getElementById("userLocation");
let weatherIcon = document.getElementById("weatherIcon");
let tempDigit = document.getElementById("temp-value");
let climate = document.getElementById("weatherDescription");
let feelsLike = document.getElementById("feelsLike");
let minTemp = document.getElementById("min");
let maxTemp = document.getElementById("max");
const apiKey = "eb1b8f32698b9c54808bb73f37c250ed";
const proxy = "https://cors-anywhere.herokuapp.com/";

// setting Weather Icon according to the weather condition;
function weatherIcons(id) {
  if (id < 240) {
    weatherIcon.src = "./imgs/006-thunderstorm.png";
  } else if (id < 340) {
    weatherIcon.src = "./imgs/010-rain.png";
  } else if (id < 550) {
    weatherIcon.src = "./imgs/007-rain.png";
  } else if (id < 640) {
    weatherIcon.src = "./imgs/011-snow.png";
  } else if (id < 799) {
    weatherIcon.src = "./imgs/haze.png";
  } else if (id === 800) {
    weatherIcon.src = "./imgs/004-sun.png";
  } else if (id > 800) {
    weatherIcon.src = "./imgs/001-cloudy.png";
  }
}

// searching weather
window.addEventListener("load", () => {
  let longitude, latitude;
  if (navigator.geolocation) {
    // navigator.geolocation is a browser based api;
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      fetch(api)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Network Error");
          }
        })
        .then((data) => {
          const { name } = data;
          const { temp } = data.main;
          const { temp_min } = data.main;
          const { temp_max } = data.main;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];
          loc.textContent = name;
          climate.textContent = main;
          minTemp.textContent = temp_min;
          maxTemp.textContent = temp_max;
          feelsLike.textContent = feels_like;
          tempDigit.textContent = temp;
          weatherIcons(id);
        });
    });
  }
});

// does querySelector only works with class name of the element ?;
const searchBox = document.querySelector(".search");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {
  const api = `${proxy}api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
  fetch(api)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Wrong Input");
      }
    })
    .then((data) => {
      const { name } = data;
      const { temp } = data.main;
      const { temp_min } = data.main;
      const { temp_max } = data.main;
      const { feels_like } = data.main;
      const { id, main } = data.weather[0];
      loc.textContent = name;
      climate.textContent = main;
      minTemp.textContent = temp_min;
      maxTemp.textContent = temp_max;
      feelsLike.textContent = feels_like;
      tempDigit.textContent = temp;
      weatherIcons(id);
    });
}
