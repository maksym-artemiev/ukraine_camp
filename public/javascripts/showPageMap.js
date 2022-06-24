mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "show-map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 45 })
            .setHTML(
                `<h5>${campground.title}</h5><p>${campground.location}</p>`
            )
    )
    .addTo(map);