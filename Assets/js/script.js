const userInput=document.getElementById("user-input")
const searchBtn=document.getElementById('search-btn')
const weatherContainer=document.querySelector(".weather-container")
const forecastContainer=document.querySelector(".forecast-container")

const apiKey = "5762345ebb0694edfc99339cfda43537";
let cityArray=[]


function getWeather (city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city }&appid=${apiKey}&units=metric`
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

