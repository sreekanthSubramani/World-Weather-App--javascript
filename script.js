
const API_Key = "483ddcbd02ebc13d6e3cb8cfe911cbe2"
const mainForm = document.getElementById("validationForm")
const cityInputter = document.querySelector(".inputCity")  
const wrapperDiv = document.querySelector(".wrapper")

mainForm.addEventListener("submit", async event=>{
    event.preventDefault()
    
    const city =cityInputter.value

    if(city){
        try{
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData) 
            

        }catch(e){
            console.log(e)
            showError(e)
        }

    }else{
        showError("Please enter a valid city ")
    }
})

async function getWeatherData(city){
    const api =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;
    const response = await fetch(api);
    

    if(!response.ok){
        throw new Error ("Could not fetch the data")
    }
    return await response.json()
}

function displayWeatherInfo(data){

        console.log(data)
        const {name : city, main:{temp, humidity}, weather:[{description, id}]} = data
        wrapperDiv.style.display = "flex"
        
        const cityDisp = document.createElement("h1");
        const tempDisp = document.createElement("h2");
        const humidityDisp = document.createElement("h2");
        const fahrenheitDisp = document.createElement("h2")
        const descDisp = document.createElement("h2");
        const weatherDisp = document.createElement("p")
        weatherDisp.classList.add("weatherEmoji")

        wrapperDiv.textContent = ""
        cityDisp.textContent = `${city}`
        tempDisp.textContent = `Celcius : ` + Math.round(`${temp}`-273) + "°C"
        humidityDisp.textContent = `Humidity : ${humidity}%`
        fahrenheitDisp.textContent = `Fahrenheit : ` + Math.round((temp - 273.15) * 9/5 + 32)  + " °F"
        descDisp.textContent = `Insight : Its is ${description}`
        weatherDisp.textContent = weatherEmoji(id) 
        
        wrapperDiv.append(cityDisp, tempDisp, humidityDisp, fahrenheitDisp, descDisp, weatherDisp)
        
    }


function weatherEmoji(weatherId){       
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌦️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "☔";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "⛅";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🛸";
    }
}


function showError(message){
    const errorMessage = document.createElement("p")
    errorMessage.textContent = message
    wrapperDiv.classList.add("error-display")

    wrapperDiv.textContent = ""

    wrapperDiv.style.display = "flex"

    wrapperDiv.appendChild(errorMessage)

}

// "https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_Key}"

