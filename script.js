var city = "london"
function searchCity() {
    const Api_key = "326c8916fa4163366c777fda2d26b39e";
    var city = document.getElementById("cityname").value;
    // console.log(city);
  
    const getWeatherData = (name, lat, lon,country) => {
      document.getElementById("cityName").innerText = name;
      document.getElementById("latitude").innerText = lat;
      document.getElementById("longitude").innerText = lon;
      document.getElementById("country").innerText = country;
    const getDataInfo=(main,description,icon,temp,humidity,pressure,temp_min,temp_max,speed,degree)=>{
      document.getElementById("climate").innerText = main;
      document.getElementById("humidity").innerText = humidity;
      document.getElementById("description").innerText = description;
      document.getElementById("temp").innerText = temp;
      document.getElementById("presure").innerText = pressure;
      document.getElementById("tempmax").innerText = temp_max;
      document.getElementById("tempmin").innerText = temp_min;
      document.getElementById("speed").innerText = speed;
      document.getElementById("degree").innerText = degree;
    }
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Api_key}`;
      fetch(weatherUrl)
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
          }
          return res.json();
        })
        .then(data => {
          console.log(data);
          const {main,description,icon}= data.weather[0]
          const {speed,deg}= data.wind
          const{temp,humidity,pressure,temp_max,temp_min}=data.main
          getDataInfo(main,description,icon,temp,humidity,pressure,temp_max,temp_min,speed,deg);
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    };
  
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${Api_key}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
      })
      .then(data => {
        if (data.length === 0) {
          throw new Error('City not found');
        }
        data[0];
        const { name, lat, lon,country } = data[0];
        getWeatherData(name, lat, lon,country);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  