// Navbar scrolled
const navbar = document.querySelector('.navbar')
const madrid = document.querySelector('.madrid')
const navLinks = document.querySelector('.nav-links')
const navLinksLi = document.querySelectorAll('.nav-links li')

window.addEventListener('scroll', () => {
    if(this.scrollY >= 100) {
        navbar.classList.add('scrolled')
    } else {
        navbar.classList.remove('scrolled')
    }
})

madrid.addEventListener('click', () => {
    navLinks.classList.toggle('active')
    madrid.classList.toggle('active')
})

navLinksLi.forEach(li => li.addEventListener('click', ()=> {
    navLinksLi.forEach(li => li.classList.remove('active'))
    li.classList.add('active')

    madrid.classList.remove('active')
    navLinks.classList.remove('active')
}))

// Weather condition
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat, long);
    weatherByLatLong(lat, long);
    showMap(lat, long);
}

function weather() {
    var city = document.getElementById("city").value;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4cd3ba82a053d9b7337bd21869b4dda9";
    let tempIcon = document.querySelector("#tempIcon");
    let weatherDescription = document.querySelector("#weatherDescription");
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            var condition = data.weather[0].description;
            var wind = data.wind.speed;
            var temp = data.main.temp;
            var kota = data.name;
            document.getElementById("nama").innerHTML = kota;
            document.getElementById("kondisi").innerHTML = condition;
            document.getElementById("temperatur").innerHTML = Math.trunc(temp) - 273 + " °C";
            document.getElementById("temperatur2").innerHTML = temp;
            document.getElementById("angin").innerHTML = wind + " Km/h";
            document.getElementById("tempIcon").style.visibility = "visible";

            data.weather.forEach(items => {
                weatherDescription.innerText = items.description;
                if (items.id < 250) {
                    tempIcon.src = `tempicons/storm.svg`;
                } else if (items.id < 350) {
                    tempIcon.src = `tempicons/drizzle.svg`;
                } else if (items.id < 550) {
                    tempIcon.src = `tempicons/snow.svg`;
                } else if (items.id < 650) {
                    tempIcon.src = `tempicons/rain.svg`;
                } else if (items.id < 800) {
                    tempIcon.src = `tempicons/atmosphere.svg`;
                } else if (items.id === 800) {
                    tempIcon.src = `tempicons/sun.svg`;
                } else if (items.id > 800) {
                    tempIcon.src = `tempicons/clouds.svg`;
                }
            });

        });
}

function weatherByLatLong(lat, long) {
    var city = document.getElementById("city").value;
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=4cd3ba82a053d9b7337bd21869b4dda9";
    let tempIcon = document.querySelector("#tempIcon");
    let weatherDescription = document.querySelector("#weatherDescription");
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            var condition = data.weather[0].description;
            var wind = data.wind.speed;
            var temp = data.main.temp;
            var kota = data.name;
            document.getElementById("nama").innerHTML = kota;
            document.getElementById("kondisi").innerHTML = condition;
            document.getElementById("temperatur").innerHTML = Math.trunc(temp) - 273 + " °C";
            document.getElementById("temperatur2").innerHTML = temp;
            document.getElementById("angin").innerHTML = wind + " Km/h";
            document.getElementById("tempIcon").style.visibility = "visible";

            data.weather.forEach(items => {
                weatherDescription.innerText = items.description;
                if (items.id < 250) {
                    tempIcon.src = `tempicons/storm.svg`;
                } else if (items.id < 350) {
                    tempIcon.src = `tempicons/drizzle.svg`;
                } else if (items.id < 550) {
                    tempIcon.src = `tempicons/snow.svg`;
                } else if (items.id < 650) {
                    tempIcon.src = `tempicons/rain.svg`;
                } else if (items.id < 800) {
                    tempIcon.src = `tempicons/atmosphere.svg`;
                } else if (items.id === 800) {
                    tempIcon.src = `tempicons/sun.svg`;
                } else if (items.id > 800) {
                    tempIcon.src = `tempicons/clouds.svg`;
                }
            });

        });
}

// 

// Initialize the map and assign it to a variable for later use
// there's a few ways to declare a VARIABLE in javascript.
// you might also see people declaring variables using `const` and `let`

function showMap(lat, long) {
    if (!map) {
        var map = L.map('map', {
            // Set latitude and longitude of the map center (required)
            center: [lat, long],
            // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
            zoom: 10
        });
        var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '4'
        }).addTo(map);
    } else {
        map.setView([lat, long], 11);
    }

    // Create a Tile Layer and add it to the map


    var marker = L.marker(
        [lat, long],
        {
            draggable: true,
            title: "",
            opacity: 0.75
        });

    marker.addTo(map);
    marker.on('dragend', function (e) {
        lat = e.target._latlng.lat;
        long = e.target._latlng.lng;
        weatherByLatLong(lat, long);
    })
}
