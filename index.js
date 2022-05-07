function render(data, gif, units) {
  let f = "F";
  let c = "C";
  let div = document.getElementById("weather");
  div.classList.add("weather");
  div.innerHTML = `
        <h2>${data.name}</h2>
        <div><img src=${gif.images.fixed_height.url} /></div>
        <div>${data.weather[0].description}</div>
        <div>Temperature: ${data.main.temp} ${units == "standard" ? f : c}</div>
        <div>Wind: ${data.wind.speed}</div>
    `;
  document.body.appendChild(div);
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function weather(city, units) {
  let data = [];
  let gif = {};
  let loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading");
  let loading = document.createElement("img");
  loading.src = "/images/cloud-sun.webp";
  loadingDiv.appendChild(loading);
  document.body.appendChild(loadingDiv);
  await delay(1000);
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=fe3ce169ebaab55004f281ee3557428d`
  )
    .then((res) => {
      if (res.status == 404) {
        alert("City not found");
        location.reload();
      }
      return res;
    })
    .then((data) => data.json())
    .then((json) => (data = json));

  console.log(data.weather[0].description);
  await fetch(
    `https://api.giphy.com/v1/stickers/random?api_key=fnu3wYBe5DSntF1xJmDNwcg1XwpYZ9t0&tag=${data.weather[0].main}+weather+sky&rating=g`
  )
    .then((res) => res.json())
    .then((json) => (gif = json.data));
  document.body.removeChild(loadingDiv);
  render(data, gif, units);
}

function component() {
  const element = document.createElement("div");

  console.log("hi");
  document.getElementById("submit").addEventListener("click", () => {
    event.preventDefault();
    document.getElementById("weather").innerHTML = "";
    weather(
      document.getElementById("city").value,
      document.getElementById("units").value
    );
  });
  return element;
}

document.body.appendChild(component());
