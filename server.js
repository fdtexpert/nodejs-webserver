const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log',log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });

    console.log(log);
    next();

});

//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('uCase', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {

    response.render('home.hbs', {
        pageTitle: "HOME...",
        welcomeMessage: 'Welcome to FDT...'
//        currentYear: new Date().getFullYear()
    });

});

app.get('/about', (request, response) => {

    response.render('about.hbs', {
        pageTitle: "am ABout Page..."
    });

});

app.get('/getjson', (request, response) => {

    response.send({
        name: 'Amir',
        likes:['1','2']
    });

});

//app.listen(3000, () => console.log('Example app listening on port 3000!'));
app.listen(port, () => console.log(`Example app listening on port ${port}`));
