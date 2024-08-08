//require express
const express = require('express');
const port = 8000;
const app = express();

// to send cookie to the browser
const bodyParser = require('body-parser');
//ecpress layouts to make seperate single layout for all pages
const expressLayouts = require('express-ejs-layouts');
// to nonnect to database
const db = require('./config/mongoose');

//require connect-flash
const flash = require('connect-flash');
const flashMiddleware = require('./config/flashMiddleware');

//user for session cookies
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/pasport_local_strategy');

const MongoStore = require('connect-mongo');


// layouts for ejs
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: false}));

// set up views engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'));

//mongo store is used to store the session cookie
app.use(session({
    name: 'habitTracker',
    secret: "12345",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb+srv://saket:8318291085@cluster0.tkql36k.mongodb.net/?retryWrites=true&w=majority',
            autoRemove: 'disabled'
        },
        function(err){
            console.log("Error in the mongo-store");
        }
    ),
}));

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// flash middleware
app.use(flash());
app.use(flashMiddleware.setFlash);

// use express router
app.use('/', require('./routes'));




// directing the app in the given port
app.listen(port, function(err){
    if(err){
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port: ', port);
});