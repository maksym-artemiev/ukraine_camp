const mongoose = require('mongoose');
const citiesUa = require('./citiesUa');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected.');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 40; i++) {
        const rand40 = Math.floor(Math.random() * 40);
        const price = Math.floor(Math.random() * 50);
        const camp = new Campground({
            author: '62b19a21f9a51617a1f8dd38',
            location: `${citiesUa[rand40].city}, ${citiesUa[rand40].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/11649432/',
            description: 'Nature The word nature is a commonly used word. This word is used in a variety of contexts.Perhaps the most important reference is the multiple species of plants, animals, wildlife, and all that the earth contains from topography such as mountains, valleys, beaches, and seas. , And forests.The beauty of nature The nature of man is characterized by its beauty resulting mainly from the wonderful diversity of living organisms that exist in various parts of the earth, as well as the unique terrain of mountains, water, plateaus and forests.Each of these features is distinguished by a special beauty that distinguishes it from Other terrain, and this great diversity gave people wide spaces to seek calm, tranquility, and tranquility.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    citiesUa[rand40].longitude,
                    citiesUa[rand40].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwfdpxl4o/image/upload/v1655906878/YelpCamp/glma62va0jiywvdvazpq.jpg',
                    filename: 'YelpCamp/glma62va0jiywvdvazpq',
                },
                {
                    url: 'https://res.cloudinary.com/dwfdpxl4o/image/upload/v1655906878/YelpCamp/t131kl4zkhdbj0xrc4q4.jpg',
                    filename: 'YelpCamp/t131kl4zkhdbj0xrc4q4',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});