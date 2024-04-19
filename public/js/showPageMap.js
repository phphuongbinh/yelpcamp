console.log(camp.geometry.coordinates);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: camp.geometry.coordinates,
  zoom: 9,
  projection: "globe",
});
map.on("style.load", () => {
  map.setFog({});
});

new mapboxgl.Marker()
  .setLngLat(camp.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${camp.title}</h3><p>${camp.location}</p>`
    )
  )
  .addTo(map);
