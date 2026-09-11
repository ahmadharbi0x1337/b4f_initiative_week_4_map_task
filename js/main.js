// global variables
// note, leaflet coordinates order is [lat, lng]
// b4f coordinates
const centerCoordinates = [33.50838962121624, 36.285922708738624];
// array to hold input fields values as objects, each object has name,gender, and coords
const data = [];

// select elements
const form = document.getElementById("form");
const saveBtn = document.getElementById("save");
const drawBtn = document.getElementById("draw");
const testBtn = document.getElementById("test");

// render location picker map

const pickerMap = locationPickerMap();
let locationMarker = null;
pickerMap.on("click", (e) => {
  let latInput = document.getElementById("lat");
  let lngInput = document.getElementById("long");
  // get lat and lng from event
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  // remove old marker if exist
  if (locationMarker) {
    pickerMap.removeLayer(locationMarker);
  }
  // add new marker
  locationMarker = L.marker([lat, lng]).addTo(pickerMap);
  // fill inputs
  latInput.value = lat;
  lngInput.value = lng;
});

// event listeners
// save & clear button
saveBtn.addEventListener("click", () => {
  // select fields values
  let personName = form.querySelector("#name");
  const personNameValue = personName.value;
  let gender = form.querySelector("input[name='gender']:checked");
  const genderValue = gender.value;

  let long = form.querySelector("#long");
  const langValue = long.value;
  let lat = form.querySelector("#lat");
  const latValue = lat.value;
  const coordinates = [latValue, langValue];
  // push object to data array
  data.push({
    name: personNameValue,
    gender: genderValue,
    coords: coordinates,
  });
  //   clear fields
  personName.value = "";
  gender.checked = false;
  long.value = 0;
  lat.value = 0;
});
// draw map button
drawBtn.addEventListener("click", () => {
  hideForm("form");
  drawMap(centerCoordinates, data);
});

// Test
testBtn.addEventListener("click", () => {
  data.push({
    name: "Ahmad Alharbi",
    gender: "male",
    coords: [33.50238162121624, 36.085972708738624],
  });
  data.push({
    name: "Yousef Bakr",
    gender: "male",
    coords: [33.50834962121624, 36.385222708738624],
  });
  data.push({
    name: "Enas Bardan",
    gender: "female",
    coords: [33.30833962121624, 36.255922708738624],
  });
  data.push({
    name: "Jamal Aldahak",
    gender: "male",
    coords: [33.40831962121624, 36.185722708738624],
  });
  testBtn.style.display = "none";
});
