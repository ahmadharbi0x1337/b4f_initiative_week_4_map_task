const data = [];
const form = document.querySelector("form");
// console.log(form);
const saveBtn = document.getElementById("save");
// console.log(saveBtn);

saveBtn.addEventListener("click", (e) => {
  // select fields values
  let personName = form.querySelector("#name");
  const personNameValue = personName.value;
  let gender = form.querySelector("input[name='gender']:checked");
  const genderValue = gender.value;
  let lang = form.querySelector("#lang");
  const langValue = lang.value;
  let lat = form.querySelector("#lat");
  const latValue = lat.value;
  const coordinates = [langValue, latValue];
  data.push({
    name: personNameValue,
    gender: genderValue,
    coords: coordinates,
  });
  //   clear fields
  personName.value = "";
  gender.checked = false;
  lang.value = 0;
  lat.value = 0;

  //   console.log(data);
});
const hideForm = (id) => {
  const form = document.getElementById("form");
  form.style.display = "none";
};

const drawMap = () => {
  // Configs
  const coordinates = [33.50838962121624, 36.285922708738624];
  //33.50838962121624, 36.285922708738624

  //   Map Init
  var myMap = L.map("map").setView(coordinates, 12);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(myMap);
  var marker = L.marker(coordinates).addTo(myMap);
};

const drawBtn = document.getElementById("draw"); 

drawBtn.addEventListener("click", (e) => {
  hideForm("form");
  drawMap();
});
