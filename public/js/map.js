mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12', // required
  center: listing.geometry.coordinates, // [lng, lat]
  zoom: 9
});

// Create popup first
const popup = new mapboxgl.Popup({ offset: 25 })
  .setHTML(`<h4>${listing.location}</h4><p>Exact location provided after booking</p>`);

// Create marker and attach popup
const marker = new mapboxgl.Marker({ color: "red" }) 
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup) 
  .addTo(map);
