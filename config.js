const express = require('express');
const mongoose = require('mongoose');
const MONGO_URL = "mongodb://localhost:27017/";
const DB_NAME = "eCommerce";

const DB_URL = MONGO_URL + DB_NAME;
const PORT = 5555;

module.exports = { PORT, DB_URL };