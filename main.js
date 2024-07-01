document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "2cf40b568a6f8adb9bda9b462ec9675f";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.getElementById("search-btn");
  const error = document.querySelector(".error");
  const weatherInfo = document.querySelector(".weather-info");

  async function checkWeather(city) {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      if (response.status === 404) {
        error.style.display = "block";
        weatherInfo.style.display = "none";
      }
      const data = await response.json();
      console.log(data);

      document.querySelector(".city").textContent = data.name;
      document.querySelector(".temperature").textContent = ` ${Math.round(
        data.main.temp
      )} °C`;
      document.querySelector(
        ".description"
      ).textContent = `${data.weather[0].description}`;
      document.querySelector(
        ".humidity "
      ).textContent = `Humidity: ${data.main.humidity}%`;
      document.querySelector(
        ".wind "
      ).textContent = `Wind Speed: ${data.wind.speed} m/s`;

      const weatherIcon = data.weather[0].main;
      const iconImg = document.querySelector("img");

      if (iconImg) {
        if (weatherIcon === "Clear") {
          iconImg.src = "img/sun.webp";
        } else if (weatherIcon === "Clouds") {
          iconImg.src = "img/clouds.webp";
        } else if (weatherIcon === "Snow") {
          iconImg.src = "img/snow.webp";
        } else if (weatherIcon === "Rain") {
          iconImg.src = "img/2light-rain.png";
        } else if (weatherIcon === "Mist") {
          iconImg.src = "img/mist.webp";
        } else if (weatherIcon === "Thunderstorm") {
          iconImg.src = "img/rain.webp";
        } else if (weatherIcon === "Haze") {
          iconImg.src = "img/Haze.png";
        }
      } else {
        console.error("Element with class 'ico' not found.");
      }
      error.style.display = "none";
      weatherInfo.style.display = "block";
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
    searchInput.value = "";
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      checkWeather(searchInput.value);
      searchInput.value = "";
    }
  });
});
