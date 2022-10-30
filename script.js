let weather = {
  // an object that holds all the fetching and displaying details
  apikey: "80d85439d598dc01108f0c3962322ba6",

  fetchdata: function (city) {
    //a function to fetch the data by passing the city name to it
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apikey
    ).then((res) => {
      if (res.status === 404) {
        //displaying an error message if the user entered an invalid city
        document.querySelector(".city").innerText = "Please Enter a valid city";
        //setting the visibilty of the other elements to hidden as it will be useless
        document.querySelector(".temp").style.visibility = "hidden";
        document.querySelector(".description").style.visibility = "hidden";
        document.querySelector(".humidity").style.visibility = "hidden";
        document.querySelector(".wind").style.visibility = "hidden";
      } else if (res.status === 200) {
        res.json().then((data) => this.displayData(data));
        document.querySelector(".temp").style.visibility = "visible";
        document.querySelector(".temp").style.visibility = "visible";
        document.querySelector(".description").style.visibility = "visible";
        document.querySelector(".humidity").style.visibility = "visible";
        document.querySelector(".wind").style.visibility = "visible";
      }
    });
  },
  fetchDataofLocation: function (lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather.apikey}`
    ).then((res) =>
      res.json().then((data) => {
        console.log(data);
        return( this.displayData(data))
       
      })
    );
  },
  //calling the displaying function to push the res values to the DOM

  displayData: function (data) {
    //the function which will push the values to the DOM
    const { name } = data; //destructuring the data from the JSON by its name.
    const { base } = data;
    const { humidity, temp } = data.main;
    const { description, main } = data.weather[0];
    const { speed } = data.wind;

    console.log(name, base, humidity, description, main);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".temp").innerText = temp;
    document.querySelector(".description").innerText =
      "Feels like " + description;
    document.querySelector(".humidity").innerText = "Humidity: " + humidity;
    document.querySelector(".wind").innerText = "Wind Speed: " + speed;
  },
  search: function () {
    this.fetchdata(document.querySelector(".search-bar").value); //injecting the input value to the url and the fetching function
  },
};
document.querySelector(".search button").addEventListener("click", function () {
  //handling the search button
  weather.search(); //calling the search function from the weather object
  document.getElementById("reset").value = ""; //clearing the input field by making it empty
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
      document.getElementById("reset").value = "";
    }
  });

navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  console.log(position.coords.longitude);
  //showing the details of the current location.
  if (position.coords) {
    weather.fetchDataofLocation(latitude, longitude);
  }
});
