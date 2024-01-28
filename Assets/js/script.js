// Creating Constant to store the data I get from the HTML element by either using .getElementById or .querySelector
const userInput=document.getElementById("user-input")
const searchBtn=document.getElementById('search-btn')
const weatherContainer=document.querySelector(".weather-container")
const forecastContainer=document.querySelector(".forecast-container")

// Declare constant for holding API keys
const apiKey = "5762345ebb0694edfc99339cfda43537";
let cityArray=[]

// The function "function getWeather (city){}"
    // Defines a function names getWeather
    // get weather data for specified city
    // takes in one argument city
// The constant "url:..."
    // construct a URL string for OpenWeatherMap API
    // include city names "q=${city }" with this input
    // include API keys "${apiKey}" with this input
// The "fetch(url)" Function
    // Using the build-in Function "fetch" to make a network request through the constant I declare "url"
    // "fetch" is used to make HTTP requests in JavaScript
// The ".then(response => response.json())"
    // 
function getWeather (city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    fetch(url)
    .then(response => response.json())
    .then((data)=>{
        console.log(data);
        const lat=data.coord.lat
        const lon=data.coord.lon
        getForecast(lat,lon)
        displayWeather(data)

    })
}

// Same thing with the getWeather function Difference:
    // Passing in "lat = latitude", "lon=longitude" from if the user were to use that for location
    // Getting the data and everything else is very similar to getWeather function
function getForecast(lat, lon){
    const url=` https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    fetch(url)
    .then(response =>response.json())
    .then((data)=>{
        console.log(data);
        displayForecast(data.list)
    })
}

function displayWeather(data){
    const card= document.createElement("div")
    card.setAttribute("class", "card")
    const cardHeader=document.createElement("div")
    cardHeader.setAttribute("class", "card-header")
    const h2=document.createElement("h2")
    h2.textContent=data.name
    const span=document.createElement("span")
    const icon=document.createElement("img")
    icon.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon +".png")
    const cardBody= document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    const temp=document.createElement("p")
    const humidity=document.createElement("p")
    const wind=document.createElement("p")

    temp.textContent=`Temperature: ${data.main.temp} Celsius`
    humidity.textContent= `Humidity: ${data.main.humidity} %`
    wind.textContent= `Wind Speed: ${data.wind.speed} KPH`

    span.append(icon)
    h2.append(span)
    cardHeader.append(h2)
    cardBody.append(temp, humidity, wind)
    card.append(cardHeader, cardBody)
    weatherContainer.append(card)


}

function displayForecast(data){
    for (let i = 0; i < 6; i++) {
    const forI =i * 8 +4
    const day= new Date(data[forI].dt*1000).toDateString()
     const card= document.createElement("div")
    card.setAttribute("class", "card")
    const cardHeader=document.createElement("div")
    cardHeader.setAttribute("class", "card-header")
    const h2=document.createElement("h4")
    h2.textContent=day
    const span=document.createElement("span")
    const icon=document.createElement("img")
    icon.setAttribute("src", "https://openweathermap.org/img/w/" + data[forI].weather[0].icon +".png")
    const cardBody= document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    const temp=document.createElement("p")
    const humidity=document.createElement("p")
    const wind=document.createElement("p")

    temp.textContent=`Temperature: ${data[forI].main.temp} Celsius`
    humidity.textContent= `Humidity: ${data[forI].main.humidity} %`
    wind.textContent= `Wind Speed: ${data[forI].wind.speed} KPH`

    span.append(icon)
    h2.append(span)
    cardHeader.append(h2)
    cardBody.append(temp, humidity, wind)
    card.append(cardHeader, cardBody)
    forecastContainer.append(card)
        
        
    }

}
function storage(city){
    if(!cityArray.includes(city)){
        
    }

}


searchBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    const cityName=userInput.value
    getWeather(cityName)
    console.log(cityName);
    storage(city)
})

