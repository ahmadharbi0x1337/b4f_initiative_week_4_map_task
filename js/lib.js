const locationPickerMap = () => {
  const locationPicker = L.map("location-picker-map").setView([35.0, 38.5], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(locationPicker);
  return locationPicker;
};
const initMap = (centerCoordinates) => {
  var map = L.map("map").setView(centerCoordinates, 9);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  var marker = L.marker(centerCoordinates);
  marker.bindPopup("B4F -  SCS Building - Al-Baramkeh");
  marker.addTo(map);

  return map;
};
const addMarkersAndPopUps = (map, data) => {
  data.map((person) => {
    const coords = person["coords"];
    // add marker
    var m = L.marker(coords);
    // add pop-up
    // check if eligible for aid
    if (person["aid"]) {
      m.bindPopup(
        `Hello i'm ${person["name"]} , i'm live far from the avg as ${person["differenceInKiloMeter"]}, and i'm entitled for an aid of ${person["aid"]}SYP`,
      );
    } else {
      m.bindPopup(`Hello i'm ${person["name"]}`);
    }

    // add to map
    m.addTo(map);
  });
};
const calculateDistances = (map, data, centerCoordinates) => {
  const distances = [];
  data.map((person) => {
    const coords = person["coords"];
    var marker = L.marker(coords).addTo(map);
    // convert to km before push
    const distance = map.distance(centerCoordinates, coords) / 1000;
    distances.push(distance);
  });
  return distances;
};
const calculateAvg = (distances) => {
  const sum = distances.reduce((acc, current) => {
    return acc + current;
  }, 0);
  return sum / distances.length;
};
// we return the circle because it has a method which is necessary for zoom control (getBounds)
const drawCircle = (map, avg, centerCoordinates) => {
  var circle = L.circle(centerCoordinates, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: avg * 1000,
  }).addTo(map);

  return circle;
};
// a copy of the data array with updated objects with differenceInKiloMeter and aid keys
const eligibleForAid = (data, distances, avg) => {
  return distances.map((distance, idx) => {
    if (distance > avg) {
      const person = data[idx];
      person["differenceInKiloMeter"] = Math.ceil(distance - avg);
      // diffInKM * 1000SYP
      person["aid"] = person["differenceInKiloMeter"] * 1000;
    }
  });
};
const winner = (data, distances, avg) => {
  const distanceDiffAvgArray = distances.map((distance, idx) => {
    return Math.abs(distance - avg);
  });
  const closestToCircle = Math.min(...distanceDiffAvgArray);
  const closestPersonToCircle =
    data[distanceDiffAvgArray.indexOf(closestToCircle)];
  return closestPersonToCircle;
};
const renderWinner = (winnerObj) => {
  const winner = document.getElementById("winner");
  const label = document.createElement("label");
  label.textContent = `Hello i'm ${winnerObj["name"]}, i'm the closest person to the circle circumference `;
  winner.append(label);
};
const zoomControl = (map, data, circle, centerCoordinates) => {
  map.invalidateSize();
  const circleBounds = circle.getBounds();
  const circleBoundsArray = [
    [circleBounds.getSouthWest().lat, circleBounds.getSouthWest().lng],
    [circleBounds.getNorthEast().lat, circleBounds.getNorthEast().lng],
  ];
  const allPoints = [
    centerCoordinates,
    ...data.map((person) => person["coords"]),
    ...circleBoundsArray,
  ];
  const bounds = L.latLngBounds(allPoints);
  map.fitBounds(bounds);
};

const hideForm = (id) => {
  const form = document.getElementById(id);
  form.style.display = "none";
};
const drawMap = (centerCoordinates, data) => {
  // initialize Map
  const map = initMap(centerCoordinates);
  // calculate distances
  const distances = calculateDistances(map, data, centerCoordinates);
  // calculate avg
  const average = calculateAvg(distances);
  const circle = drawCircle(map, average, centerCoordinates);
  eligibleForAid(data, distances, average);
  // Markers , and Pop-Ups
  addMarkersAndPopUps(map, data);
  // Winner
  renderWinner(winner(data, distances, average));
  zoomControl(map, data, circle, centerCoordinates);
};

// Functions and Purposes

// locationPickerMap -> map-Object

// iniMap(centerCoordinates) -> map-Object

// addMarkersAndPopUps(map, data) -> void

// calculateDistances(map, data, centerCoordinates, distances) ->  distances-Array

// calculateAvg(distance) -> average-Number

// drawCircle(map, avg, centerCoordinates) -> circle-Object

// eligibleForAid(data,distances, avg) -> void (Modifies data array)

// winner(data, distances, avg) -> person-Object

// renderWinner(winnerObj) -> void

// hideForm(id) -> void (hidesForm)

// drawMap(centerCoordinates, data,distances) -> void

// Methods and Classes Used From LeafLet Js
