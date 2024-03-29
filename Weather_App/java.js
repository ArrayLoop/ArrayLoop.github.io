window.addEventListener('load', ()=> {
let long;
let lat;
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");

if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position =>{
           long = position.coords.longitude;
           lat = position.coords.latitude;
           
           const proxy = " https://secret-ocean-49799.herokuapp.com/";
           const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
      
           fetch(api)
           .then(response => {
              return response.json();
           })
           .then(data =>{
               console.log(data);
               const {temperature, summary, icon} = data.currently;
               //Set DOM Elements from the API
               temperatureDegree.textContent = temperature;
               temperatureDescription.textContent = summary;
               locationTimezone.textContent = data.timezone;
               //Set Icon
               setIcons(icon, document.querySelector(".icon"));

               //Change Temperature to Celsius/Farenheit//
                temperatureSection.addEventListener('click', () =>{
                   if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                   } else {
                       temperatureSpan.textContent = "F";
                    
                   }

                });
                  
            });
      });
      
    }

   function setIcons(icon, iconID){
     const skycons = new Skycons({color: "white"});
     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
     skycons.play();
     return skycons.set(iconID, Skycons[currentIcon]);

}
});
