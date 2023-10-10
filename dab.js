// Code for playing background music in a loop
const audio = new Audio('./audio/dab.mp3');
audio.loop = true;
audio.play();

// Code for displaying map
const locations = [
    { text: 'FFUl & FML 2023', lat: 38.751967, lng: -9.163900, images: ['./images/fful-1.jpeg', './images/fful-2.jpeg', './images/fful-3.jpeg', './images/fful-4.jpeg'] }, //farmacia
    { text: 'ISCTE - Festival Caloiro 2023', lat: 38.748787, lng: -9.153716, images: ['./images/iscte-1.jpeg', './images/iscte-2.jpeg', './images/iscte-3.jpeg'] }, //iscte
    // Add more locations here...
];

const map = L.map('map').setView([38.7253, -9.1500], 7); // Centered at the United States

// Use OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

locations.forEach(location => {
    const marker = L.marker([location.lat, location.lng]).addTo(map);

    marker.on('click', () => {
        let popupContent = '<div class="popup-carousel">';
        location.images.forEach(image => {
            popupContent += `<div><img src="${image}" alt="Location Image" width="200"/></div>`;
        });
        popupContent += '</div>';

        // Add text at the bottom of the popup
        popupContent += `<p class="popup-text">${location.text}</p>`;

        const popup = L.popup().setContent(popupContent);

        // Unbind previous popups before binding a new one
        marker.unbindPopup().bindPopup(popup).openPopup();

        // Initialize Slick Carousel inside the popup
        $('.popup-carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<button class="slick-prev">Previous</button>',
            nextArrow: '<button class="slick-next">Next</button>'
        });
    });
});