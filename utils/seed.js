const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { username, thought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {

    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    // Add users to the collection and await the results
    await User.collection.insertMany(username);

    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thought);
    
    // Console log seed data
    console.table(username);
    console.table(thought);

    console.info('Data seeded.');
    process.exit(0);
});