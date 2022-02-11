const path = require('path');
const route = require('./routes');
const db = require('./config/db');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    session({
        secret: 'TeaIce',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(methodOverride('_method'));

const hbs = exphbs.create({
    extname: '.hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
