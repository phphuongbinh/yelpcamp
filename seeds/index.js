const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected!')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() =>{
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '634fa0bf78aa7abf82790ae1',
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A, temporibus?',
      price,
      geometry: { type: 'Point', coordinates: [ cities[rand1000].longitude, cities[rand1000].latitude ] },
      images: [
        {
          url: 'https://res.cloudinary.com/drdizm8fu/image/upload/v1667269095/YelpCamp/on91lzfrthcdwblzqncf.jpg',
          filename: 'YelpCamp/on91lzfrthcdwblzqncf',
        },
        {
          url: 'https://res.cloudinary.com/drdizm8fu/image/upload/v1667269259/YelpCamp/snhfg9lacjdapndrm8yl.jpg',
          filename: 'YelpCamp/snhfg9lacjdapndrm8yl',
        },
        {
          url: 'https://res.cloudinary.com/drdizm8fu/image/upload/v1667269261/YelpCamp/oapbrsqevdi35s9fjkcc.jpg',
          filename: 'YelpCamp/oapbrsqevdi35s9fjkcc',
        }
      ]
    })
    await camp.save()
  }
}

seedDB().then(()=>{
  mongoose.connection.close();
});