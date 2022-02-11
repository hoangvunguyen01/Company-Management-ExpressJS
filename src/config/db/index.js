const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Company');
        console.log('Connect successfully');
    } catch (error) {
        console.log(`Connect fail by error ${error}`);
    }
}

module.exports = { connect };
