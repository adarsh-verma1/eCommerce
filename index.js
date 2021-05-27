const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require("express-session");
const passport = require('passport');
require('./authentication/passport-local');

const config = require('./config');
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // Websites allowed to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pass to next layer of middleware
    next();
});

//To attach CSS and JS files to HTML
app.use(express.static(path.join(__dirname, "views")));

app.use(session({
    secret: "eCommerce Project Secret",
    resave: false,
    saveUninitialized: true
}));

//Using passport for User Authentication
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index_route').route);

// Connecting to Database and then starting the Server
connectDB(config.DB_URL).then(() => { connectServer(config.PORT) });

// Function establishing connection to Database
function connectDB(DB_URL) {
    mongoose.connection.on('error', (err) => {
        console.error("Error while connecting to Database");
        console.error(err);
    });

    mongoose.connection.once('open', () => {
        console.error("Successfully connected to Database");
    });

    //Connecting to DB
    return mongoose.connect(DB_URL, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 10000
    });
}

// Function starting the Server
function connectServer(PORT) {
    app.listen(PORT, (err) => {
        if (err) {
            console.error("Error while starting the server");
            console.error(err);
            return;
        }

        //If no error, then output in console
        console.log(`Server is running at port: ${PORT}`);
    });
}