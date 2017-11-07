const mongoose = require('mongoose');

exports.start = (success) => {
    mongoose.connect('mongodb://localhost/blog', { useMongoClient: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        // we're connected!
        console.log('connected db: blog');
        if (success) {
            success();
        }
    });
};