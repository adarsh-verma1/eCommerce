const express = require('express');
const mongoose = require('mongoose');
const MONGO_URL = "mongodb://localhost:27017/";

//Database Name
const DB_NAME = "eCommerce";

//Database URL
const DB_URL = MONGO_URL + DB_NAME;

//PORT Number
const PORT = 5555;

module.exports = { PORT, DB_URL };