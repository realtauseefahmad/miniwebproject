document.addEventListener("DOMContentLoaded", () => {

    const API_KEY = "cbfce3cd3d1bf7ed0f37c8c2052e4448";

    const input = document.querySelector(".searchtemp input");
    const cityName = document.querySelector(".temp h3");
    const rainChance = document.querySelector(".temp p");
    const mainTemp = document.querySelector(".temp h2");

    const timeCards = document.querySelectorAll(".record .time");

    const airValues = document.querySelectorAll(".air-box h3");

    const dayCards = document.querySelectorAll(".day");

    async function getWeather(city) {
        try {
            const res1 = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (!res1.ok) throw new Error("City not found");
            const current = await res1.json();
            const res2 = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            const forecast = await res2.json();
            updateUI(current, forecast);
        } catch (err) {
            alert(err.message);
            console.error(err);
        }
    }

    function updateUI(current, forecast) {
        cityName.innerText = current.name;
        mainTemp.innerText = `${Math.round(current.main.temp)}°c`;
        rainChance.innerText = `chance of Rain: ${current.clouds.all}%`;
        airValues[0].innerText = `${Math.round(current.main.feels_like)}°c`;
        airValues[1].innerText = `${current.main.humidity}%`;
        airValues[2].innerText = `${Math.round(current.wind.speed * 3.6)} km/h`;
        airValues[3].innerText = current.uvi ? current.uvi : "N/A";
        updateToday(forecast.list);
        update7Days(forecast.list);
    }

    function updateToday(list) {
        timeCards.forEach((card, index) => {
            if (!list[index]) return;
            const tempBox = card.querySelector("h5:last-child");
            tempBox.innerText = `${Math.round(list[index].main.temp)}°c`;
        });
    }

    function update7Days(list) {
        dayCards.forEach((card, i) => {
            const dayData = list[i * 8];
            if (!dayData) return;

            const weather = card.children[1];
            const tempBox = card.children[2];

            const max = Math.round(dayData.main.temp_max);
            const min = Math.round(dayData.main.temp_min);

            weather.innerText = dayData.weather[0].main;
            tempBox.innerText = `${max}/${min}`;
        });
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Feature coming soon 🚧");
        });
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && input.value.trim() !== "") {
            getWeather(input.value.trim());
            input.value = "";
        }
    });

    getWeather("Bhopal");
});
