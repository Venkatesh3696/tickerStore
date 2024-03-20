const express = require("express");

const tickerRoute = express.Router();

// console.log("ticker route");
const { getStocks } = require("../controllers/ticker.controller");

tickerRoute.route("/").get(getStocks);

module.exports = { tickerRoute };
