const db = require('./db/connect');
const utils = require('./utils/utils');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const files = utils.getAllFiles('modules');
const loadModels = () => {
    files.forEach((v, k) => {
        if (/model.js$/.test(v)) {
            require(path.resolve(v));
        }
    });
};
loadModels();

db.start();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3030);

app.use('/static',express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.route('/').get((req, res) => {
    res.render('index');
});

// set api routes
files.forEach((v, k) => {
    if (/route.js$/.test(v)) {
        require('./' + v)(app);
    }
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use((err, req, res, next) => {
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
    console.log(`connect success in http://localhost:${app.get('port')}`);
});