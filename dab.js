// Code for playing background music in a loop
const audio = new Audio('./audio/dab.mp3');
audio.loop = true;
audio.play();

// Code for displaying map
const locations = [
    { text: 'FFUl & FML 2023', coo: [38.751967, -9.163900], images: Array.from({ length: 14 }, (_, i) => `./images/fful-${i + 1}.jpeg`) }, //farmacia
    { text: 'ISCTE - Festival Caloiro 2023', coo: [38.748787, -9.153716], images: Array.from({ length: 5 }, (_, i) => `./images/iscte-${i + 1}.jpeg`) }, //iscte
    { text: 'Estudos na FFUL', coo: [38.749631862448375, -9.157168976955093], images: Array.from({ length: 2 }, (_, i) => `./images/aulafful-${i + 1}.jpeg`) }, //sala de aula na fful
    { text: 'Presidente da Republica', coo: [38.69803251386306, -9.200569167032683], images: Array.from({ length: 1 }, (_, i) => `./images/marcelo-${i + 1}.jpeg`) }, // Marcelao
    { text: 'IST - Churrasco Mecanica', coo: [38.73607032293588, -9.137800724215404], images: Array.from({ length: 3 }, (_, i) => `./images/mecanica-${i + 1}.jpeg`) }, // mecanica
    { text: 'Bingo Saldanha', coo: [38.73620643076396, -9.144572105287036], images: Array.from({ length: 1 }, (_, i) => `./images/bingo-${i + 1}.jpeg`) }, // bingo saldanha
    { text: 'Bairro Alto', coo: [38.71143634631739, -9.144603811428656], images: Array.from({length: 5}, (_, i) => `./images/bairro-${i + 1}.jpg`)}, // bairro alto
    { text: 'IST - TagusPark', coo: [38.73659216989772, -9.302796690422383], images: Array.from({length: 1}, (_, i) => `./images/tagus-${i + 1}.png`)}, // taguspark
    { text: '¡Hala Madrid!', coo: [40.42690055732534, -3.6998128294494976], images: Array.from({length: 1}, (_, i) => `./images/madrid-${i + 1}.png`)}, // madrid
    { text: 'Carnaval Torres', coo: [39.09120158819188, -9.258961856315484], images: Array.from({length: 8}, (_, i) => `./images/torres-${i + 1}.png`)} // torres vedras
];

console.log(Array.from({ length: 14 }, (_, i) => `./images/fful-${i + 1}.jpeg`));

const map = L.map('map').setView([38.7253, -9.1500], 7); // Centered at Lisbon

// Use OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

locations.forEach(location => {
    const marker = L.marker(location.coo).addTo(map);

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